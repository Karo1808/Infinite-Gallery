import styles from "../styles/bottom-bar.module.css";

const BottomBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={styles.modal_bottombar}>
      <div>{children}</div>
    </section>
  );
};

export default BottomBar;
