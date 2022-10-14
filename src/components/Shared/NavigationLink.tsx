import Link from "next/link";
import { forwardRef } from "react";

const NavigationLink = forwardRef((props : any, ref) => {
  let { option, children, ...rest } = props;
  return (
    <Link href={option.href}>
      <a
        ref={ref}
        className="neumorphic-chip text-neumorph-secondary hover:text-neumorph-accent transition-colors"
        {...rest}
      >
        <div>{option.icon}</div>
        <div>
          <p className="">{option.name}</p>
        </div>
      </a>
    </Link>
  );
});
NavigationLink.displayName = "NavLink";
export default NavigationLink;
