
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
                <div className="flex flex-col gap-5 p-4 px-4 max-w-[550px] mx-auto w-full z-20 bg-neumorph-primary py-2 rounded-[6rem]">
                    {children}
                </div>
                {error && <p className="text-sm mb-8 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default AuthLayout;
