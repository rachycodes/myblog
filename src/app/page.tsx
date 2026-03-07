import Link from 'next/link';
import { HomeCategories } from './components/HomeCategories';

export default function HomePage() {
  return (
    <main className="min-h-screen ">
      {/* Tech section */}
      <section className="mt-10 transition-all duration-300 ease-out hover:-translate-y-1 ">
        <div className="relative mx-auto max-w-5xl overflow-hidden h-64 md:h-80">
          <div className="absolute inset-0 bg-[url('/tech-background.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative flex h-full flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl font-bold text-white">
            </h1>
            <p className="mt-4 text-white/80">
              The reality of learning, building, testing, and growing as a coder.
            </p>
            <Link
              href="/category/tech"
              className="mt-6 inline-flex items-center rounded-full gap-2 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
              🔥 Check out my Tech Blog 🔥
            </Link>
          </div>
        </div>
      </section>

      {/* Smaller sections */}
      <section>
        <HomeCategories  />
      </section>
      
      <section className=" mb-10 transition-all duration-300 ease-out hover:-translate-y-1 ">
        <div className="relative mx-auto max-w-5xl  overflow-hidden h-64 md:h-80">
          <div className="absolute inset-0 bg-[url('/minecraft.png')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/50" />

          {/* Gaming section */}
          <div className="relative flex h-full flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl font-bold text-white">
              Video Games
            </h1>
            <p className="mt-4 text-white/80">
              Check out my gaming blog posts
            </p>
            <Link
              href="/category/video-games"
              className="mt-6 inline-flex items-center rounded-full gap-2 bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
             🎮 Check out my Gaming Blog 🎮
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
