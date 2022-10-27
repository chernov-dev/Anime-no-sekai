import { Tab } from "@headlessui/react";
import React from "react";

const AnimeFavoriteFilter = () => {
  return (
    <div>
      <Tab.List className="flex neumorphic-tab__list space-x-1 py-1.5">
        <Tab>All</Tab>
        <Tab>Ongoing</Tab>
        <Tab>Completed</Tab>
      </Tab.List>
    </div>
  );
};

export default AnimeFavoriteFilter;
