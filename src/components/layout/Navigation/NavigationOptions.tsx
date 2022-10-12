
import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";

const NavigationOptions = ({ options }) => {
  const router = useRouter();

  return (
    <>
      <Tab.Group>
        <Tab.List className="w-[60%] hidden md:flex neumorphic-tab__list">
          {options.map((option) => (
              <Tab
                key={option.name}
                accessKey={option.accessKey}
                onClick={() => {
                  router.push(option.href);
                }}
              >
                {option.name}
              </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </>
  );
};

export default NavigationOptions;
