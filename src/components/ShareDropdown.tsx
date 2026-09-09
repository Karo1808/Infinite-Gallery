import { useState } from "react";
import { FaFacebook, FaLink, FaShare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "../styles/share-dropdown.module.css";

const ShareDropdown = () => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const pageUrl = window.location.href;
  const encodedUrl = encodeURIComponent(pageUrl);

  const handleMobileShare = async () => {
    try {
      await navigator.share({
        title: "Infinite Gallery photo",
        text: "View this photo on Infinite Gallery.",
        url: pageUrl,
      });
    } catch {
      // Closing the native share sheet is not an application error.
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <div className={styles.dropdown} aria-label="Share photo">
      <a
        href={`https://twitter.com/intent/tweet?text=View%20this%20photo%20on%20Infinite%20Gallery&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={styles.entry}
      >
        <FaXTwitter />
        <span>X</span>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className={styles.entry}
      >
        <FaFacebook />
        <span>Facebook</span>
      </a>
      {typeof navigator.share === "function" && (
        <button
          type="button"
          onClick={handleMobileShare}
          className={styles.entry}
        >
          <FaShare />
          <span>Share</span>
        </button>
      )}
      <button
        type="button"
        onClick={handleCopy}
        className={styles.entry}
      >
        <FaLink />
        <span>
          {copyStatus === "copied"
            ? "Copied"
            : copyStatus === "failed"
              ? "Copy failed"
              : "Copy link"}
        </span>
      </button>
    </div>
  );
};

export default ShareDropdown;
