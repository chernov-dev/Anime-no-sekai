import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa";
import { HiLogout, HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { IoSettingsSharp } from "react-icons/io5";
import useLogOut from "../../../hooks/useLogout";
import supabase from "../../../supabase/supabase-js";
import SettingsModal from "../../Modals/SettingsModal";

const NavigationUserDropdownMenu = () => {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const user = supabase.auth.user();
  const logoutMutation = useLogOut();

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="neumorphic-btn primary">
            {<FaUserNinja size={22} />}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-70"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-8 w-56 origin-top-right divide-y divide-neumorph-secondary rounded-md bg-neumorph-primary shadow-neumorphic focus:ring-1 ring-primary ring-opacity-30">
            {user && (
              <>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-neumorph-primary-dark bg-opacity-70 text-neumorph-accent"
                            : "text-primary text-opacity-70"
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          location.href = "/profile";
                        }}
                      >
                        <AiFillHeart size={20} />
                        <p>My favorites</p>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-neumorph-primary-dark bg-opacity-70 text-neumorph-accent"
                            : "text-primary text-opacity-70 "
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          setSettingsOpen((prev) => !prev);
                        }}
                      >
                        <IoSettingsSharp size={20} />
                        <p>Settings</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-neumorph-primary-dark bg-opacity-70 text-neumorph-accent"
                            : "text-primary text-opacity-70 "
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          logoutMutation.mutate();
                        }}
                      >
                        <HiLogout size={22} />
                        <p>Logout</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            )}
            {!user && (
              <>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-neumorph-primary-dark bg-opacity-70 text-neumorph-accent"
                            : "text-primary text-opacity-70 "
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          router.push("/auth/login");
                        }}
                      >
                        <HiOutlineLogin size={22} />
                        <p>Log in</p>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-neumorph-primary-dark bg-opacity-70 text-neumorph-accent"
                            : "text-primary text-opacity-70 "
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          router.push("/auth/signup");
                        }}
                      >
                        <HiOutlineLogout size={22} />
                        <p>Sign up</p>
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1 px-1">
                  {" "}
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-neumorph-primary-dark bg-opacity-70 text-neumorph-accent"
                            : "text-primary text-opacity-70 "
                        } group flex gap-2 w-full items-center rounded-md px-2 py-2 text-sm md:text-base`}
                        onClick={() => {
                          setSettingsOpen((prev) => !prev);
                        }}
                      >
                        <IoSettingsSharp size={20} />
                        <p>Settings</p>
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
          onOpen={() => {}}
          onClose={() => setSettingsOpen(false)}
        />
      </Menu>
    </>
  );
};

export default NavigationUserDropdownMenu;
