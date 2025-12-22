# ADR-0006: UIX IR è§„è?å®šä?

## ?¶æ€?

Accepted

## ?¥æ?

2024-12-21

## ?Œæ™¯

?¹æ® [ADR-0001](./0001-enterprise-grade-ui-infrastructure.md) ç¡®å???AI-to-UI ?è®®å±‚å?ä½ï??€è¦å?ä¹?UIX IR (Intermediate Representation) ?„æ ¸å¿ƒè??ƒã€?

### è®¾è®¡?¥æ?

UIX IR ?„è®¾è®¡ä? [AgentX](https://github.com/Deepractice/AgentX) ??UI å®è·µä¸­æŠ½è±¡è€Œæ¥ï¼?

```
AgentX UI (ç²—ç•¥å®ç°ï¼Œå?éªŒæ€?
    ???½è±¡?ç‚¼
UIX IR (?è®®è§„è?)
    ??å®ç°
AgentX UI + ?¶ä?æ¡†æ¶ (?µå¾ªè§„è?)
```

### AgentX äº‹ä»¶ç³»ç?

AgentX ?‡ç”¨ 4 å±‚ä?ä»¶æ¶?„ï?

| å±‚çº§ | ç±»å? | ç¤ºä? |
|------|------|------|
| Stream | ?Ÿå?æµä?ä»?| text_delta, tool_use_start |
| State | ?¶æ€å???| conversation_thinking, tool_executing |
| Message | å®Œæ•´æ¶ˆæ¯ | assistant_message, tool_result_message |
| Turn | å¯¹è?è½®æ¬¡ | turn_complete |

UIX IR ?€è¦èƒ½å¤Ÿè¡¨è¾¾è?äº›ä?ä»¶äº§?Ÿç? UI ?¶æ€ã€?

## ?³ç?

### ?¸å?ç±»å?å®šä?

```typescript
// å¯¹è?å®¹å™¨
interface LucidConversation {
  id: string
  role: 'user' | 'assistant' | 'system'
  status: 'streaming' | 'completed' | 'error'
  blocks: LucidBlock[]
  timestamp: number
}

// ?…å®¹??
interface LucidBlock {
  id: string
  type: 'text' | 'tool' | 'thinking' | 'image' | 'file' | 'error'
  status: 'streaming' | 'completed' | 'error'
  content: unknown  // ?¹æ® type ä¸å?
}

// æ¸²æ??¨æ¥??
interface LucidRenderer<T> {
  render(conversations: LucidConversation[]): T
}
```

### Block ç±»å?è§„è?

| ç±»å? | ?è¿° | Content ç»“æ? |
|------|------|-------------|
| `text` | ?‡æœ¬?…å®¹ï¼ˆæ”¯?æ?å¼ï? | `{ text: string }` |
| `tool` | å·¥å…·/?½æ•°è°ƒç”¨ç»“æ? | `{ name, input, output, status }` |
| `thinking` | AI ?¨ç?è¿‡ç? | `{ reasoning: string }` |
| `image` | ?¾ç??…å®¹ | `{ url, alt, width, height }` |
| `file` | ?‡ä»¶?„ä»¶ | `{ name, type, url }` |
| `error` | ?™è¯¯ä¿¡æ¯ | `{ code, message }` |

### Block è¯¦ç?å®šä?

```typescript
// ?‡æœ¬??
interface TextBlockContent {
  text: string
}

// å·¥å…·??
interface ToolBlockContent {
  name: string
  input: unknown
  output?: unknown
  status: 'pending' | 'running' | 'success' | 'error'
  error?: string
}

// ?è€ƒå?
interface ThinkingBlockContent {
  reasoning: string
}

// ?¾ç???
interface ImageBlockContent {
  url: string
  alt?: string
  width?: number
  height?: number
}

// ?‡ä»¶??
interface FileBlockContent {
  name: string
  type: string  // MIME type
  url: string
  size?: number
}

// ?™è¯¯??
interface ErrorBlockContent {
  code: string
  message: string
  details?: unknown
}
```

### è®¾è®¡?Ÿå?

1. **Block-Based æ¸²æ?**
   - ?‡æœ¬?Œå·¥?·å¯ä»¥å¹¶è¡Œå‡º?°åœ¨?Œä?æ¶ˆæ¯ä¸?
   - æ¯ä¸ª Block ?¬ç?æ¸²æ?ï¼Œä?ä¸å½±??

2. **æµå?ä¼˜å?**
   - ?€??Block ?½æ? `status` å­—æ®µ
   - `streaming` ?¶æ€ä??…å®¹?¯èƒ½ä¸å???
   - æ¸²æ??¨é?è¦å??†ä?å®Œæ•´?…å®¹

3. **AI ?¯ç???*
   - JSON ?¼å?ï¼Œä¾¿äº?AI ?Ÿæ?
   - ç®€?•ç?ç±»å?ç³»ç?ï¼Œæ?äºç?è§?
   - ? é?å¤æ??„å?å¥—ç???

4. **ä¸?AgentX äº‹ä»¶å¯¹å?**

```
AgentX äº‹ä»¶                    UIX IR
?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
text_delta              ??   TextBlock (streaming)
tool_use_start          ??   ToolBlock (status: running)
tool_result_message     ??   ToolBlock (status: success)
conversation_thinking   ??   ThinkingBlock
assistant_message       ??   Conversation (completed)
```

### ç¤ºä?

```json
{
  "conversations": [
    {
      "id": "conv-1",
      "role": "user",
      "status": "completed",
      "blocks": [
        { "id": "b1", "type": "text", "status": "completed", "content": { "text": "ä½ å¥½" } }
      ],
      "timestamp": 1703145600000
    },
    {
      "id": "conv-2",
      "role": "assistant",
      "status": "streaming",
      "blocks": [
        { "id": "b2", "type": "text", "status": "streaming", "content": { "text": "ä½ å¥½ï¼æ???.." } },
        { "id": "b3", "type": "tool", "status": "running", "content": { "name": "search", "input": { "query": "..." } } }
      ],
      "timestamp": 1703145601000
    }
  ]
}
```

## ?æ?

### æ­?¢

- æ¸…æ™°?„ç±»?‹å?ä¹?
- ä¸?AgentX äº‹ä»¶ç³»ç?å¯¹é?
- ?¯æ?æµå?æ¸²æ?
- AI ?¯ç??ç??¼å?

### è´Ÿé¢

- ?€è¦ç»´?¤ç±»?‹å?ä¹?
- ?¯èƒ½?€è¦é? AgentX æ¼”è??Œè???

### ?©å?é¢„ç?

?ªæ¥?¯èƒ½å¢å???Block ç±»å?ï¼?

- `audio` - ?³é??…å®¹
- `video` - è§†é??…å®¹
- `chart` - ?¾è¡¨?°æ®
- `form` - è¡¨å?è¾“å…¥
- `action` - ?¯ç‚¹?»æ?ä½?

## å®ç°è·¯å?

1. **@uix/core** - JSON Schema ??TypeScript ç±»å?
2. **@uix/lucid-react** - React æ¸²æ??¨å???
3. **AgentX ?‚é???* - AgentX äº‹ä»¶è½?UIX IR

## ?¸å…³?³ç?

- [ADR-0001](./0001-enterprise-grade-ui-infrastructure.md) - AI-to-UI ?è®®å±‚å?ä½?
- [ADR-0002](./0002-defer-protocol-selection.md) - UIX IR ?è®®ç­–ç•¥
- [ADR-0005](./0005-streaming-renderer-architecture.md) - æµå?æ¸²æ??¨æ¶??

