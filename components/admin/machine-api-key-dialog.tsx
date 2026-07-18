"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Check, Copy, KeyRound, TriangleAlert } from "lucide-react";
import { useAdminLocale } from "./admin-locale-context";
import { issueMachineApiKey, revokeMachineApiKey } from "lib/admin-api";
import type { MachineApiKeyCreated } from "lib/backend-api";

export function MachineApiKeyDialog({
  machineId,
  serialNumber,
  open,
  onOpenChange,
}: {
  machineId: string;
  serialNumber: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useAdminLocale();
  const [issued, setIssued] = useState<MachineApiKeyCreated | null>(null);
  const [revoked, setRevoked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleOpenChange(next: boolean) {
    // The token can never be retrieved again, so drop it as soon as we close.
    if (!next) {
      setIssued(null);
      setRevoked(false);
      setCopied(false);
      setError(null);
    }
    onOpenChange(next);
  }

  function handleGenerate() {
    setError(null);
    setCopied(false);
    setRevoked(false);
    startTransition(async () => {
      try {
        setIssued(await issueMachineApiKey(machineId));
      } catch {
        setError(t.machineApiKey.failed);
      }
    });
  }

  function handleRevoke() {
    if (!issued) return;
    setError(null);
    startTransition(async () => {
      try {
        await revokeMachineApiKey(machineId, issued.keyId);
        setRevoked(true);
      } catch {
        setError(t.machineApiKey.failed);
      }
    });
  }

  async function handleCopy() {
    if (!issued) return;
    await navigator.clipboard.writeText(issued.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            {t.machineApiKey.title}
          </DialogTitle>
          <DialogDescription>
            <span className="font-mono text-[13px] text-foreground">
              {serialNumber}
            </span>
            <br />
            {t.machineApiKey.description}
          </DialogDescription>
        </DialogHeader>

        {issued && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 rounded-md border border-border bg-muted/50 p-3 text-[13px] text-muted-foreground">
              <TriangleAlert className="mt-px h-4 w-4 shrink-0" />
              <span>{t.machineApiKey.warning}</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 font-mono text-[12.5px]">
                {issued.token}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                aria-label={t.machineApiKey.copy}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-muted-foreground">
                {t.machineApiKey.copied}
              </p>
            )}
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
        {revoked && (
          <p className="text-sm text-muted-foreground">
            {t.machineApiKey.revoked}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleGenerate}
            disabled={pending}
          >
            {pending && !issued
              ? t.machineApiKey.generating
              : issued
                ? t.machineApiKey.regenerate
                : t.machineApiKey.generate}
          </Button>
          {issued && !revoked && (
            <Button variant="outline" onClick={handleRevoke} disabled={pending}>
              {pending ? t.machineApiKey.revoking : t.machineApiKey.revoke}
            </Button>
          )}
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t.machineApiKey.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
