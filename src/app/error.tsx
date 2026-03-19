"use client";

import { AlertTriangleIcon, RefreshCcwIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Alert
        className="rounded-[2rem] border border-border/70 bg-card/90 p-8"
        variant="destructive"
      >
        <AlertTriangleIcon />
        <AlertTitle className="font-display text-3xl">
          Catalog unavailable
        </AlertTitle>
        <AlertDescription className="flex flex-col gap-5 pt-2">
          <p>
            The product feed could not be loaded right now. Retry the request or
            inspect the upstream response if the issue keeps reproducing.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {error.message}
          </p>
          <div>
            <Button onClick={reset}>
              <RefreshCcwIcon data-icon="inline-start" />
              Try again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </main>
  );
}
