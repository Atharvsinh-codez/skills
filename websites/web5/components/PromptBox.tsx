"use client";

import { useId, useRef, useState } from "react";
import { CaretRightIcon, PaperclipIcon } from "./icons";
import { useTypewriter } from "./useTypewriter";

type PromptBoxProps = {
  label: string;
  phrases: string[];
  paused: boolean;
  startAt?: number;
  onSubmit: (value: string, file: File | null) => void;
};

/**
 * A real, editable prompt field. Until the visitor focuses it, the value is
 * driven by a typing demo; afterwards it behaves like a normal textarea.
 */
export function PromptBox({ label, phrases, paused, startAt, onSubmit }: PromptBoxProps) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileId = useId();
  const demo = useTypewriter({ phrases, paused: paused || touched, startAt, typeMs: 65, holdMs: 1800 });

  const submit = () => {
    const text = value.trim();
    if (!text && !file) return;
    onSubmit(text, file);
    setValue("");
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <form
      className="prompt"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <textarea
        className="prompt__input"
        aria-label={label}
        rows={2}
        value={touched ? value : demo.text}
        onFocus={() => setTouched(true)}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <div className="prompt__bar">
        <label htmlFor={fileId} className="chip">
          <PaperclipIcon className="chip__icon" />
          <span className="chip__label">{file ? file.name : "Attach a file"}</span>
        </label>
        <input
          ref={fileRef}
          id={fileId}
          type="file"
          className="visually-hidden"
          accept=".pdf,.doc,.docx,.md,.txt"
          onChange={(e) => {
            setTouched(true);
            setFile(e.target.files?.[0] ?? null);
          }}
        />
        <button type="submit" className="enter">
          Enter
          <CaretRightIcon className="enter__icon" />
        </button>
      </div>
    </form>
  );
}
