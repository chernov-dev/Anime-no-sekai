import { cva, type VariantProps } from "class-variance-authority";
import useScrollDirection from "../../../utils/useScrollDirection";

const bottombarStyles = cva("neumorphic-bottom-bar");

export interface BottomBarProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bottombarStyles> { }

const BottomBar = ({ className, ...props }: BottomBarProps) => {

    const scroll = useScrollDirection();

    return (
        <footer className={`${bottombarStyles({ class: className })} ${scroll === "down" ? "hidden" : "flex"}`} {...props}>
            {props.children}
        </footer>
    );
};

export default BottomBar;
