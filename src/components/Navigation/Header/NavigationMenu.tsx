import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CgClose, CgMenu } from "react-icons/cg";
import NavigationLink from "../../Shared/NavigationLink";
import WebsiteLogo from "../../Shared/WebsiteLogo";

const NavigationMenu = ({ options }) => {
  return (
    <>
      <Menu as="div">
        {({ open }) => (
          <>
            <Menu.Button className={`neumorphic-btn primary`}>
              {open && <CgClose size={24} />}
              {!open && <CgMenu size={24} />}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="fixed bg-neumorph-primary top-0 left-0 z-10 w-screen max-w-fit pr-2 md:max-w-xs md:p-0 transform h-screen shadow-neumorphic">
                <div className="flex gap-10 items-center">
                  <Menu.Button className={`neumorphic-btn primary mx-3 my-4 `}>
                    {open && <CgClose size={24} />}
                    {!open && <CgMenu size={24} />}
                  </Menu.Button>
                  <WebsiteLogo />
                </div>
                <div className="flex flex-col gap-5 px-5 py-2 text-primary h-full">
                  {options.map((option, index) => (
                    <div key={option.name}>
                      {/* Skipping first element */}
                      {index !== 0 && (
                        <Menu.Item>
                          <NavigationLink option={option} />
                        </Menu.Item>
                      )}
                    </div>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};

export default NavigationMenu;
