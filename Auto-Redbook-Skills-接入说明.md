# Auto-Redbook-Skills 接入说明

## 已安装位置
- 仓库目录：`/Users/zhaiyongqiang/.openclaw/workspace/Auto-Redbook-Skills`
- Skills 挂载目录：`~/.openclaw/skills/Auto-Redbook-Skills`
- Python 虚拟环境：`/Users/zhaiyongqiang/.openclaw/workspace/Auto-Redbook-Skills/.venv`

## 这个技能能做什么
1. 根据需求撰写小红书笔记标题和正文
2. 生成适合渲染的 Markdown 素材
3. 渲染小红书封面图和正文卡片图
4. 可选：发布到小红书（依赖 Cookie，当前需谨慎验证）

## 当前确认可用的部分
- `render_xhs.py` 渲染脚本可正常运行
- Node 依赖、Python 依赖、Playwright Chromium 已安装
- 适合先用于：
  - 小红书内容卡片生成
  - 封面图/正文图批量渲染

## 注意事项
- 仓库 `requirements.txt` 中的 `xhs>=0.4.0` 当前无法直接安装
- 实际安装时改用：`xhs==0.2.13`
- 因此：
  - **渲染功能已验证可用**
  - **发布功能暂不默认视为完全稳定**，正式公开发帖前建议先 dry-run 或小范围验证

## 标准使用流程

### A. 先写文案
先生成两份内容：
1. 小红书最终文案（标题 + 正文）
2. 渲染专用 Markdown（不要直接拿正文原文去渲染）

渲染 Markdown 推荐结构：

```markdown
---
emoji: "🚀"
title: "封面标题"
subtitle: "封面副标题"
---

# 第一张卡片内容

---

# 第二张卡片内容
```

### B. 渲染图片
进入项目目录后执行：

```bash
cd /Users/zhaiyongqiang/.openclaw/workspace/Auto-Redbook-Skills
source .venv/bin/activate
python scripts/render_xhs.py <markdown文件> -t sketch -m separator
```

常用模式：

```bash
# 默认：手绘风 + 手动分页
python scripts/render_xhs.py demos/content.md -t sketch -m separator

# 内容长短不稳定时，自动分页
python scripts/render_xhs.py demos/content.md -t sketch -m auto-split

# 固定尺寸自动缩放
python scripts/render_xhs.py demos/content_auto_fit.md -t sketch -m auto-fit
```

### C. 输出结果
默认会生成：
- `cover.png`
- `card_1.png`
- `card_2.png`
- ...

## 推荐默认参数
为了减少决策成本，先采用这套默认值：
- 主题：`sketch`
- 分页：
  - 内容已人工分段清楚 → `separator`
  - 内容长短不稳定 → `auto-split`
- 尺寸：默认 1080 × 1440
- dpr：默认 2

## 可用主题
- `default`
- `playful-geometric`
- `neo-brutalism`
- `botanical`
- `professional`
- `retro`
- `terminal`
- `sketch`

## 后续接入建议
1. 当你说“做一篇小红书笔记”时，我默认按以下流程执行：
   - 明确主题/目标人群/产品
   - 产出标题+正文
   - 产出渲染 Markdown
   - 渲染出封面+卡片图
   - 如你明确要求，再进入发布阶段

2. 发布阶段默认保守处理：
   - 先生成内容和图片
   - 发布前再单独确认 Cookie / 可见性 / 是否公开

## 快速指令建议
后续你可以直接这样说：
- “用 Auto-Redbook-Skills 做一篇小红书笔记”
- “把这篇内容转成小红书卡片图”
- “用 sketch 风格渲染这篇小红书内容”
- “先出图，不发布”
- “先生成 Markdown 和图片”
