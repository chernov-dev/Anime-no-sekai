import AnimeWeeklyNotificationSwitch from "./AnimeWeeklyNotificationSwitch";

const AnimeWeeklyNotificationsComponent = ({
  enabled,
  setEnabled,
  ongoingNumber,
}) => {
  return (
    <div className="flex flex-col justify-between gap-3 px-3 py-2 w-full bg-neumorph-primary shadow-neumorphic rounded-xl ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10">
      <h1 className="text-base md:text-xl text-primary">
        Weekly notifications
      </h1>
      <div className="flex gap-3 items-center">
        <AnimeWeeklyNotificationSwitch
          enabled={enabled}
          setEnabled={setEnabled}
        />{" "}
        <span className="text-primary text-sm">Subscribe to updates</span>
      </div>
      <p className="text-primary text-sm">
        Emails are sent every{" "}
        <span className="text-neumorph-accent">Friday evening</span>
      </p>
    </div>
  );
};

export default AnimeWeeklyNotificationsComponent;
