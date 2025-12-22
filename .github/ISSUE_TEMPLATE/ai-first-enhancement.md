---
name: AI-First Enhancement Roadmap
about: Enhance UIX as AI-to-UI Protocol Layer
title: '[Roadmap] AI-to-UI Protocol Enhancement'
labels: enhancement, documentation, protocol
assignees: ''
---

## ?Œæ™¯

UIX å®šä?ä¸?**AI-to-UI ?è®®å±?*:
- æ¶ˆè´¹?…æ˜¯ AIï¼Œä??¯å??‘è€?
- UIX IR ??AI ?Ÿæ? UI ?„ä¸­?´è¡¨ç¤?
- æ¸²æ??¨å? UIX IR è½¬æ¢ä¸ºå???UI

## ?¸å?æ´å?

> **ä¼ ç?ç»„ä»¶åº?*: å¼€?‘è€…å?ä»?? ??è°ƒç”¨ç»„ä»¶ ??UI
> **UIX ?è®®**: AI ?Ÿæ? UIX IR ??ç³»ç?æ¸²æ? ??UI

## ?®æ?

è®?UIX ?ä¸º?Ÿæ­£??AI-to-UI ?è®®å±?
1. AI ?½ç??ç¬¦??UIX IR è§„è???JSON
2. æ¸²æ??¨èƒ½æ­?¡®æ¸²æ??€??Block ç±»å?
3. ?¯æ?æµå?æ¸²æ??Œè‡ªä¿®å??…å®¹

---

## ?? å®æ–½è®¡å?

### Phase 1: UIX IR Schema (ä¼˜å?çº? â­â?â­?

**?®æ?**: å®Œæ? UIX IR ?è®®å®šä?

**?…å«?…å®¹**:

#### 1.1 ?¸å?ç±»å?
```typescript
interface LucidConversation {
  id: string
  role: 'user' | 'assistant' | 'system'
  status: 'streaming' | 'completed' | 'error'
  blocks: LucidBlock[]
  timestamp: number
}

interface LucidBlock {
  id: string
  type: 'text' | 'tool' | 'thinking' | 'image' | 'file' | 'error'
  status: 'streaming' | 'completed' | 'error'
  content: unknown
}
```

#### 1.2 Block ç±»å?

| ç±»å? | ?è¿° | Content ç»“æ? |
|------|------|-------------|
| `text` | ?‡æœ¬?…å®¹ | `{ text: string }` |
| `tool` | å·¥å…·è°ƒç”¨ | `{ name, input, output, status }` |
| `thinking` | ?¨ç?è¿‡ç? | `{ reasoning: string }` |
| `image` | ?¾ç? | `{ url, alt, width, height }` |
| `file` | ?‡ä»¶ | `{ name, type, url }` |
| `error` | ?™è¯¯ | `{ code, message }` |

**éªŒæ”¶?‡å?**:
- [ ] JSON Schema å®šä?å®Œæ?
- [ ] TypeScript ç±»å?å¯¼å‡º
- [ ] @uix/core ?…å?å¸?

---

### Phase 2: Block Renderers (ä¼˜å?çº? â­â?â­?

**?®æ?**: å®Œæ??€??Block ç±»å??„æ¸²?“å™¨

**?…å«?…å®¹**:

#### 2.1 å·²å???
- [x] TextBlock ??StreamMarkdown (å¸¦è‡ªä¿®å?)
- [x] ToolBlock ??ToolResult
- [x] ThinkingBlock ??ThinkingIndicator

#### 2.2 å¾…å???
- [ ] ImageBlock ???¾ç?æ¸²æ???
- [ ] FileBlock ???‡ä»¶?„ä»¶æ¸²æ???
- [ ] ErrorBlock ???™è¯¯å±•ç¤º

**éªŒæ”¶?‡å?**:
- [ ] ?€??Block ç±»å??½æ?å¯¹å??„æ¸²?“å™¨
- [ ] æ¸²æ??¨æ”¯??streaming ?¶æ€?
- [ ] æ¸²æ??¨å???error ?¶æ€?

---

### Phase 3: AgentX Adapter (ä¼˜å?çº? â­â?)

**?®æ?**: å°?AgentX äº‹ä»¶è½¬æ¢ä¸?UIX IR

**äº‹ä»¶? å?**:

| AgentX äº‹ä»¶ | UIX IR |
|------------|----------|
| text_delta | TextBlock (streaming) |
| tool_use_start | ToolBlock (status: running) |
| tool_result_message | ToolBlock (status: success) |
| conversation_thinking | ThinkingBlock |
| assistant_message | Conversation (completed) |

**éªŒæ”¶?‡å?**:
- [ ] AgentX äº‹ä»¶?¯è½¬?¢ä¸º UIX IR
- [ ] ?Œå?ç±»å?å®‰å…¨
- [ ] æµå?äº‹ä»¶æ­?¡®å¤„ç?

---

## ?’¡ è®¾è®¡?Ÿå?

### ?è®®å±?vs ç»„ä»¶åº?
| ç»´åº¦ | ä¼ ç?ç»„ä»¶åº?| UIX |
|-----|----------|----------|
| æ¶ˆè´¹??| å¼€?‘è€?| **AI** |
| è¾“å…¥ | ä»??è°ƒç”¨ | **JSON Schema (UIX IR)** |
| ?¸å?ä»·å€?| ç»„ä»¶å¤ç”¨ | **?è®®?‡å???* |
| ?©å??¹å? | æ·»å?ç»„ä»¶ | **?‚é??´å?æ¸²æ??®æ?** |

### ä¸ºä?ä¹ˆä?ç­?A2UI / MCP Apps ?ç?ï¼?
> "A2UI ??MCP Apps ?¯æœª?¥ç??®æ?ï¼ŒLucid IR ?¯ä?å¤©ç?æ¡¥æ???

| ?¹æ? | é£é™© |
|------|------|
| ç­‰æ??†æ???| äº§å??œæ? |
| ?´æ¥ç»‘å? A2UI | A2UI ?˜ä?è¦å¤§??|
| **UIX IR + ?‚é???* | ?…éƒ¨ç¨³å?ï¼Œå??¨çµæ´?|

---

## ?? ?¶é—´è§„å?

| ?¶æ®µ | å·¥ä???| ?¶æ€?|
|------|--------|------|
| Phase 1: UIX IR Schema | 2å¤?| è®¾è®¡ä¸?|
| Phase 2: Block Renderers | 2å¤?| ?¨å?å®Œæ? |
| Phase 3: AgentX Adapter | 1.5å¤?| å¾…å?å§?|

---

## ??å®Œæ??‡å?

- [ ] UIX IR JSON Schema å®šä?å®Œæ•´
- [ ] ?€??Block ç±»å??‰æ¸²?“å™¨
- [ ] AgentX äº‹ä»¶?¯è½¬?¢ä¸º UIX IR
- [ ] ?¯æ?æµå?æ¸²æ??Œè‡ªä¿®å?
- [ ] ?‡æ¡£?µå¾ªå¥¥å¡å§†å??€?Ÿå?

---

## ?? ?¸å…³èµ„æ?

- [UIX IR è§„è?](../../docs/adr/0006-lucid-ir-specification.md)
- [?è®®å±‚å?ä½](../../docs/adr/0001-enterprise-grade-ui-infrastructure.md)
- [Demo ç«™ç‚¹](https://deepractice.github.io/UIX/)
- [AgentX](https://github.com/Deepractice/AgentX)

