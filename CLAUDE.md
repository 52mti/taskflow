# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WeChat Mini Program (微信小程序) called "审批助手" (Approval Assistant) - a task/workflow approval system built using the native WeChat Mini Program framework with Vant Weapp UI components.

## Development Environment

- **Framework**: Native WeChat Mini Program (MINA framework)
- **UI Library**: Vant Weapp v1.11.7
- **Base Library Version**: 3.13.0
- **IDE**: WeChat Developer Tools

### Running the Project

1. Open WeChat Developer Tools (微信开发者工具)
2. Import this project directory
3. The project will auto-compile and run in the simulator

### Building npm Dependencies

In WeChat Developer Tools: Tools → Build npm (工具 → 构建npm)

## Architecture

### Page Flow

```
login → taskList (tab) ↔ profile (tab)
           ↓
      taskDetail
           ↓
       taskEdit
```

### Key Directories

- `pages/` - Page components following WeChat MP conventions (each page has .js, .wxml, .wxss, .json)
- `components/` - Reusable components (`form-edit` for dynamic forms, `custom-table` for data tables)
- `custom-tab-bar/` - Custom tab bar implementation
- `utils/` - Shared utilities and API layer

### API Layer

- `utils/request.js` - Core HTTP wrapper around `wx.request()` with token handling and error management
- `utils/https.js` - Domain-specific API functions (dictionary lookups, customer/material/supplier queries)
- `config.js` - Environment-based configuration (develop/trial/release) with base URL

### Form System

The app uses a config-driven form system:
- `pages/taskEdit/formConfigs.js` - Defines form schemas for different approval types (payment, invoice, deposit, etc.)
- `components/form-edit/` - Renders forms dynamically based on config with support for:
  - Text/number/textarea inputs
  - Date pickers (calendar)
  - Dynamic pickers (data loaded from APIs)
  - File upload
  - Nested table forms

### Authentication

- Token-based auth stored in `wx.Storage` (`token`, `tokenName`, `userInfo`)
- Auto-redirect to login on 401 or business code 25000007
- Login page is the entry point (`entryPagePath`)

## Code Conventions

- ES6 modules with `import/export`
- Chinese comments and UI text (this is a Chinese app)
- Component options: properties/data/methods pattern for components
- Page options: Page() with data/onLoad/onShow/methods pattern

## Workflow Task Types

The system handles multiple approval workflows defined by `processDefinitionId`:
- `KEY_PAYMENT_ORDER` - Payment approval (用款审批)
- `KEY_AUDIT_FEE` - Audit fee approval (审计费审批)
- `KEY_INVOICE` - Invoice approval (开票审批)
- `KEY_DEPOSIT` - Deposit approval (保证金审批)
- `KEY_PURCHASE_ORDER` - Purchase order approval (采购单审批)
- `KEY_SUPPLIER` - Supplier approval (供应商审批)
- And more (construction team, project distribution, settlement, completion)
