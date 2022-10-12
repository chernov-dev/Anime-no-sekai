import React from "react";
import { MoonLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <main className="grid h-screen w-full place-content-center">
      <MoonLoader color="var(--neumorph-accent)" />
    </main>
  );
};

export default PageLoader;
