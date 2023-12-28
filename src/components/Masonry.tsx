import { GUTTER_SIZE } from "../constants";

const Masonry = ({
  gutter,
  children,
}: {
  gutter: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="masonry" style={{ columnGap: `${GUTTER_SIZE}px` }}>
      {children}
    </div>
  );
};

export default Masonry;
