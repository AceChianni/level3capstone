// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/quiz">Quiz</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
        {/* <li>
          <Link href="/gallery">Gallery</Link>
        </li> */}
      </ul>
    </nav>
  );
}
