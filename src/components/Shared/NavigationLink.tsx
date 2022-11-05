import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";

const NavigationLink = forwardRef((props: any, ref) => {
  let { option, children, ...rest } = props;
  const router = useRouter();
  return (
    <Link
      href={option.href}
      ref={ref}
      className={` ${option.href == router.pathname && "active-link"} flex rounded-lg px-3 items-center py-2 gap-5 opacity-50 hover:text-secondary hover:shadow-neumorphic hover:opacity-100
      transition-colors nav-link`}
      {...rest}
    >
      {option.icon}
      <p className="font-semibold">{option.name}</p>
    </Link>
  );
});
NavigationLink.displayName = "NavLink";
export default NavigationLink;
