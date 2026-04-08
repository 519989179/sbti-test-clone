# 来源摘要：Karpathy《LLM Wiki》gist

## 基本信息
- 日期：2026-04-08
- 类型：外部方法论参考
- 原链接：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## 核心结论
- 知识库不该只是 RAG 检索层，而应该是一个由 LLM 持续维护的中间 wiki 层。
- 新来源进入后，LLM 要负责摘要、归档、交叉链接、修正旧认知，而不是只在提问时临时找片段。

## 关键结构
1. Raw sources：原始资料层，保持不改
2. Wiki：结构化 markdown 页面层，由 LLM 维护
3. Schema：规则层，约束目录、流程、命名和维护方式

## 关键操作
- ingest：新资料入库并更新相关页面
- query：优先基于 wiki 回答，必要时回溯 raw
- lint：定期检查冲突、孤页、过时结论、缺失链接

## 最值得抄的点
- `index.md` 做内容索引
- `log.md` 做时间日志
- 高价值问答要反写回 wiki
- Wiki 是一个持续积累的认知资产，而不是一次性答案生成器

## 对当前知识库的启发
- 非常适合服务长期书稿、内容运营、个人方法论沉淀
- 第一版不需要复杂 RAG 基础设施，先靠 markdown + index 就够用
- 应该先聚焦高价值主线，而不是一开始做成大而全杂货铺

## 相关页面
- [[topics/llm-wiki-pattern]]
- [[methods/source-ingest-workflow]]
- [[decisions/use-persistent-wiki-not-plain-rag]]
- [[projects/personal-knowledge-base]]

## 最后更新
- 2026-04-08
