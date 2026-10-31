'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from './Icons';

export function VideoCard() {
  const [asked, setAsked] = useState(false);
  return (
    <div className="poster">
      <Image
        src="/media/walkthrough-poster-arix.jpg"
        alt="Julian presenting the Motion section of the VANTA guideline next to the arix wordmark and the line: The brand guideline people actually open."
        fill
        sizes="(max-width: 1180px) 100vw, 1040px"
      />
      <button type="button" className="poster__play" onClick={() => setAsked(true)} aria-describedby="poster-note">
        <span className="poster__btn"><Play /></span>
        <span className="poster__label">Watch the walkthrough · 2:49</span>
      </button>
      <p id="poster-note" className={`poster__note${asked ? ' is-on' : ''}`} role="status">
        {asked ? 'The walkthrough video is not bundled with this build yet.' : ''}
      </p>
    </div>
  );
}
