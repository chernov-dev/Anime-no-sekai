import Link from "next/link";
import { FaVihara } from "react-icons/fa";

const WebsiteLogo = () => {
  return (
    <div className="hidden md:flex items-center">
      <Link href="/" className="flex gap-2 items-center">
        <FaVihara size={32} />
        <p className="text-lg lg:text-xl font-semibold">ANS</p>
      </Link>
    </div>
  );
};

export default WebsiteLogo;
