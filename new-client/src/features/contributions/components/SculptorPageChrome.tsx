import { FaArrowLeftLong, FaArrowUpLong, FaHouse } from "react-icons/fa6";

type SculptorPageChromeProps = {
  onGoBack: () => void;
  onGoHome: () => void;
  className?: string;
};

export function SculptorPageChrome({
  onGoBack,
  onGoHome,
  className = "",
}: SculptorPageChromeProps) {
  return (
    <div className={`sculptor-page-nav ${className}`.trim()}>
      <button
        type="button"
        className="sculptor-fab-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        title="Back to top"
      >
        <FaArrowUpLong aria-hidden="true" />
      </button>

      <button
        type="button"
        className="sculptor-fab-btn"
        onClick={onGoBack}
        aria-label="Go back"
        title="Go back"
      >
        <FaArrowLeftLong aria-hidden="true" />
      </button>

      <button
        type="button"
        className="sculptor-fab-btn"
        onClick={onGoHome}
        aria-label="Go home"
        title="Go home"
      >
        <FaHouse aria-hidden="true" />
      </button>
    </div>
  );
}
