# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## Agent Reach (2026-03-05 安装)

互联网多平台访问工具，skill 位于 `~/.openclaw/skills/agent-reach/`

### 可用渠道 (9/13)

| 渠道 | 状态 | 工具 |
|------|------|------|
| GitHub | ✅ 已登录 (519989179) | `gh` |
| YouTube | ✅ | `yt-dlp` |
| Twitter/X | ✅ | `xreach` |
| B站 | ✅ | `yt-dlp` |
| 小红书 | ✅ 已登录 (xiaohongshu-mcp) | `mcporter call 'xiaohongshu.*'` |
| 抖音 | ✅ | `mcporter call 'douyin.*'` |
| 全网搜索 | ✅ | `mcporter call 'exa.*'` |
| RSS/Atom | ✅ | `feedparser` |
| 任意网页 | ✅ | `curl https://r.jina.ai/URL` |
| Reddit | ⬜ 需代理 | — |
| LinkedIn | ⬜ 未配置 | — |
| Boss直聘 | ⬜ 未配置 | — |
| 微信公众号 | ⚠️ 已装未注册 | venv: `~/.agent-reach/tools/wechat-article/` |

### 本地服务

- 小红书 MCP: `localhost:18060`（Go 编译，源码 `~/.agent-reach/tools/xiaohongshu-mcp/repo/`）
- 抖音 MCP: `localhost:18070`（Python，源码 `~/.agent-reach/tools/douyin-mcp-server/`）

### 注意事项

- 小红书和抖音 MCP 服务需要手动启动（重启电脑后不会自动运行）
- 检查状态：`agent-reach doctor`
- 更新：`pip install --upgrade https://github.com/Panniantong/agent-reach/archive/main.zip`

---

## Auto-Redbook-Skills (2026-03-09 安装)

小红书笔记创作与卡片渲染技能。

### 安装位置

- 仓库目录：`/Users/zhaiyongqiang/.openclaw/workspace/Auto-Redbook-Skills`
- Skill 挂载目录：`~/.openclaw/skills/Auto-Redbook-Skills`
- Python 虚拟环境：`/Users/zhaiyongqiang/.openclaw/workspace/Auto-Redbook-Skills/.venv`

### 当前可用能力

- 根据需求产出小红书标题与正文
- 生成渲染专用 Markdown
- 渲染封面图与正文卡片图
- 可选发布到小红书（需 Cookie，当前谨慎使用）

### 已确认可用

- `scripts/render_xhs.py` 已验证能正常运行
- Python 依赖、Node 依赖、Playwright Chromium 已安装完成

### 默认推荐用法

- 默认主题：`sketch`
- 分页策略：
  - 已人工切分内容 → `separator`
  - 内容长短不稳定 → `auto-split`
- 输出尺寸：默认 1080 × 1440
- **图片生成模型规则：默认一律使用 5.0 模型**（如即梦 / Seedream 出图）；只有老大明确要求对比版本或指定其他模型时，才允许临时切换。

### 已知限制

- 仓库 `requirements.txt` 中的 `xhs>=0.4.0` 当前无法直接安装
- 实际安装时改用：`xhs==0.2.13`
- 因此当前优先把它当作：
  - **内容生成技能**
  - **卡片图片渲染技能**
- 发布功能后续若要正式用，建议先 `dry-run` 或做一次单独验证

### 接入工作流规则

当艾乐说“做一篇小红书笔记”时，可默认按以下流程执行：
1. 明确主题 / 目标人群 / 产品或资料
2. 生成标题 + 正文
3. 生成渲染专用 Markdown
4. 渲染 `cover.png` + `card_*.png`
5. 若艾乐明确要求，再进入发布步骤

### 参考文件

- 详细接入说明：`Auto-Redbook-Skills-接入说明.md`
- Skill 描述文件：`Auto-Redbook-Skills/SKILL.md`
- 项目文档：`Auto-Redbook-Skills/README.md`

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 📚 踩坑手册 (Skill 自动总结)

> 每次踩坑或解决关键问题后自动追加。格式：日期 + 平台 + 问题 + 解法 + 经验。

---

### 2026-03-07 | 百家号封面图上传

**问题：** Playwright `upload` / `setInputFiles` 无法触发百家号封面图上传，图片不显示。

**根本原因：**
- 百家号封面上传用的是 React + `cheetah-upload` 自定义组件
- `action` 属性为空字符串，上传逻辑在 `customRequest` 或点发布时才真正调用
- `beforeUpload` 只做 blob URL 预览，不上传到服务器
- 点"确定"后调 `/pcui/picture/processproxy` 上传，但需要特定 `action` 参数值

**已验证路径（成功步骤）：**
1. 通过 CDP WebSocket 把真实 JPEG（57KB）base64 注入浏览器
2. 在 JS 里 `atob()` 还原成 `Uint8Array` → `Blob` → `File`
3. 找到 React Fiber 链上 depth=6 的 `onChange` 并调用（传入完整 fileObj）
4. tab 变成"正文/本地上传(1)"，确定按钮变成"确定 (1)"——图片已选中

**卡点：**
- 点确定后调 `processproxy` 接口，但请求没有被触发
- 接口 `processproxy` 需要 `action` 参数，传 `cover` 等值返回 `ret: null`
- 猜测：确定时做了额外校验（尺寸/宽高比），blob URL 通不过

**下次尝试方案：**
- 让老大用 Chrome 插件附加标签页（Browser Relay），用真实 Chrome 操作
- 或：直接发无封面版，事后手动加

**CDP 调用方式：**
```python
# 通过 WebSocket 向浏览器注入大 JS
WS_URL = "ws://127.0.0.1:18800/devtools/page/<targetId>"
# 用 websockets 库，max_size=20*1024*1024
# payload = {"id":1,"method":"Runtime.evaluate","params":{"expression":script,"awaitPromise":True,"returnByValue":True}}
```

---

### 2026-03-07 | 百家号 React Fiber 上传组件结构

**上传组件层级（depth 从 input[type=file] 往上数）：**
- depth=0: `cheetah-upload-wrapper` 里的 input
- depth=2: `uploadComp`，有 `uploadFiles()` 方法
- depth=6: 外层包装，有真正的 `onChange(fileList)`（UI 状态更新）

**关键代码：**
```js
// 注入图片到 React state
const input = document.querySelector('.cheetah-upload-wrapper input[type=file]');
const fk = Object.keys(input).find(k=>k.startsWith('__reactFiber'));
let f = input[fk];
let depth = 0;
while(f && depth < 20) {
  if(f.memoizedProps?.onChange && depth === 6) {
    f.memoizedProps.onChange({ fileList: [fileObj] });
    break;
  }
  f = f.return; depth++;
}
```

---

### 2026-03-07 | 百家号发布平台基本信息

- 编辑器地址：`https://baijiahao.baidu.com/builder/rc/edit?type=news`
- 图片处理接口：`POST /pcui/picture/processproxy`（需 `action` 参数）
- AI助手入口：`https://h2tcbox.baidu.com/ztbox?action=zpblog`
- 上传组件：`cheetah-upload`（自定义 React 组件，action 为空）

---

### 2026-03-05 | 平台发布已知可行方案

| 平台 | 发布方式 | 状态 |
|------|---------|------|
| 知乎 | browser 直接操作 | ✅ 已发布 |
| 今日头条 | browser 直接操作 | ✅ 已发布 |
| 百家号 | browser + React Fiber 注入 | ⚠️ 封面卡点 |
| 搜狐号 | 未尝试 | ⬜ 待做 |
