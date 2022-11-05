import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { AiFillHeart, AiFillSetting } from "react-icons/ai";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FiLogIn, FiLogOut, FiSettings } from "react-icons/fi";
import useLogOut from "../../../hooks/useLogout";
import useUser from "../../../hooks/useUser";
import SettingsModal from "../../Modals/SettingsModal";
import Spinner from "../../Shared/Spinner";

const NavigationUserDropdownMenu = () => {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const user = useUser();
  const logoutMutation = useLogOut();

  if (logoutMutation.isSuccess) {
    router.push("/auth/login");
  }

  const handleMenuDropdownClose = () => {
    setShowMenu(false);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="neumorphic-btn primary">
            {user.isLoading ? <Spinner size={20} /> : <CgProfile size={24} />}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-neumorph-secondary rounded-md bg-neumorph-primary ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10 shadow-neumorphic focus:outline-none">
            {user.isSuccess && (
              <>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active
                          ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                          : "text-primary"
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          location.href = "/favourite";
                        }}
                      >
                        <AiFillHeart size={20} />
                        My favorites
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active
                          ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                          : "text-primary "
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          setSettingsOpen((prev) => !prev);
                        }}
                      >
                        <AiFillSetting size={20} />
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active
                          ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                          : "text-primary "
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          localStorage.setItem(
                            "ans-user__cached",
                            JSON.stringify(user.data)
                          );
                          logoutMutation.mutate();
                        }}
                      >
                        <CgLogOut size={20} />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
            {user.isError && (
              <>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active
                          ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                          : "text-primary "
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          router.push("/auth/login");
                        }}
                      >
                        <FiLogIn size={20} />
                        Log in
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active
                          ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                          : "text-primary "
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          router.push("/auth/signup");
                        }}
                      >
                        <FiLogOut size={20} />
                        Sign up
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1 px-1">
                  {" "}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active
                          ? "bg-gray-400 bg-opacity-20 text-neumorph-accent"
                          : "text-primary "
                          } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          setSettingsOpen((prev) => !prev);
                        }}
                      >
                        <FiSettings size={20} />
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
          </Menu.Items>
        </Transition>
        <SettingsModal
          isOpen={settingsOpen}
          onOpen={() => { }}
          onClose={() => setSettingsOpen(false)}
        />
      </Menu>
    </>
  );
};

export default NavigationUserDropdownMenu;
