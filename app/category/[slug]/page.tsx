import { notFound } from "next/navigation";

import { Metadata } from "next";
import { PostInfo } from "@/components/post-info";
import Link from "next/link";
import { fillKeywords } from "@/helpers/keywords";
import { categories, posts } from "@/.velite";

export const runtime = "edge";

type Params = Promise<{ slug: string }>;

async function getPostsFromParams(categorySlug: string) {
  const categoryPosts = posts.filter((post) => post.category === categorySlug);

  const category = categories.find(
    (category) => category.slug === categorySlug
  );

  if (!category) {
    null;
  }

  return {
    category: category,
    posts: categoryPosts,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { category, posts } = await getPostsFromParams(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} - 主观世界`,
    description: `${category.description} - 主观世界`,
    authors: {
      name: "Nooc",
      url: "https://nooc.me",
    },
    category: category.name,
    openGraph: {
      title: `${category.name} - 主观世界`,
      description: `${category.description} - 主观世界`,
      images: "/opengraph-image.png",
    },
    twitter: {
      title: `${category.name} - 主观世界`,
      description: `${category.description} - 主观世界`,
      site: "@noobnooc",
      card: "summary_large_image",
      images: "/twitter-image.png",
    },
    keywords: fillKeywords([category.name, "分类", "类别", "文章"]),
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { category, posts } = await getPostsFromParams(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="prose dark:prose-invert py-6">
      <h1 className="mb-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
          />
        </svg>

        {category.name}
      </h1>
      <p className="text-md m-0">{category.description}</p>
      <hr className="my-6" />
      {posts
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((post) => (
          <article key={post.slug}>
            <Link href={post.permalink}>
              <h2 className="font-serif font-bold mb-4">{post.title}</h2>
            </Link>
            {post.description && <p className="mt-4">{post.description}</p>}
            <PostInfo className="-mt-2" post={post} hideCategory />
          </article>
        ))}
    </div>
  );
}
