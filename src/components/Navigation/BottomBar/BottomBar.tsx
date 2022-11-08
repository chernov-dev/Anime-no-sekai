import { cva, type VariantProps } from "class-variance-authority";
import useScrollDirection from "../../../utils/useScrollDirection";

const bottombarStyles = cva("neumorphic-bottom-bar");

export interface BottomBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bottombarStyles> {}

const BottomBar = ({ className, ...props }: BottomBarProps) => {
  const scroll = useScrollDirection(10, 50);

  return (
    <footer
      className={`${bottombarStyles({ class: className })} ${
        scroll === "down" ? "translate-y-[100px]" : ""
      }`}
      {...props}
    >
      {props.children}
    </footer>
  );
};

export default BottomBar;
