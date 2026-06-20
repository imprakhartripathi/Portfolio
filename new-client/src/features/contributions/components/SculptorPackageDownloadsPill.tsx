import { useEffect, useState } from "react";
import type { NpmDownloadStat } from "../types";
import { apiUrl } from "../data";

type Props = {
  packageName: string;
};

export function SculptorPackageDownloadsPill({ packageName }: Props) {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    let isMounted = true;
    setMessage("Loading...");

    async function load() {
      try {
        const raw = await fetch(
          `/${apiUrl}${encodeURIComponent(
            packageName,
          )}`,
        );

        const stat = (await raw.json()) as NpmDownloadStat;

        if (isMounted) {
          setMessage(
            stat.downloads > 0
              ? `${stat.downloads.toLocaleString()} Downloads`
              : "No Downloads Yet",
          );
        }
      } catch {
        if (isMounted) {
          setMessage("Stats Unavailable");
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [packageName]);

  return (
    <span className="sculptor-product__stats-pill" aria-live="polite">
      {message}
    </span>
  );
}
