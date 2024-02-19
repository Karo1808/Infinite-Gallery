import { FaFacebook, FaShare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "../styles/share-dropdown.module.css";
import { useShare } from "react-facebook";

interface Props {
  imageLink: string;
}

const ShareDropdown = ({ imageLink }: Props) => {
  const { share } = useShare();
  const encodedURL = encodeURIComponent(imageLink);
  console.log(imageLink);
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
        text: "Check out this website with beautiful photos like this one\nhttps://infinite-gallery-nqv7.vercel.app/",
        url: imageLink,
      });
      console.log("Successfully shared");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className={styles.dropdown}>
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
        </div>
      )}
    </div>
  );
};

export default ShareDropdown;
