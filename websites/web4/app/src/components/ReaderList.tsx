"use client";

import { useMemo, useState } from "react";
import { Search } from "./icons";

const READERS: [string, "Seos" | "DESFire"][] = [
  ["HID Signo 20", "Seos"],
  ["HID Signo 40", "Seos"],
  ["HID Signo Express", "Seos"],
  ["HID Signo 20K", "Seos"],
  ["HID Signo 40K", "Seos"],
  ["HID Signo 40T", "Seos"],
  ["HID Multiclass SE RP10", "Seos"],
  ["HID Multiclass SE RMPK40", "Seos"],
  ["HID Multiclass SE RMP40", "Seos"],
  ["HID Multiclass SE RP40", "Seos"],
  ["HID Multiclass SE RP15", "Seos"],
  ["HID Multiclass SE RPK40", "Seos"],
  ["Invixium Rosto", "Seos"],
  ["Invixium Touch", "Seos"],
  ["Spintly Kreo", "DESFire"],
  ["Spintly Zeon", "DESFire"],
  ["Spintly Uno", "DESFire"],
  ["Spintly 3-in-1", "DESFire"],
  ["Spintly Standard Duty Cylindrical", "DESFire"],
  ["Spintly Heavy Duty Deadbolt", "DESFire"],
  ["DotOrigin VTAP 50", "DESFire"],
  ["DotOrigin VTAP 100", "DESFire"],
  ["Elatec Secustos MU20", "DESFire"],
  ["Elatec Secustos SG30", "DESFire"],
  ["Elatec Secustos SQ80", "DESFire"],
  ["Elatec TWN4 MultiTech 2 BLE", "DESFire"],
  ["Elatec TWN4 MultiTech 2 LF HF", "DESFire"],
  ["Elatec TWN4 MultiTech 2 HF", "DESFire"],
  ["Elatec TWN4 MultiTech 3 BLE", "DESFire"],
  ["Elatec TWN4 MultiTech 3 LF HF", "DESFire"],
  ["Elatec TWN4 MultiTech 3 HF", "DESFire"],
  ["Elatec TWN4 USB Front Reader", "DESFire"],
  ["Elatec TWN4 Slim", "DESFire"],
  ["Elatec TWN4 Palon Compact", "DESFire"],
  ["Farpointe CSR-35L", "DESFire"],
  ["Farpointe CSR-6.2L", "DESFire"],
  ["Farpointe CSR-6.4L", "DESFire"],
  ["STid Architect® One Mullion", "DESFire"],
  ["STid Architect® Reader", "DESFire"],
  ["STid Architect® QR Code", "DESFire"],
  ["STid Architect® Keypad", "DESFire"],
  ["STid Architect® Biometrics", "DESFire"],
  ["STid Architect® Touchscreen", "DESFire"],
  ["STid Logical Access", "DESFire"],
  ["rfIdeas Wave ID Plus Mini", "DESFire"],
  ["rfIdeas Wave ID Mobile Mini", "DESFire"],
  ["rfIdeas Wave ID SP Plus", "DESFire"],
  ["rfIdeas Wave ID SP Plus Legic", "DESFire"],
  ["Igloo EK2", "DESFire"],
  ["Igloo DAX Deadbolt", "DESFire"],
  ["Omnitec Slim", "DESFire"],
  ["ACS WalletMate II", "DESFire"],
  ["ACS WalletMate II Mini", "DESFire"],
  ["ACS WalletMate II Boost", "DESFire"],
  ["Apromix KU-EWN1-KBC-ANFC", "DESFire"],
  ["Apromix KU-EWN1-ANFC", "DESFire"],
  ["Alutel RAGTAB", "Seos"],
  ["Ubiquiti / Unifi UA-G3-Pro", "DESFire"],
  ["PDQ Locks KMS", "DESFire"],
  ["PDQ Locks GTS", "DESFire"],
  ["PDQ Locks SDS", "DESFire"],
  ["PDQ Locks MRS", "DESFire"],
  ["PDQ Locks 6EWS", "DESFire"],
  ["Gantner GT7 2300", "DESFire"],
];

export default function ReaderList() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? READERS.filter(([n]) => n.toLowerCase().includes(q)) : READERS;
  }, [query]);
  const searching = query.trim().length > 0;

  return (
    <div className={`readers${searching ? " readers--search" : ""}`}>
      <label className="readers__search">
        <Search className="readers__search-icon" />
        <span className="sr-only">Search readers</span>
        <input type="search" placeholder="Search readers..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <div className="readers__viewport">
        {filtered.length === 0 ? (
          <p className="readers__empty">No readers match &ldquo;{query}&rdquo;</p>
        ) : (
          <div className="readers__track">
            {(searching ? [filtered] : [filtered, filtered]).map((list, i) => (
              <ul key={i} aria-hidden={i === 1 ? true : undefined}>
                {list.map(([name, proto]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <span className="tag">{proto}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
