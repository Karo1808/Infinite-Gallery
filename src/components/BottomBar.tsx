const BottomBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="modal-bottombar">
      <div className="bottombar-container">{children}</div>
    </section>
  );
};

export default BottomBar;
