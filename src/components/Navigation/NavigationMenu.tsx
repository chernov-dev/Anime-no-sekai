import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { CgClose, CgMenu } from "react-icons/cg";

const NavigationMenu = ({ options }) => {
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
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default NavigationMenu;
