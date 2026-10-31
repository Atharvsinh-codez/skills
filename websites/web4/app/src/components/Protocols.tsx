import Image from "next/image";

export default function Protocols() {
  return (
    <section className="protocols" aria-label="Supported protocols">
      <div className="shell protocols__shell">
        <div className="protocols__cell">
          <Image src="/protocols/mifare.svg" alt="MIFARE" width={98} height={68} />
        </div>
        <div className="protocols__cell">
          <Image src="/protocols/google.svg" alt="Google" width={148} height={50} />
        </div>
        <p className="protocols__cell protocols__text">
          <span>
            <strong>Works with the protocols</strong>
            <br />
            you already love and use
          </span>
        </p>
        <div className="protocols__cell">
          <Image src="/protocols/aliro.svg" alt="Aliro" width={340} height={191} />
        </div>
        <div className="protocols__cell">
          <Image src="/partners/hid.svg" alt="HID" width={86} height={36} />
        </div>
      </div>
    </section>
  );
}
