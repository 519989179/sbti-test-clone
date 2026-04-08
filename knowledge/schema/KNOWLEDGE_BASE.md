# KNOWLEDGE_BASE.md

## 目标

这个知识库不是资料仓库，而是**持续积累的个人 wiki**。

原则：
- `raw/` 只放原始资料，默认不修改
- `wiki/` 放结构化认知页，由 AI 维护
- 高价值问答、分析、结论，要尽量反写回 wiki
- 新资料进入后，不只是存档，要更新已有页面与交叉链接
- 优先服务当前最重要的长期事项：**书稿共创、AI 内容运营、个人方法论沉淀**

---

## 目录约定

```text
knowledge/
  raw/
    inbox/
    articles/
    chats/
    book/
    projects/
  wiki/
    index.md
    log.md
    overview.md
    people/
    projects/
    topics/
    methods/
    decisions/
    sources/
  schema/
    KNOWLEDGE_BASE.md
```

### raw/
- `inbox/`：新丢进来的、尚未处理的资料
- `articles/`：文章、网页摘录、论文、外部内容
- `chats/`：聊天记录、语音转文字、会议纪要
- `book/`：书稿相关原始素材、灵感、章节草稿输入
- `projects/`：项目文档、策略稿、运营记录、实验数据

### wiki/
- `overview.md`：整个知识库的总览与当前重点
- `index.md`：全量页面索引，按类别列出
- `log.md`：按时间记录 ingest / query / lint / major-update
- `people/`：人物页
- `projects/`：项目页
- `topics/`：主题页
- `methods/`：方法论页
- `decisions/`：关键决策页
- `sources/`：来源摘要页

---

## 页面命名规则

统一使用小写英文文件名，词间用 `-` 连接。

示例：
- `wiki/projects/book-one-person-one-team.md`
- `wiki/topics/geo-content-strategy.md`
- `wiki/methods/source-to-xiaohongshu-workflow.md`
- `wiki/decisions/delete-wechat-public-account-plan.md`
- `wiki/sources/2026-04-08-karpathy-llm-wiki.md`

页面标题可以用中文。

---

## 页面格式约定

每个 wiki 页面尽量包含以下部分：

```md
# 标题

## 核心结论
- 先给结论，尽量短

## 内容
- 结构化正文

## 相关页面
- [[相关页A]]
- [[相关页B]]

## 来源
- [[来源页]]

## 最后更新
- YYYY-MM-DD
```

可选 YAML frontmatter：

```yaml
---
type: topic
status: active
updated: 2026-04-08
tags: [knowledge-base, wiki]
---
```

---

## 入库工作流（ingest）

当有新资料进入 `raw/inbox/` 时：

1. 阅读原始资料
2. 判断它属于哪一类（文章 / 项目 / 书稿 / 聊天 / 决策）
3. 生成一页 `wiki/sources/` 来源摘要
4. 更新 `wiki/index.md`
5. 更新相关主题页 / 项目页 / 方法页 / 决策页
6. 如果资料引入新概念，创建新页面
7. 如果资料和旧结论冲突，要在相关页标记冲突或版本变化
8. 在 `wiki/log.md` 追加一条记录
9. 处理完成后，将原始资料从 `raw/inbox/` 移到对应分类目录

---

## 查询工作流（query）

回答问题时优先顺序：

1. 先读 `wiki/index.md`
2. 找到相关 wiki 页面
3. 不够时再回溯 `raw/`
4. 给出结论时优先基于已整理的 wiki，而不是每次从原始资料重算
5. 如果这次问答产出了高价值结论，反写为新页面或更新旧页面

---

## 巡检工作流（lint）

定期检查：
- 是否存在孤立页面
- 是否有过时结论
- 是否有重复页面
- 是否有缺来源支撑的判断
- 是否有值得单独建页的重要概念
- 是否有多个项目共享的方法论，应该上升成 `methods/` 页

---

## 当前优先建设范围

第一阶段只重点建设这三块：

1. **书稿知识库**
   - 《一个人就是一个团队》
   - 章节结构、论点、案例、灵感、写作约束

2. **AI 内容运营知识库**
   - GEO
   - 小红书内容工作流
   - 平台经验、发布 SOP、选题方法

3. **个人方法论知识库**
   - 决策习惯
   - 工作方式
   - 对 AI、内容、产品、个人商业化的判断

别一上来泛化成人生百科。先把最赚钱、最常用、最长期的东西做厚。

---

## 当前执行规则

- 先更新现有页面，再考虑新建页面
- 一个来源可能触发多个页面联动更新
- 一个高价值回答默认值得进入 wiki
- 页面内容要偏“结论化、结构化、可复用”，不要写成聊天记录
- 任何页面都尽量带上来源页链接
