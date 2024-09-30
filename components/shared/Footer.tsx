import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image src={Logo} width={128} height={38} alt="Logo" />
        </Link>
        <p className="text-gray-600 font-thin">
          EventApp. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
