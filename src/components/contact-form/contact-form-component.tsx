"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/plausible";
import { buttonVariants } from "@/components/ui/button";

/**
 * Formspree endpoint that receives contact submissions. The form ID is safe to
 * expose: Formspree treats it as a public destination and applies its own spam
 * and rate-limit protection. Replies go to the email set on the Formspree form.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myzpwegv";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-base text-ink placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus";

const labelClass = "block text-sm font-medium text-ink";

export function ContactFormComponent() {
  const [state, setState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        setState("success");
        trackEvent("Contact Form Submitted");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-lg border border-border bg-surface px-6 py-8"
      >
        <CheckCircle2 className="size-8 text-success" aria-hidden />
        <h2 className="font-heading text-xl font-bold tracking-tight text-ink">
          Message sent
        </h2>
        <p className="max-w-[55ch] text-body">
          Thanks for reaching out. I read every message and usually reply within
          a couple of days. If it is time-sensitive, email me directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Name <span aria-hidden className="text-brand">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden className="text-brand">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Message <span aria-hidden className="text-brand">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me what you have in mind."
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {state === "error" ? (
        <p role="alert" className="text-sm font-medium text-danger">
          Something went wrong while sending your message. Please try again or
          email me directly.
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Send className="size-4" aria-hidden />
          {state === "submitting" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
