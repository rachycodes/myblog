import { client } from "../../../../sanity/client"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { urlFor } from "../../../../sanity/image"
import type { SanityDocument } from "next-sanity"
import { LikeButton } from '../../components/LikeButton';
import Link from 'next/link';


// GROQ
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  likes,
  categories[]->{
    _id,
    title,
    slug
  }
}`;

const ptComponents = {
  types: {
    code: ({ value }: any) => (
      <pre className="codeblock">
        <code>{value?.code ?? ""}</code>
      </pre>
    ),
  },
};

export const dynamic = 'force-dynamic';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await client.fetch<SanityDocument>(POST_QUERY, {
    slug,
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {post.image && (
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={urlFor(post.image).width(1200).height(675).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-4xl font-bold tracking-tight">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm ">

      <LikeButton postId={post._id} initialLikes={post.likes ?? 0} />

      <div className="mt-2 text-sm blog-prose">
        DATE POSTED:
        {new Date(post.publishedAt).toLocaleDateString()}
      </div>

      {post.categories?.length > 0 && (
        <div className="mt-2 mb-1 flex flex-wrap gap-2">
          {post.categories.map((cat: any) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug.current}`}
            >
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs uppercase tracking-wide text-zinc-200">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>

      <div className="prose prose-invert max-w-none mt-10 blog-prose">
        <PortableText value={post.body} components={ptComponents} />
      </div>
      
    </article>
  )
}