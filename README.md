# Claude Agent SDK Cookbook

This is a port of the [Claude Agent SDK Coookbook](https://github.com/anthropics/claude-cookbooks/tree/main/claude_code_sdk) to the [Typescript Agent SDK](https://github.com/anthropics/claude-agent-sdk-typescript). 

See also https://docs.claude.com/en/api/agent-sdk/typescript.

## Install

If you want to start from scratch start run `pnpm install @anthropic-ai/claude-agent-sdk` or clone this repo and run `pnpm install`.

Get a key from [console.anthropic.com](https://console.anthropic.com/) for the `.env` file and set `ANTHROPIC_API_KEY=`

## 00: The One-Liner Research Agent

Start your journey with a simple yet powerful research agent built in just a few lines of code. This script introduces core SDK concepts and demonstrates how the Claude Agent SDK enables autonomous information gathering and synthesis.

Key Concepts:

* Basic agent loops with query() and async iteration
* WebSearch tool for autonomous research
* Multimodal capabilities with the Read tool
* Conversation context management
+ System prompts for agent specialization

See [00_research_agent/README.md](00_research_agent/README.md)

## 01: The Chief of Staff Agent

Build a comprehensive AI Chief of Staff for a startup CEO, showcasing advanced SDK features for production environments. This script demonstrates how to create sophisticated agent architectures with governance, compliance, and specialized expertise.

Key Features Explored:

* Memory & Context: Persistent instructions with CLAUDE.md files
* Output Styles: Tailored communication for different audiences
* Plan Mode: Strategic planning without execution for complex tasks
* Custom Slash Commands: User-friendly shortcuts for common operations
* Hooks: Automated compliance tracking and audit trails
* Subagent Orchestration: Coordinating specialized agents for domain expertise
* Bash Tool Integration: Typescript script execution for procedural knowledge and complex computations

See [01_chief_of_staff_agent/README.md](01_chief_of_staff_agent/README.md)

WIP TODO continue with Feature 2: Output Styles https://github.com/anthropics/claude-cookbooks/blob/main/claude_code_sdk/01_The_chief_of_staff_agent.ipynb
