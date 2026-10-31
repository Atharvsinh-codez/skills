"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import aceternity from "@/public/logos/aceternity.png";
import audionotes from "@/public/logos/audionotes.png";
import brickspace from "@/public/logos/brickspace.webp";
import firstdollar from "@/public/logos/firstdollar.webp";
import gistr from "@/public/logos/gistr.webp";
import guidejar from "@/public/logos/guidejar.webp";
import missioncontrolhq from "@/public/logos/missioncontrolhq.webp";
import nutriscan from "@/public/logos/nutriscan.webp";
import openAlternative from "@/public/logos/open-alternative.webp";
import openstatus from "@/public/logos/openstatus.png";
import orshot from "@/public/logos/orshot.webp";
import peerlist from "@/public/logos/peerlist.webp";
import saffronstays from "@/public/logos/saffronstays.png";
import supermemory from "@/public/logos/supermemory.webp";
import vivgrid from "@/public/logos/vivgrid.webp";
import youform from "@/public/logos/youform.webp";

type Logo = { name: string; src: StaticImageData; w: number; h: number };

const GROUPS: Logo[][] = [
  [
    { name: "Vivgrid", src: vivgrid, w: 112, h: 33 },
    { name: "Mission Control HQ", src: missioncontrolhq, w: 220, h: 31 },
    { name: "Brickspace Labs", src: brickspace, w: 180, h: 28 },
    { name: "Youform", src: youform, w: 145, h: 23 },
  ],
  [
    { name: "Orshot", src: orshot, w: 112, h: 33 },
    { name: "First Dollar", src: firstdollar, w: 130, h: 43 },
    { name: "OpenAlternative", src: openAlternative, w: 180, h: 22 },
    { name: "NutriScan App", src: nutriscan, w: 180, h: 27 },
  ],
  [
    { name: "Openstatus", src: openstatus, w: 168, h: 24 },
    { name: "SaffronStays", src: saffronstays, w: 165, h: 27 },
    { name: "AceternityUI", src: aceternity, w: 159, h: 32 },
    { name: "Audionotes", src: audionotes, w: 142, h: 24 },
  ],
  [
    { name: "Peerlist", src: peerlist, w: 112, h: 24 },
    { name: "Supermemory", src: supermemory, w: 220, h: 26 },
    { name: "gistr", src: gistr, w: 67, h: 32 },
    { name: "GuideJar", src: guidejar, w: 145, h: 39 },
  ],
];

const INTERVAL_MS = 3200;
const STAGGER_MS = 120;

export function LogoCarousel() {
  const [group, setGroup] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setGroup((g) => (g + 1) % GROUPS.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <ul className="grid grid-cols-2 gap-px border-t border-stone-200 bg-stone-200 lg:grid-cols-4">
      {[0, 1, 2, 3].map((slot) => (
        <li key={slot} className="relative h-[116px] overflow-hidden bg-stone-50">
          {GROUPS.map((g, gi) => {
            const logo = g[slot];
            const active = gi === group;
            return (
              <div
                key={logo.name}
                aria-hidden={!active}
                className="absolute inset-0 flex items-center justify-center px-6 transition-[opacity,transform,filter] duration-500 ease-out"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "none" : "translateY(10px)",
                  filter: active ? "none" : "blur(4px)",
                  transitionDelay: `${slot * STAGGER_MS}ms`,
                }}
              >
                <span className="relative block max-w-full" style={{ width: logo.w, aspectRatio: `${logo.src.width} / ${logo.src.height}` }}>
                  <Image src={logo.src} alt={logo.name} fill sizes={`${logo.w}px`} className="object-contain" />
                </span>
              </div>
            );
          })}
        </li>
      ))}
    </ul>
  );
}
