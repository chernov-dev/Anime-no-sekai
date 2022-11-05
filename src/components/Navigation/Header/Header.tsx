

import { cva, type VariantProps } from "class-variance-authority";

const headerStyles = cva('neumorphic-header');

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof headerStyles> { }

const Header = ({ className, ...props }: HeaderProps) => {

  return (
    <header className={headerStyles({ class: className })} {...props}>
      {props.children}
    </header>
  );
};

export default Header;
