---
type: dashboard
status: active
scope: book
priority: highest
updated: 2026-04-08
tags:
  - dashboard
  - book
  - manuscript
---

# 书稿控制台｜《一个人就是一个团队》

> 这页只服务一件事：快速判断这本书现在写到哪、缺什么、下一步干什么。

## 当前判断
- 正式大纲：已锁定
- 已明确完成：第3章 3.1～3.5、第4章 4.1～4.4
- 已发现但待核对：第1章、第2章、第5章正文文件
- 当前最该做：把已存在正文继续转成知识页，而不是重复写

## 现在先看这几个
- [[projects/book-one-person-one-team]]
- [[topics/book-outline-map]]
- [[topics/book-writing-progress]]
- [[sources/2026-03-25-book-outline-official]]
- [[sources/2026-03-26-book-progress-index]]

## 关键规则
- 续写前先核对正式大纲
- 续写前再核对已有正文
- 不允许凭记忆接着写
- 不能被旧标题文件名带偏
- 输出默认要保留 `.md` + `.docx`

## 章节状态面板
| 区块 | 状态 | 备注 |
|---|---|---|
| 第1章 | 已发现正文，待核对 | 需要确认是否完全贴合当前正式大纲 |
| 第2章 | 已发现正文，待核对 | 已存在合并版线索 |
| 第3章 | 已完成 | 3.1～3.5 明确完成 |
| 第4章 | 已完成 | 4.1～4.4 明确完成 |
| 第5章 | 已发现正文，待核对 | 文件存在，但命名和内容仍需交叉确认 |
| 第6章 | 暂未入库 | 后续补 |
| 第7章 | 暂未入库 | 后续补 |

## 下一步动作
1. 核对第1章正文与正式大纲对应关系
2. 核对第2章 2.1～2.5 合并稿内容
3. 核对第5章文件是否与当前正式大纲一致
4. 为每章建立更细的知识页

## Dataview 视图（装插件后自动生效）

### 所有书稿相关页面
```dataview
TABLE type as 类型, status as 状态, updated as 更新
FROM ""
WHERE contains(tags, "book")
SORT updated desc
```

### 书稿来源页
```dataview
TABLE updated as 更新
FROM "sources"
WHERE contains(file.name, "book") OR contains(file.name, "outline") OR contains(file.name, "progress")
SORT updated desc
```
