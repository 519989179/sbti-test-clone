---
type: home
status: active
updated: 2026-04-08
tags:
  - knowledge-base
  - home
---

# 卷卷知识库首页

> 这是知识库入口。先看这里，别一上来钻文件夹。

## 现在最该看
- [[projects/book-one-person-one-team]]
- [[topics/book-writing-progress]]
- [[topics/book-outline-map]]
- [[projects/geo-optimization]]
- [[projects/xiaohongshu-ai-content-system]]
- [[log]]

## 当前状态
- 知识库骨架：已建好
- Obsidian 浏览：已可直接使用
- 首批已入库：个人知识库方案、书稿正式大纲、书稿进度索引
- 当前重点：继续吸收书稿正文、补齐项目页与主题页

## 快速导航
### 入口页
- [[overview]]
- [[index]]
- [[log]]

### 项目
- [[projects/book-one-person-one-team]]
- [[projects/personal-knowledge-base]]
- [[projects/geo-optimization]]
- [[projects/xiaohongshu-ai-content-system]]

### 主题
- [[topics/llm-wiki-pattern]]
- [[topics/book-outline-map]]
- [[topics/book-writing-progress]]

### 方法 / 决策
- [[methods/source-ingest-workflow]]
- [[decisions/use-persistent-wiki-not-plain-rag]]

### 来源
- [[sources/2026-04-08-karpathy-llm-wiki]]
- [[sources/2026-03-25-book-outline-official]]
- [[sources/2026-03-26-book-progress-index]]

## 推荐你在 Obsidian 里怎么用
1. 左侧文件栏固定看 `home.md`
2. 右上角开反向链接面板
3. 想看关系，直接开 Graph View
4. 想找内容，优先搜：书稿 / GEO / 小红书 / 决策 / 方法

## 如果你装了 Dataview 插件
下面这几段会自动变成列表。

```dataview
TABLE type, status, updated
FROM ""
WHERE type = "project"
SORT updated desc
```

```dataview
TABLE type, updated
FROM "topics"
SORT updated desc
```

```dataview
TABLE updated
FROM "sources"
SORT updated desc
```
