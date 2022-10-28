import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { shimmer, toBase64 } from '../../Shared/shimmer';
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
            <Link href={`${anime.trailer.url ?? ""}`} className="relative h-[12rem] w-full">
              <Image
                src={imageUrl}
                alt="anime poster"
                fill
                className="object-cover object-center rounded-bl-none rounded-br-none filter dark:brightness-[90%]"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(150, 345)
                )}`}
              />
            </Link>
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