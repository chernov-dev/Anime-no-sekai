import Image from 'next/image'
import React from 'react'
import AnimeDetails from '../components/AnimeComponents/AnimeDetails/AnimeDetails'
import AnimePlayer from '../components/AnimeComponents/AnimePlayer/AnimePlayer'
import AnimeRecommendations from '../components/AnimeComponents/AnimeFavorite/AnimeRecommendations'
import { shimmer, toBase64 } from '../components/Shared/shimmer'

const AnimeDetailsScreen = ({animeDetails}) => {
  return (
    <>
    {animeDetails.cover && (
      <div className="shadow-neumorphic-inner w-full py-4 mb-2">
        <div className="w-[full] h-[200px] sm:h-[253px] md:h-[283px] lg:h-[339px] xl:h-[389px] relative">
          <Image
            src={animeDetails.cover}
            alt="cover of the current anime"
            layout="fill"
            placeholder="blur"
            objectFit="cover"
            objectPosition="50% 50%"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 300)
            )}`}
          />
        </div>
      </div>
    )}
    <div className="flex flex-col gap-5 w-full px-3 lg:px-8">
      <section className="w-full" id="anime-details">
        <AnimeDetails anime={animeDetails} />
      </section>
      <section className="w-full" id="anime-watch">
        {animeDetails.episodes.length > 0 && (
          <div className="anime-player">
            <AnimePlayer
              episodes={animeDetails.episodes}
              animeCover={animeDetails.cover}
            />
          </div>
        )}
      </section>
      <section className="w-full" id="anime-recommended">
        <AnimeRecommendations
          recommendations={animeDetails.recommendations}
        />
      </section>
    </div>
    </>
  )
}

export default AnimeDetailsScreen