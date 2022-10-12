import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import {
  CgClose,
  CgMenu,
} from "react-icons/cg";
import { RiCalendarEventFill } from "react-icons/ri";

const NavigationMenu = ({options}) => {
  

  return (
    <>
      <Popover as="div" className="relative block md:hidden">
        {({ open }) => (
          <>
            <div>
              <Popover.Button className={`neumorphic-btn secondary`}>
                {open && <CgClose size={24} />}
                {!open && <CgMenu size={24} />}
              </Popover.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute bg-neumorph-primary -left-4 z-10 mt-3 w-screen max-w-xs transform">
                <div className="overflow-hidden pl-2 rounded-lg shadow-neumorphic ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10">
                  <div className="flex flex-col gap-3 p-2 text-neumorph-secondary ">
                    {options.map((option) => (
                      <Link key={option.name} href={option.href}>
                        <a className="neumorphic-chip text-neumorph-secondary hover:text-neumorph-accent transition-colors">
                          <div>{option.icon}</div>
                          <div>
                            <p className="">{option.name}</p>
                          </div>
                        </a>
                      </Link>
                    ))}
                    <h2 className="px-2 text-right">ANS - Navigation</h2>
                    {/* <div className="shadow-neumorphic">
                      <Link href="/home">
                        <a className="text-white"><span>Home</span></a>
                      </Link>
                    </div> */}
                  </div>
                  {/* <button
                    className={`${
                        ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                        : "text-neumorph-secondary "
                    } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                  >
                    <CgProfile size={20} />
                    Profile
                  </button> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
    // <button
    //   data-collapse-toggle="navbar-sticky"
    //   type="button"
    //   className={`neumorphic-icon flex lg:hidden w-[35px] h-[35px]`}
    //   onClick={handleMenuDropdown}
    //   aria-controls="navbar-sticky"
    //   aria-expanded="false"
    // >
    //   <span className="sr-only">Open main menu</span>
    //   <svg
    //     className="w-6 h-6"
    //     aria-hidden="true"
    //     fill="currentColor"
    //     viewBox="0 0 20 20"
    //     xmlns="http://www.w3.org/2000/svg"
    //   >
    //     <path
    //       fillRule="evenodd"
    //       d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    //       clipRule="evenodd"
    //     ></path>
    //   </svg>
    // </button>
  );
};

export default NavigationMenu;
