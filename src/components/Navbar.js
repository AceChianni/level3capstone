import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4 text-white">
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
        <li>
          <Link href="/gallery">Gallery</Link>
        </li>
      </ul>
    </nav>
  );
}
