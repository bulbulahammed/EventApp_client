import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/images/logo.png";
import MainNav from "../mainNav";
import MobileNav from "../mobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b bg-purple-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 z-10">
      <div className="container h-14 flex items-center">
        {/* Desktop and Mobile */}
        <div className="justify-start flex-1 flex">
          <Link href="/">
            <Image src={Logo} width={128} height={38} alt="Logo" />
          </Link>
        </div>
        {/* Desktop */}
        <MainNav />
        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </header>
  );
}
