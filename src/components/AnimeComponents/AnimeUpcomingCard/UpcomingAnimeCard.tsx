import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { shimmer, toBase64 } from '../../utils/shimmer';
import UpcomingAnimeCardFooter from './UpcomingAnimeCardFooter';


const UpcomingAnimeCard = ({ anime }: { anime: any }) => {
    let title = anime.title;
    const router = useRouter();
  
    let tooltip = `${title}`;
    let imageUrl = anime.image ?? anime.images.jpg.image_url;
  
    return (
      <div className="anime-upcoming-item__wrapper" title={tooltip}>
        <div className="anime-home__grid-item">
          <div className="anime-home__grid-item__header">
            <div className="anime-img rounded-bl-none rounded-br-none">
              <Image
                src={imageUrl}
                alt="anime poster"
                height={150}
                width={345}
                objectFit="cover"
                objectPosition={"50% 0%"}
                layout="responsive"
                className="p-1 filter dark:brightness-[90%]"
                onClick={() => {
                  location.href = `${anime.trailer.url.toString()}`;
                }}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
          <UpcomingAnimeCardFooter type={anime.type} popularity={anime.popularity} year={anime.year} favorites={anime.favorites}/>
          </div>
          <div className="anime-home__grid-item__title py-2 ">
            <p className="line-clamp-1 leading-[1.1] text-neumorph-secondary">
              {title}
            </p>
            <p className="text-neumorph-secondary">
              {anime.year && <span>Year - {anime.year}</span>}
            </p>
          </div>
        </div>
      </div>
    );
  };

export default UpcomingAnimeCard;