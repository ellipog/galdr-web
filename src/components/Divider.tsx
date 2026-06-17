import styles from "./Divider.module.css";

interface Props {
  className?: string;
}

export default function Divider({ className }: Props) {
  return (
    <div
      className={`${styles.divider} ${className || ""}`}
      aria-hidden="true"
    >
      ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ ᛟ
    </div>
  );
}