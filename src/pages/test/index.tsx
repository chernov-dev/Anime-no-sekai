import React, { useState, useEffect } from "react";
import {Tab} from "@headlessui/react";

const TestingPage = () => {

  return (
    <div className="mt-8 grid place-content-center min-h-[50vh]">
      <Tab.Group>
        <Tab.List>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  );
};


export default TestingPage;
