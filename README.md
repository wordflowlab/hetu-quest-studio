# 游戏任务工坊

> 把任务前提、状态变量、选择代价和固定试玩轨迹变成可检查、可继续创作的任务工程。

## 简介

河图洛书的独立创作插件，由外部Codex通过河图CLI／MCP读取包内Skill并操作。互动叙事拥有分支文本、存档和故事试玩，本包专注任务条件、资源效果与状态可达性。游戏引擎拥有运行时资源、联网玩家和正式游戏发布；本包不提供战斗平衡认证、在线运营或任意脚本执行。

## 角色分流

- 作者使用 → [插件中心](https://hetu.limeai.run/plugins/quest-studio/)
- Agent与功能Review → [功能清单](CAPABILITIES.md)
- 开发与维护 → [完整设计文档](docs/README.md)

## 快速上手

开发需要Node.js 25，安装与验收基线为河图0.12.6。

```bash
npm ci
npm run build
npm run check
npm run test:unit
npm run package
```

## 边界

专业成果沿固定来源与修订接续，正文采纳、定稿、费用和外发独立决定。发行及实际验收范围见[实施记录](docs/08-实施计划与验收记录.md)。
