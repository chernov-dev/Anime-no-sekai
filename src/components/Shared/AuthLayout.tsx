
const AuthLayout = ({
    children,
    error,
}: {
    children: JSX.Element;
    error: string;
}) => {
    return (
        <div className="h-[80vh] flex m-2">
            <div className="max-w-[700px] rounded-[1rem] w-full mx-auto my-auto text-primary">
                <div className="flex flex-col gap-5 p-4 px-8 pt-0 max-w-[550px] w-full z-20">
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
    );
};

export default AuthLayout;
