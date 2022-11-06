import Link from "next/link";
import { useRouter } from "next/router";

const MobileNavigationOptions = ({ options }) => {
    const router = useRouter();

    return (
        <>
            <ul
                className={`flex flex-row w-full justify-between mx-6 my-auto`}
                role="navigation"
            >
                {options.map((option, index) => (
                    <>
                        {index !== 0 && (
                            <div key={option.name}>
                                <li
                                    className={`mobile-option ${router.pathname == option.href ? "active" : ""
                                        }`}
                                >
                                    <Link accessKey={option.accessKey} href={option.href} className="px-2 py-1 w-full flex flex-col justify-center items-center">
                                        <span>{option.icon}</span>
                                        <span className="text-2xs">{option.name}</span>
                                    </Link>
                                </li>
                            </div>
                        )}
                    </>
                ))}
            </ul>
        </>
    );
};

export default MobileNavigationOptions;
