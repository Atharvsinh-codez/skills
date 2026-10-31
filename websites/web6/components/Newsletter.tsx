'use client';

import { useState, type FormEvent } from 'react';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const valid = EMAIL.test(email.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid || state !== 'idle') return;
    setState('sending');
    // No list backend is connected; the submission is mocked.
    window.setTimeout(() => setState('done'), 700);
  };

  return (
    <form className="news__form" onSubmit={submit} noValidate>
      <label htmlFor="news-email" className="sr-only">Email address</label>
      <input
        id="news-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@studio.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === 'done'}
      />
      <button type="submit" className={`btn btn--sm${valid ? '' : ' btn--soft'}`} aria-disabled={!valid || state !== 'idle'}>
        {state === 'idle' ? 'Keep me posted' : state === 'sending' ? 'Sending…' : 'You’re on the list'}
      </button>
    </form>
  );
}
