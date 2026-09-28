---
title: "Use effect events for latest values"
date: 2026-09-28
tags: [code implementation, react]
published: true
---

## Description
When an Effect, or a listener registered by an Effect, needs to read the latest value of a prop or state without re-running when that value changes, wrap the read in `useEffectEvent`. Prefer this over mirroring the value into a ref on every render.

The function returned by `useEffectEvent` always sees the latest props and state, and is not a dependency of the Effect, so don't list it in the dependency array. It should only be called from inside Effects.

Refs are still the right tool for genuinely mutable values that aren't derived from props or state, such as a timer ID or an imperative handle.

### Failing example
```tsx
// ChatRoom.tsx
import { useEffect, useRef } from "react";

export function ChatRoom({ roomId, onMessage }: ChatRoomProps) {
  // ❌ Ref mirrored on every render so the listener can read the latest callback
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    const connection = connect(roomId);
    connection.on("message", (message) => onMessageRef.current(message));
    return () => connection.disconnect();
  }, [roomId]);

  /*...*/
}
```

### Passing Example
```tsx
// ChatRoom.tsx
import { useEffect, useEffectEvent } from "react";

export function ChatRoom({ roomId, onMessage }: ChatRoomProps) {
  // ✅ Effect event always reads the latest callback without re-running the Effect
  const handleMessage = useEffectEvent((message: Message) => onMessage(message));

  useEffect(() => {
    const connection = connect(roomId);
    connection.on("message", handleMessage);
    return () => connection.disconnect();
  }, [roomId]);

  /*...*/
}
```
