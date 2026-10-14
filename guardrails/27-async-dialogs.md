---
title: "Async dialogs"
date: 2026-10-14
tags: [code implementation, react, state management]
published: true
---

## Description
Open dialogs with an async pattern, where opening a dialog returns a promise of its result. This avoids open state and dialog data leaking into every component that triggers them.

With the conventional pattern, every caller owns an `isOpen` flag, a copy of the data the dialog needs, and callbacks to receive the result. The flow of a single action gets split across state, effects and handlers, and the dialog can't be reused without copying that wiring into every new caller. With an async dialog, opening it is a function call that returns a promise of the result. The whole flow reads top to bottom in one handler, and the dialog can be opened from anywhere with a single hook call.

Use `react-dialog-async` to implement this pattern.

### Failing example
```tsx
// DeleteRecipeButton.tsx
import { useState } from "react";

export function DeleteRecipeButton({ recipe }: DeleteRecipeButtonProps) {
  // ❌ Caller owns the dialog's open state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleClick() {
    setIsConfirmOpen(true);
  }

  // ❌ The result arrives in a separate callback, away from the action that started it
  function handleConfirm() {
    setIsConfirmOpen(false);
    deleteRecipe(recipe.id);
  }

  return (
    <>
      <Button onClick={handleClick}>Delete</Button>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        message={`Delete ${recipe.title}?`}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
```

### Passing Example
```tsx
// ConfirmDialog.tsx
import type { AsyncDialogProps } from "react-dialog-async";

type ConfirmDialogData = { message: string };

// ✅ Dialog receives its inputs through data and returns its result through handleClose
export function ConfirmDialog({ isOpen, data, handleClose }: AsyncDialogProps<ConfirmDialogData, boolean>) {
  return (
    <Dialog open={isOpen} onClose={() => handleClose()}>
      <Text>{data.message}</Text>
      <Button onClick={() => handleClose(false)}>Cancel</Button>
      <Button onClick={() => handleClose(true)}>Confirm</Button>
    </Dialog>
  );
}
```

```tsx
// DeleteRecipeButton.tsx
import { useDialog } from "react-dialog-async";
import { ConfirmDialog } from "./ConfirmDialog";

export function DeleteRecipeButton({ recipe }: DeleteRecipeButtonProps) {
  const confirmDialog = useDialog(ConfirmDialog);

  // ✅ The whole flow reads top to bottom in one handler, with no open state in the caller
  async function handleClick() {
    const isConfirmed = await confirmDialog.open({ message: `Delete ${recipe.title}?` });
    if (isConfirmed) {
      deleteRecipe(recipe.id);
    }
  }

  return <Button onClick={handleClick}>Delete</Button>;
}
```
