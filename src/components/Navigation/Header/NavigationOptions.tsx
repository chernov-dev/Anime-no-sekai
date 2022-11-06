import Link from "next/link";
import { useRouter } from "next/router";

const NavigationOptions = ({ options }) => {
  const router = useRouter();

  return (
    <>
      <ul className={`neumorphic-sidebar__list`} role="navigation">
        {options.map((option, index) => (
          <div key={option.name}>
            <li
              className={`neumorphic-sidebar__list-item group ${router.pathname == option.href ? "active" : ""
                }`}
            >
              <Link accessKey={option.accessKey} href={option.href}>
                <span className="hidden sm:block">{option.icon}</span>
                {option?.tooltip && (
                  <span className="neumorphic-sidebar__tooltip group-hover:scale-100">
                    {option?.tooltip}
                  </span>
                )}
              </Link>
            </li>
            {index == 0 && (
              <span className="border-b-[3px] border-black dark:border-white w-7 self-center dark:border-opacity-20 border-opacity-20 rounded" />
            )}
          </div>
        ))}
      </ul>
    </>
  );
};

export default NavigationOptions;
