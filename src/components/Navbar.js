// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#ae9bff] fixed top-0 w-full z-50 flex justify-center p-4 shadow-md">
      <ul className="flex space-x-6 text-white">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="/quiz" className="hover:underline">
            Quiz
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </li>
        <li>
          <Link href="/gallery" className="hover:underline">
            Gallery
          </Link>
        </li>
      </ul>
    </nav>
  );
}
