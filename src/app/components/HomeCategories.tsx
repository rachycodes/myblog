import Link from 'next/link';

export function HomeCategories() {
  return (
    <section className="mx-auto max-w-5xl py-10">
      <div className="grid gap-6 md:grid-cols-2 ">
        {/* Travel side */}
        <div className="relative h-64 overflow-hidden md:h-80 transition-all duration-300 ease-out hover:-translate-y-1 ">
          {/* background image */}
          <div className="absolute inset-0 bg-[url('/trees.png')] bg-cover bg-center" />
          {/* dark overlay so text is readable */}
          <div className="absolute inset-0 bg-black/40" />
          {/* content */}
          <div className="relative flex h-full items-center justify-center">
            <div className="text-center text-white">
              <h2 className="mb-3 text-2xl font-bold">Travel Posts</h2>
              <p className="mb-4 text-sm text-zinc-200">
                Trips, adventures, and places I want to go.
              </p>
              <Link
                href="/category/travel"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
              >
                ✈️ Check out my travel posts
              </Link>
            </div>
          </div>
        </div>

        {/* Food side */}
        <div className="relative h-64 overflow-hidden md:h-80 transition-all duration-300 ease-out hover:-translate-y-1 ">
          {/* background image */}
          <div className="absolute inset-0 bg-[url('/food.png')] bg-cover bg-center" />
          {/* overlay */}
          <div className="absolute inset-0 bg-black/40" />
          {/* content */}
          <div className="relative flex h-full items-center justify-center ">
            <div className="text-center text-white">
              <h2 className="mb-3 text-2xl font-bold">Food Posts</h2>
              <p className="mb-4 text-sm text-zinc-200">
                Recipes, cravings, and comfort food.
              </p>
              <Link
                href="/category/food"
                className="inline-flex items-center rounded-full gap-2 bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-amber-400 transition"
              >
                🍔 Check out my food posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
