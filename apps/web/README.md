# UIX Demo

UIX 协议层的演示应用，展示 UIX IR 如何通过 React 渲染器呈现。

## 运行

```bash
# 从项目根目录
pnpm install
pnpm dev
```

## 演示内容

- **UIX IR 渲染**: 展示 LucidConversation 和 LucidBlock 的渲染
- **流式内容**: 演示 streaming 状态下的自修复 Markdown
- **Block 类型**: text、tool、thinking 等 Block 类型的渲染
- **设计系统**: 双主题色彩（Rational Blue / Sentient Gold）

## 技术栈

- React + TypeScript + Vite
- @lucidui/react - React 渲染器
- @lucidui/stream - 流式内容渲染
- @lucidui/tokens - 设计令牌
- Tailwind CSS

## 相关链接

- [UIX 文档](https://github.com/Deepractice/UIX)
- [UIX IR 规范](../../docs/adr/0006-lucid-ir-specification.md)
