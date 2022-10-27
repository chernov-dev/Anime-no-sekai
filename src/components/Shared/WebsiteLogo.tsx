import Link from "next/link";
import { FaVihara } from "react-icons/fa";

const WebsiteLogo = () => {
  return (
    <div className="hidden md:flex items-center">
      <Link href="/">
        <a className="neumorphic-btn secondary">
          <FaVihara size={24} />
        </a>
      </Link>
    </div>
  );
};

export default WebsiteLogo;
