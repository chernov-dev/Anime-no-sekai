import AnsSvgLogo from "../../../public/AnsSvgLogo";

const AuthLayout = ({
    children,
    error,
}: {
    children: JSX.Element;
    error: string;
}) => {
    return (
        <div className="h-[80vh] flex m-2">
            <div className="max-w-[700px] rounded-[1rem] w-full mx-auto my-auto shadow-neumorphic text-primary">
                <div className="flex flex-col items-center">
                    <div className="relative w-full h-[10rem] overflow-hidden bg-neumorph-secondary-light rounded-tl-lg rounded-tr-lg -mb-6 z-10">
                        <AnsSvgLogo
                            style={{
                                width: "inherit",
                                height: "inherit",
                            }}
                            preserveAspectRatio="xMinYMin slice"
                            fill="rgb(var(--neumorph-accent))"
                        />
                        <div className="absolute bg-neumorph-primary rounded-[50%] -bottom-24 -left-[10%] w-[120%] h-40"></div>
                    </div>
                    <div className="flex flex-col gap-5 p-4 px-8 pt-0 mx-8 max-w-[550px] w-full z-20">
                        {children}
                        {/* <GoogleNeumorphismButton
                onClick={handleGoogleSignIn}
                className="self-center"
              /> */}
                        {/* <NeumorphismButton
                onClick={() => loginMutation.mutate()}
                className="self-center"
              >
                <FaUserTimes size={22} />
                <p>Sign in anonymously</p>
              </NeumorphismButton> */}
                    </div>
                    {error && <p className="text-sm mb-8 text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
