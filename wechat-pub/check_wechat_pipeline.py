#!/usr/bin/env python3
"""微信公众号草稿箱链路检查器（艾乐同学）"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List
from urllib import request as urlrequest

ROOT = Path.home() / ".agent-reach/tools/arcs-mcp"
ENV_PATH = ROOT / ".env"
BROWSER_DIR = ROOT / "browser_user_dir"

REQUIRED_KEYS = [
    "WECHAT_PUBLIC_ACCOUNT_GRANT_TYPE",
    "WECHAT_PUBLIC_ACCOUNT_APPID",
    "WECHAT_PUBLIC_ACCOUNT_SECRET",
    "WECHAT_MARKDOWN2HTML",
    "WECHAT_AUTHOR",
    "WECHAT_ARTICLE_PUBLISH_MODE",
]
OPTIONAL_KEYS = ["WECHAT_COVER_IMAGE"]


def load_env() -> Dict[str, str]:
    if not ENV_PATH.exists():
        raise FileNotFoundError(f"未找到配置文件: {ENV_PATH}")
    data: Dict[str, str] = {}
    for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        data[key.strip()] = value.strip()
    return data


def get_cookie_db_path() -> Path:
    return BROWSER_DIR / "Default" / "Cookies"


def has_browser_cookie_db() -> bool:
    return get_cookie_db_path().exists()


def has_wechat_login_cookie() -> bool:
    cookie_db = get_cookie_db_path()
    if not cookie_db.exists():
        return False
    try:
        import sqlite3
        conn = sqlite3.connect(cookie_db)
        cur = conn.cursor()
        rows = cur.execute(
            "select count(1) from cookies where host_key like '%mp.weixin.qq.com%' or host_key like '%weixin.qq.com%'"
        ).fetchone()
        conn.close()
        return bool(rows and rows[0])
    except Exception:
        return False


def check_missing(env: Dict[str, str]) -> List[str]:
    return [key for key in REQUIRED_KEYS if not env.get(key, "").strip()]


def get_access_token(env: Dict[str, str]):
    payload = json.dumps(
        {
            "grant_type": env.get("WECHAT_PUBLIC_ACCOUNT_GRANT_TYPE", "client_credential") or "client_credential",
            "appid": env.get("WECHAT_PUBLIC_ACCOUNT_APPID", "").strip(),
            "secret": env.get("WECHAT_PUBLIC_ACCOUNT_SECRET", "").strip(),
        }
    ).encode("utf-8")
    req = urlrequest.Request(
        "https://api.weixin.qq.com/cgi-bin/stable_token",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urlrequest.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def main() -> int:
    env = load_env()
    missing = check_missing(env)
    result = {
        "env_path": str(ENV_PATH),
        "browser_cookie_db_exists": has_browser_cookie_db(),
        "wechat_login_cookie_exists": has_wechat_login_cookie(),
        "required_missing": missing,
        "optional_missing": [k for k in OPTIONAL_KEYS if not env.get(k, "").strip()],
        "token_check": None,
        "ready_for_draft_add": False,
        "next_action": [],
    }

    if missing:
        result["next_action"].append("先补齐 .env 中必填项，尤其是 WECHAT_PUBLIC_ACCOUNT_APPID / SECRET")
    else:
        try:
            token_json = get_access_token(env)
            if "access_token" in token_json:
                result["token_check"] = {"ok": True, "expires_in": token_json.get("expires_in")}
            else:
                result["token_check"] = {"ok": False, "response": token_json}
                result["next_action"].append("AppID/Secret 已填写，但 stable_token 校验失败，需检查公众号接口权限/IP 白名单")
        except Exception as e:
            result["token_check"] = {"ok": False, "error": str(e)}
            result["next_action"].append("网络或微信接口调用失败，需重试并核对开发者配置")

    if result["token_check"] and result["token_check"].get("ok"):
        result["ready_for_draft_add"] = True
        if result["optional_missing"]:
            result["next_action"].append("draft/add 可继续，但建议补 WECHAT_COVER_IMAGE；否则需改为临时上传封面素材的脚本")
        else:
            result["next_action"].append("access_token 已可用，可继续验证 draft/add")

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
