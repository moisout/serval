import type { DialogOptions } from 'naive-ui'

const cancelButtonClass = 'dialog-cancel-button'

// Focuses the cancel ("positive") button instead of the action button, so a
// stray key press can't confirm a dialog
export const focusDialogCancel = (options: DialogOptions): DialogOptions => {
  // Keep keys from re-triggering the opening button while the dialog animates in
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }

  return {
    ...options,
    autoFocus: false,
    positiveButtonProps: {
      ...options.positiveButtonProps,
      class: cancelButtonClass
    },
    onAfterEnter: () => {
      document.querySelector<HTMLElement>(`.${cancelButtonClass}`)?.focus()
      options.onAfterEnter?.()
    }
  }
}
