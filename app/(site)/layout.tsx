import MobileHeader from "@/app/components/MobileHeader";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/categories";
import Footer from "@/app/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-500 text-white shadow-md">
        <MobileHeader />

        <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between px-4 py-2 md:px-6 md:py-3">
          <Link
            href="/"
            className="flex items-center gap-1 shrink-0"
          >
            <Image
              src="/logo.png"
              alt="喵喵網"
              width={60}
              height={42}
              priority
            />

            <div className="font-bold text-base md:text-2xl">
              喵喵網
            </div>
          </Link>

          <nav>
            <ul className="flex items-center gap-4 md:gap-8 overflow-x-auto whitespace-nowrap text-sm md:text-lg font-medium">
              <li>
                  <a href="/">首頁</a>
              </li>

              {categories.map((item) => (
                <li key={item.slug}>
                  <a href={`/category/${item.slug}`}>
  {item.name}
</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>
<Footer />
      
    </div>
  );
}