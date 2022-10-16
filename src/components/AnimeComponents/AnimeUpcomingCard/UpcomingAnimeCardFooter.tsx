import React from 'react'

const UpcomingAnimeCardFooter = ({type,popularity}) => {
    return (
      <div className="text-neumorph-primary px-2 py-1.5 font-semibold items-center rounded-tl-none rounded-tr-none flex w-full h-full gap-2 justify-between bg-neumorph-primary-dark">
        <p className="text-neumorph-secondary font-bold text-sm lg:text-base">
          Popularity - {popularity}
        </p>
        <p className="text-neumorph-secondary font-bold text-sm lg:text-base">
          {type}
        </p>
      </div>
    );
  };

export default UpcomingAnimeCardFooter