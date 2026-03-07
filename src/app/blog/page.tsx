import Link from "next/link"
import { client } from "../../../sanity/client"
import type { SanityDocument } from "next-sanity"
import Image from "next/image"
import { urlFor } from "../../../sanity/image"

const POSTS_QUERY = `*[
  _type == "post" &&
  defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  description,
  likes,
  categories[]->{
    _id,
    title,
    slug
  }
}`;

export default async function BlogPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY)

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
     <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug.current}`} className="block">
            {post.image && (
        <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
        <Image
            src={urlFor(post.image).width(600).height(338).url()}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
        />
        </div>
        )}
              <h2 className="text-2xl font-semibold hover:underline">
                {post.title}
              </h2>
              <p>{post.description}</p>
              <p className="mt-1 text-sm text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}