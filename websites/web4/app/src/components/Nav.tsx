import Image from "next/image";
import { ChevronDown } from "./icons";

export default function Nav() {
  return (
    <header className="nav">
      <nav className="nav__pill" aria-label="Primary">
        <a href="#" className="nav__logo" aria-label="AccessGrid home">
          <Image src="/brand/logo.svg" alt="" width={34} height={34} priority />
        </a>
        <ul className="nav__links">
          <li>
            <a href="#">
              Developers <ChevronDown className="nav__chev" />
            </a>
          </li>
          <li>
            <a href="#">
              Pricing <ChevronDown className="nav__chev" />
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
        <div className="nav__actions">
          <a href="#" className="nav__signin">
            Sign in
          </a>
          <a href="#" className="btn btn--primary">
            Get started
          </a>
        </div>
      </nav>
    </header>
  );
}
