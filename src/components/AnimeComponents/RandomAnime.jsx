import Link from "next/link";
import React from "react";

const RandomAnime = () => {
  const max = 2840;
  const randomValue = getRandomInRange(0, max);
  return (
    <Link href={`/anime/${randomValue}`}>
      <a
        aria-current="page"
        className="block py-2 pr-4 pl-3 md:border-0  md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
      >
        Random
      </a>
    </Link>
  );
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random(min) * max);
}

export default RandomAnime;
