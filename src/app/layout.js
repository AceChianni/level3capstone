import "/styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Cap Project",
  description: "A Next.js 13+ project with Tailwind and email functionality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
