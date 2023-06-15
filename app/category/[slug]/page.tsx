import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { PostInfo } from "@/components/post-info";
import { compareDesc } from "date-fns";
import Link from "next/link";

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

  return {
    title: `${category} - 主观世界`,
    description: `${category}分类下的文章`,
    authors: {
      name: "Nooc",
      url: "https://nooc.ink",
    },
    openGraph: {
      title: `${category} - 主观世界`,
      description: `${category}分类下的文章 - 主观世界`,
      images: "/opengraph-image.png",
    },
    twitter: {
      title: `${category} - 主观世界`,
      description: `${category}分类下的文章 - 主观世界`,
      site: "@noobnooc",
      card: "summary_large_image",
      images: "/twitter-image.png",
    },
    keywords: [
      "主观世界",
      "分类",
      category,
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

  return (
    <div className="prose dark:prose-invert py-6">
      <h1 className="mb-2">{category}</h1>
      <p className="text-md m-0">{category}分类下的文章</p>
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
