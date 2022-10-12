import { Tab } from "@headlessui/react";
import React from "react";
import { CgDisplayFullwidth, CgDisplayGrid } from "react-icons/cg";

const LayoutChanger = () => {

  return (
    <Tab.List className={"flex flex-row gap-2"}>
      <Tab className={`neumorphic-icon w-[2.5rem] ui-selected:shadow-neumorphic-inner`} >
        <CgDisplayGrid title="Switch to grid layout" size={20} />
      </Tab>
      <Tab className={`neumorphic-icon w-[2.5rem] ui-selected:shadow-neumorphic-inner`} >
      <CgDisplayFullwidth title="Switch to full width layout" size={20} />
      </Tab>
    </Tab.List>
  );
};

export default LayoutChanger;
