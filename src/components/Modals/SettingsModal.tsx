import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useUserPreferences } from "../../context/UserPreferencesProvider";
import useUpdateTheme from "../../hooks/useUpdateTheme";

const SettingsModal = ({ isOpen, onOpen, onClose }) => {
  const { theme, setTheme, user } = useUserPreferences();
  const updateTheme = useUpdateTheme();

  const toggleDarkMode = () => {
    console.log('here', theme)
    setTheme(theme == "dark" ? "light" : 'dark');
    updateTheme.mutate();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="neumorphic-modal relative" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neumorph-primary bg-opacity-25 z-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto z-[998]">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden flex flex-col rounded-2xl bg-neumorph-primary shadow-neumorphic border-[1px] border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-6 text-left align-middle transition-all z-[999]">
                <Dialog.Title
                  as="div"
                  className="neumorphic-chip h-[3rem] flex gap-3 px-3 text-lg md:text-xl lg:text-2xl font-medium items-center mb-12"
                >
                  <IoSettingsSharp size={20} />
                  <span>User Preferences</span>
                </Dialog.Title>
                <div className="mt-4 p-2 flex flex-col gap-8">
                  <div className="flex items-center gap-5 px-2">
                    <button
                      className={`neumorphic-icon h-12`}
                      title={`Join the ${theme === "dark" ? "weak" : "dark"
                        } side`}
                      onClick={() => toggleDarkMode()}
                    >
                      {theme === "dark" ? (
                        <MdDarkMode size={25} />
                      ) : (
                        <MdOutlineDarkMode size={25} />
                      )}
                    </button>
                    <p className="capitalize">{theme} mode</p>
                  </div>
                  <div className="neumorphic-form flex flex-col gap-3">
                    <input
                      id="preferredEmail"
                      type="email"
                      placeholder="Email"
                      value={user?.email ?? ""}
                      disabled={true}
                      title="We will use this email to send notification when anime episode is out"
                    />
                    <label
                      htmlFor="preferredEmail"
                      className="w-[325px] text-sm opacity-60 pl-1"
                    >
                      Email above will be used to get notifications
                    </label>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          {/* <div className="text-neumorph-secondary h-[400px]">
            <div className="mb-5 p-5 flex items-center justify-between">
              <p className="neumorphic-chip flex gap-3 py-1.5 px-3 text-lg md:text-xl lg:text-2xl">
                <IoSettingsSharp size={20} />
                User Preferences
              </p>
              <button className={`neumorphic-icon`} onClick={onClose}>
                <IoMdClose size={25} />
              </button>
            </div>
            <div className="flex flex-col gap-5 px-5">
              <div className="flex items-center gap-5">
                <div className="">
                  <button
                    className={`neumorphic-icon`}
                    title={`Join the ${
                      theme === "dark" ? "weak" : "dark"
                    } side`}
                    onClick={() => toggleDarkMode()}
                  >
                    {theme === "dark" ? (
                      <MdDarkMode size={25} />
                    ) : (
                      <MdOutlineDarkMode size={25} />
                    )}
                  </button>
                </div>
                <p className="capitalize">{theme} mode</p>
              </div>
              <div className="neumorphic-form flex flex-col gap-3">
                <input
                  id="preferredEmail"
                  type="email"
                  placeholder="Email"
                  value={email ?? ""}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  title="We will use this email to send notification when anime episode is out"
                />
                <label
                  htmlFor="preferredEmail"
                  className="w-[325px] text-sm opacity-60 pl-1"
                >
                  Email above will be used to get notifications
                </label>
              </div>
            </div>
          </div> */}
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsModal;
