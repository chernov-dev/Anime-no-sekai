import { cva, type VariantProps } from "class-variance-authority";

const headerStyles = cva("neumorphic-bottom-bar");

export interface BottomBarProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof headerStyles> { }

const BottomBar = ({ className, ...props }: BottomBarProps) => {
    return (
        <footer className={headerStyles({ class: className })} {...props}>
            {props.children}
        </footer>
    );
};

export default BottomBar;
