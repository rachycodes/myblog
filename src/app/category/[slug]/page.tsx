import { client } from '@/sanity/client';
import Link from 'next/link';
import Image from "next/image"
import { urlFor } from "../../../../sanity/image"

const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current
}`;

const CATEGORY_POSTS_QUERY = `*[
  _type == "post" &&
  $categoryId in categories[]._ref
]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  image,
  description,
  likes
}`;

export const dynamic = 'force-dynamic';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 👇 unwrap the params Promise (same trick as the like route)
  const { slug } = await params;

  // now slug is a normal string, like "travel"
  const category = await client.fetch(CATEGORY_QUERY, { slug });

  if (!category) {
    return <div className="px-6 py-16">Category not found.</div>;
  }

  const posts = await client.fetch(CATEGORY_POSTS_QUERY, {
    categoryId: category._id,
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-16 ">

      {posts.length === 0 && <p>No posts in this category yet.</p>}

      <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {posts.map((post: any) => (
          <li className=" border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition" key={post._id}> 
            {post.image && (
                    <div className="relative mb-2 aspect-[16/9] overflow-hidden ">
                      <Image
                        src={urlFor(post.image).width(1200).height(675).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
            <Link
              href={`/blog/${post.slug}`}
              className=" hover:underline uppercase text-sm font-semibold"
            >
              {post.title}
            </Link>
            <div className="text-sm ">
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div>
              {post.description && (
                <p className="mt-2 text-sm ">{post.description}</p>
              )}
            </div>
              
          </li>
        ))}
      </ul>
    </main>
  );
}
