import { Switch } from "@headlessui/react";

const AnimeWeeklyNotificationSwitch = ({ enabled, setEnabled }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "shadow-neumorphic-inner" : ""
      } relative inline-flex h-6 w-11 items-center rounded-full shadow-neumorphic ring-1 bg-neumorph-primary ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6 ui-checked:bg-neumorph-accent" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-neumorph-secondary transition`}
      />
     
    </Switch>
  );
};

export default AnimeWeeklyNotificationSwitch;
