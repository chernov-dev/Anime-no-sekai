import Skeleton from 'react-loading-skeleton'

const AnimeScheduleSkeleton = () => {
    return (
        <div className="h-full flex flex-col sm:flex-row justify-between p-4 lg:px-8 items-center gap-2 text-sm md:text-base">
            <div className="grow relative w-full h-full">
                <Skeleton height={"10rem"} borderRadius="0.75rem" />
            </div>
            <div className="m-0 sm:mx-4 flex w-full flex-col flex-wrap justify-center sm:justify-between items-center gap-2 sm:gap-4 text-sm md:text-base">
                <div className="text-center">
                    <span className="text-base">
                        <Skeleton width={"10rem"} />
                    </span>
                    <span className="text-sm">
                        <Skeleton width={"7rem"} />
                    </span>
                </div>
                <div className="">
                    <Skeleton width={"10rem"} />
                </div>
                <div
                    className="neumorphic-btn secondary gap-2 w-[10rem]" style={{ padding: 0 }}
                >
                    <p className="w-full h-full" style={{ lineHeight: "1rem" }} >
                        <Skeleton height={"100%"} width={"100%"} borderRadius=".75rem" style={{ lineHeight: "1rem" }} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AnimeScheduleSkeleton