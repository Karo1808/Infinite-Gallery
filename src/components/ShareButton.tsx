import { useState } from "react";
import { IoMdShare } from "react-icons/io";
import styles from "../styles/share-button.module.css";
import ShareDropdown from "./ShareDropdown";

const ShareButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={styles.share_wrapper}
      onKeyDown={(event) => {
        if (event.key === "Escape" && isDropdownOpen) {
          event.stopPropagation();
          setIsDropdownOpen(false);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
        className={styles.share_button}
        aria-expanded={isDropdownOpen}
        aria-haspopup="menu"
      >
        <IoMdShare className={styles.icon} size={18} />
        <span>Share</span>
      </button>
      {isDropdownOpen && <ShareDropdown />}
    </div>
  );
};

export default ShareButton;
