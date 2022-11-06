

import { cva, type VariantProps } from "class-variance-authority";
import useScrollDirection from "../../../utils/useScrollDirection";

const headerStyles = cva('neumorphic-header');

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof headerStyles> { }

const Header = ({ className, ...props }: HeaderProps) => {

  const scroll = useScrollDirection(1);

  return (
    <header className={`${headerStyles({ class: className })} ${scroll === "down" ? "hidden" : "flex"}`} {...props}>
      {props.children}
    </header>
  );
};

export default Header;
