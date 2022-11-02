import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";
import PageLoader from "../Shared/PageLoader";

export default function ProtectedWrapper({ children }) {
  const router = useRouter();
  const { isLoading, isError } = useUser();
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    router.push("/auth/login");
    return <PageLoader />;
  }

  return <div>{children}</div>;
}
