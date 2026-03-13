# 艾乐同学公众号链路检查

当前目标：先打通 **送入草稿箱**。

## 已确认现状

- 发布底座：`~/.agent-reach/tools/arcs-mcp/extension/wechat/`
- 技能包：`tmp/gzh-skill/`
- 历史草稿样例：`wechat-pub/first_draft.json`
- 自动检查脚本：`wechat-pub/check_wechat_pipeline.py`

## 一键检查

```bash
python3 wechat-pub/check_wechat_pipeline.py
```

当前检查重点：
- `WECHAT_PUBLIC_ACCOUNT_APPID`
- `WECHAT_PUBLIC_ACCOUNT_SECRET`
- `WECHAT_COVER_IMAGE`
- 浏览器是否存在公众号登录态

## 当前阻塞点

根据本地实测，公众号这条链路现在卡在：

1. `~/.agent-reach/tools/arcs-mcp/.env` 里缺：
   - `WECHAT_PUBLIC_ACCOUNT_APPID`
   - `WECHAT_PUBLIC_ACCOUNT_SECRET`
2. 也还缺：
   - `WECHAT_COVER_IMAGE`（可选但建议补）
3. 浏览器目录虽然存在 Cookie DB，但**没有公众号登录 Cookie**

## 打通标准

只要满足下面两项，就能继续实测 `draft/add`：

- `.env` 里有可用的 `AppID / Secret`
- `stable_token` 能成功返回 `access_token`

## 下一步建议

### 方案 A：走开发者 API（推荐）

1. 把 `AppID / Secret` 填回 `~/.agent-reach/tools/arcs-mcp/.env`
2. 运行检查脚本，确认 `ready_for_draft_add = true`
3. 补一个可用的 `WECHAT_COVER_IMAGE`
4. 再跑草稿箱写入脚本

### 方案 B：走人工登录态辅助

适用于 API 还没配好，但想先临时验证内容进后台的场景。

1. 打开公众号后台并手动登录
2. 保留登录态
3. 用浏览器自动化 / 手动粘贴的方式先完成首篇草稿闭环
4. 再回头补 API 自动化

## 备注

现阶段最优先的不是“做得多漂亮”，而是：

> 先把一篇文章稳定送进草稿箱。
