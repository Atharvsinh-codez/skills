"use client";

import Image from "next/image";
import { useState } from "react";
import { Messenger } from "./icons";

export default function ChatWidget() {
  const [preview, setPreview] = useState(true);
  return (
    <div className="chatw">
      {preview && (
        <div className="chatw__preview">
          <button className="chatw__close" aria-label="Dismiss message" onClick={() => setPreview(false)}>
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M1 1l8 8M9 1 1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <Image src="/support/avatar.jpg" alt="" width={36} height={36} className="chatw__avatar" />
          <div>
            <p className="chatw__msg">Hi there, we&rsquo;re here to answer any NFC questions you have.</p>
            <p className="chatw__meta">Auston • 7m</p>
          </div>
        </div>
      )}
      <button className="chatw__launcher" aria-label="Open chat, 1 unread message" onClick={() => setPreview((p) => !p)}>
        <Messenger />
        <span className="chatw__badge" aria-hidden="true">
          1
        </span>
      </button>
    </div>
  );
}
