import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { PostInfo } from "@/components/post-info";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { getCategoryInfo } from "@/helpers/category";

interface PostProps {
  params: {
    slug: string;
  };
}

async function getPostsFromParams(params: PostProps["params"]) {
  const category = decodeURIComponent(params.slug);
  const posts = allPosts.filter((post) => post.category === category);

  if (!posts || !posts.length) {
    null;
  }

  return {
    category: category,
    posts,
  };
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { category, posts } = await getPostsFromParams(params);

  if (!posts) {
    return {};
  }

  const categoryDisplayName = getCategoryInfo(category).displayName;

  return {
    title: `${categoryDisplayName} - 主观世界`,
    description: `${categoryDisplayName}分类下的文章`,
    authors: {
      name: "Nooc",
      url: "https://nooc.ink",
    },
    openGraph: {
      title: `${categoryDisplayName} - 主观世界`,
      description: `${categoryDisplayName}分类下的文章 - 主观世界`,
      images: "/opengraph-image.png",
    },
    twitter: {
      title: `${categoryDisplayName} - 主观世界`,
      description: `${categoryDisplayName}分类下的文章 - 主观世界`,
      site: "@noobnooc",
      card: "summary_large_image",
      images: "/twitter-image.png",
    },
    keywords: [
      "主观世界",
      "分类",
      categoryDisplayName,
      "文章",
      "Subjective World",
      "Nooc",
      "Blog",
      "博客",
      "个人博客",
      "独立博客",
      "读书",
      "感想",
    ],
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.category,
  }));
}

export default async function PostPage({ params }: PostProps) {
  const { category, posts } = await getPostsFromParams(params);

  if (!posts) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(category);

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

        {categoryInfo.displayName}
      </h1>
      <p className="text-md m-0">{categoryInfo.displayName}分类下的所有文章</p>
      <hr className="my-6" />
      {posts
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2 className="font-serif font-bold">{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
            <PostInfo className="-mt-2" post={post} hideCategory />
          </article>
        ))}
    </div>
  );
}
