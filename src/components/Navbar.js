// components/Navbar.js

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 p-4 m-0">
      <ul className="flex space-x-6 text-white justify-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="pages/quizpage.js">Quiz</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
        <li>
          <Link href="/gallery">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
}
