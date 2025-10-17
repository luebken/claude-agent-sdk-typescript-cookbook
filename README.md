# Claude Agent SDK Cookbook

This repo is a simple port of the [Claude Agent SDK Coookbook](https://github.com/anthropics/claude-cookbooks/tree/main/claude_code_sdk) to the [Typescript Agent SDK](https://github.com/anthropics/claude-agent-sdk-typescript) [Agent SDK reference - TypeScript](https://docs.claude.com/en/api/agent-sdk/typescript) with the goal of a quickstart.

## Install

If you want to start from scratch: 

```sh
pnpm install @anthropic-ai/claude-agent-sdk
```

or clone this repo.

Get and a key from console.anthropic.com and .env file as ANTHROPIC_API_KEY=

## 00: The One-Liner Research Agent

Start your journey with a simple yet powerful research agent built in just a few lines of code. This script introduces core SDK concepts and demonstrates how the Claude Agent SDK enables autonomous information gathering and synthesis.

Key Concepts:

* Basic agent loops with query() and async iteration
* WebSearch tool for autonomous research
* Multimodal capabilities with the Read tool
* Conversation context management
+ System prompts for agent specialization

See [00_research_agent/README.md](00_research_agent/README.md)

