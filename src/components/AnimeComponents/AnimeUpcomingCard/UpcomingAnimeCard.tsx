import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai';
import useAddFavorite from '../../../hooks/useAddFavorite';
import useFavorites from '../../../hooks/useFavorites';
import { shimmer, toBase64 } from '../../utils/shimmer';
import UpcomingAnimeCardFooter from './UpcomingAnimeCardFooter';


const UpcomingAnimeCard = ({ anime }: { anime: any }) => {
    let title = anime.title;
    const router = useRouter();
  
    let tooltip = `${title} \n Episode ${anime.episodeNumber} - ${anime.episodeTitle}`;
    let imageUrl = anime.image ?? anime.images.jpg.image_url;
  
    const addFavorite = useAddFavorite(anime.id);
    const { data: favorites, isLoading: isFavoritesLoading } = useFavorites();
  
    const [liked, setLiked] = useState(false);
  
    useEffect(() => {
      setLiked(favorites?.some((e) => e.id === anime.id));
    }, [anime.id, favorites]);
  
    return (
      <div className="anime-home-item__wrapper" title={tooltip}>
        <div className="anime-home__grid-item">
          <div className="anime-home__grid-item__header">
            <div className="anime-img rounded-bl-none rounded-br-none">
              {liked && (
                <div className="anime-status-overlay">
                  <div className={`${liked ? "block" : "hidden"} `}>
                    <AiFillLike className={"w-full h-full p-1.5"} />
                  </div>
                </div>  
              )}
              <Image
                src={imageUrl}
                alt="anime poster"
                height={450}
                width={345}
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
          <UpcomingAnimeCardFooter type={anime.type} popularity={anime.popularity}/>
          </div>
          <div className="anime-home__grid-item__title py-2 ">
            <p className="line-clamp-2 leading-[1.1] text-neumorph-secondary">
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