import { FaFacebook, FaLink, FaShare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "../styles/share-dropdown.module.css";
import { useShare } from "react-facebook";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  imageLink: string;
}

const ShareDropdown = ({ imageLink }: Props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const url = window.location.href;
  const { share } = useShare();
  const encodedURL = encodeURIComponent(imageLink);
  const handleFbShare = async () => {
    await share({
      display: "popup",
      href: imageLink,
      hashtag: "infinite-gallery",
    });
  };

  const handleMobileShare = async () => {
    try {
      await navigator.share({
        title: "Look at this amazing photo",
        text: "More photos like this on our website\n",
        url: url,
      });
      console.log("Successfully shared");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleCopy = async () => {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);

        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (error: unknown) {
        if (error instanceof Error)
          throw new Error(`Unable to copy text to clipboard, ${error.message}`);
      }
    };
    await copyToClipboard();
  };

  return (
    <>
      <motion.div
        className={styles.dropdown}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <a
          href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20image!&url=${encodedURL}`}
          target="_blank"
          className={styles.entry}
        >
          <FaXTwitter />
          <p>X</p>
        </a>
        <div onClick={handleFbShare} className={styles.entry}>
          <FaFacebook />
          <p>Facebook</p>
        </div>
        {typeof navigator.share === "function" && (
          <div onClick={handleMobileShare} className={styles.entry}>
            <FaShare />
            <p>Share</p>
          </div>
        )}
        <div onClick={handleCopy} className={styles.entry}>
          <FaLink />
          <p>{isCopied ? "Copied" : "Copy"}</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className={styles.triangle}
      ></motion.div>
    </>
  );
};

export default ShareDropdown;
