---
type: home
status: active
updated: 2026-04-08
tags:
  - knowledge-base
  - dashboard
  - home
---

# 卷卷知识库控制台

> 先看这里。这页不是目录，是总控台。

---

## 现在最重要的 3 件事

### 1. 书稿总控
- 当前最高优先级项目：[[projects/book-one-person-one-team]]
- 正式大纲：[[topics/book-outline-map]]
- 当前进度：[[topics/book-writing-progress]]
- 推荐下一步：继续核对第1章 / 第2章 / 第5章，并把正文级内容纳入知识库
- 书稿控制台：[[dashboard-book]]

### 2. GEO / 内容运营
- 项目页：[[projects/geo-optimization]]
- 运营控制台：[[dashboard-ops]]
- 当前缺口：文章链接归档、豆包收录追踪汇总

### 3. 知识库本体建设
- 项目页：[[projects/personal-knowledge-base]]
- 当前状态：骨架已建，产品感仍在补
- 当前重点：把已有资料继续变成可浏览、可追踪、可续写的控制台

---

## 项目看板

| 项目 | 状态 | 当前判断 | 下一步 |
|---|---|---|---|
| 书稿《一个人就是一个团队》 | 高优先级推进中 | 大纲已锁定，3/4章明确已完成，1/2/5章待核对 | 继续正文级 ingest |
| 96编辑器 GEO 优化 | 推进中 | 主体动作做过一轮，但归档和追踪还没收口 | 补链接与收录汇总 |
| 小红书 AI 内容体系 | 推进中 | 链路已通，接下来要做系统化内容抓取与重构 | 建信源池与内容规则页 |
| 个人知识库 | 搭建中 | 基础结构可用，但控制台感还在补 | 持续产品化 |

---

## 一眼看入口
- 总览：[[overview]]
- 总索引：[[index]]
- 日志：[[log]]
- 书稿控制台：[[dashboard-book]]
- 运营控制台：[[dashboard-ops]]

---

## 最近最值得点开的页面
- [[projects/book-one-person-one-team]]
- [[topics/book-writing-progress]]
- [[topics/book-outline-map]]
- [[sources/2026-03-25-book-outline-official]]
- [[sources/2026-03-26-book-progress-index]]

---

## 现在有哪些页面类型
- `project`：项目页
- `topic`：主题页
- `source`：来源摘要页
- `method`：方法页
- `decision`：决策页
- `dashboard`：控制台页

---

## 如果你装了 Dataview，这里会更像产品

### 项目总览
```dataview
TABLE priority as 优先级, status as 状态, updated as 更新
FROM "projects"
SORT priority desc, updated desc
```

### 最近更新页面
```dataview
TABLE type as 类型, updated as 更新
FROM ""
WHERE updated
SORT updated desc
LIMIT 12
```

### 书稿相关页面
```dataview
TABLE type as 类型, updated as 更新
FROM ""
WHERE contains(tags, "book")
SORT updated desc
```

### 来源页
```dataview
TABLE updated as 更新
FROM "sources"
SORT updated desc
```

---

## 推荐你在 Obsidian 里怎么用
1. 左侧固定 `home.md`
2. 右侧打开 Backlinks
3. 单独开一个 Graph View 标签页
4. 想查书稿，就从 `dashboard-book` 进
5. 想查业务，就从 `dashboard-ops` 进
