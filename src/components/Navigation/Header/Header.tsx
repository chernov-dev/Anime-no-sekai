

import { cva, type VariantProps } from "class-variance-authority";
import useScrollDirection from "../../../utils/useScrollDirection";

const headerStyles = cva('neumorphic-header');

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof headerStyles> { }

const Header = ({ className, ...props }: HeaderProps) => {

  const scroll = useScrollDirection(5);

  return (
    <header className={`${headerStyles({ class: className })} ${scroll === "down" ? "translate-y-[-100px]" : ''}`} {...props}>
      {props.children}
    </header>
  );
};

export default Header;
