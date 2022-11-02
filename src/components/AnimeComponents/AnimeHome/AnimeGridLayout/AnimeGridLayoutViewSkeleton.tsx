
const AnimeGridLayoutViewSkeleton = () => {
    return (
        <>
            <div className='anime-home__grid'>
                {...Array(12).map((i, index) => {
                    return <div key={index} className="">

                    </div>
                })}
            </div>
        </>
    )
}

export default AnimeGridLayoutViewSkeleton