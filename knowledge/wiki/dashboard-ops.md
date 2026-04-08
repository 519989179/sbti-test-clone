---
type: dashboard
status: active
scope: ops
priority: high
updated: 2026-04-08
tags:
  - dashboard
  - geo
  - content-ops
---

# 运营控制台｜GEO / 小红书内容体系

> 这页管业务推进，不管书稿。

## 当前判断
- GEO：已经做过一轮核心动作，但归档和追踪没完全收口
- 小红书：自动发布链路已通，下一步重点是信源抓取 + 内容重构写作
- 当前最值的不是继续散干，而是把方法、规则、状态沉淀成系统页

## 现在先看这几个
- [[projects/geo-optimization]]
- [[projects/xiaohongshu-ai-content-system]]
- [[methods/source-ingest-workflow]]

## 当前缺口
- GEO 文章链接归档页
- 豆包收录追踪汇总页
- 小红书信源池页
- 内容重构规则页
- 标题 / 封面策略页
- 发布 SOP 页

## 下一步动作
1. 先给 GEO 补“链接归档 + 收录追踪”两个核心页
2. 再给小红书补“信源池 + 重构规则”两个核心页
3. 把现有经验从聊天记录抽成稳定方法页

## Dataview 视图（装插件后自动生效）
```dataview
TABLE type as 类型, updated as 更新
FROM "projects"
WHERE contains(tags, "geo") OR contains(tags, "xiaohongshu") OR contains(tags, "content-system")
SORT updated desc
```
