'use client'

import { Modal } from '@/components/modal'
import { AiPanel } from './ai-panel'

export function AiSummaryDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} className="sm:max-w-2xl" labelledBy="ai-dialog-title">
      <div className="p-5">
        <h2 id="ai-dialog-title" className="sr-only">
          AI Clinical Summary
        </h2>
        <AiPanel inDialog />
      </div>
    </Modal>
  )
}
