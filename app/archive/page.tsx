import { Post, allPosts } from "@/.contentlayer/generated";
import { Metadata } from "next";
import Link from "next/link";

const categoryGroupedPosts = allPosts
  .reduce<
    {
      category: string;
      posts: Post[];
    }[]
  >((acc, item) => {
    const existingItem = acc.find((entry) => entry.category === item.category);

    if (existingItem) {
      existingItem.posts.push(item);
    } else {
      acc.push({ category: item.category, posts: [item] });
    }

    return acc;
  }, [])
  .sort((a, b) => b.posts.length - a.posts.length);

export const metadata: Metadata = {
  title: "主观世界档案馆",
  description: "独立博客「主观世界」的档案馆",
  authors: {
    name: "Nooc",
    url: "https://nooc.ink",
  },
  openGraph: {
    title: "档案馆 - 主观世界",
    description: "「主观世界」的档案馆",
    images: "/opengraph-image.png",
  },
  twitter: {
    title: "档案馆 - 主观世界",
    description: "「主观世界」的档案馆",
    site: "@noobnooc",
    card: "summary_large_image",
    images: "/twitter-image.png",
  },
  keywords: [
    "主观世界",
    "主观世界档案馆",
    "档案馆",
    "档案",
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

export default function Home() {
  return (
    <div className="prose dark:prose-invert py-6">
      <article>
        <h1 className="mb-2">档案馆</h1>
        <p className="text-md m-0">主观世界的档案馆</p>
        <hr className="my-6" />
        <h3 className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
            />
          </svg>
          分类
        </h3>
        <ul>
          {categoryGroupedPosts.map(({ category, posts }) => (
            <li key={category}>
              <Link href={`/category/${category}`}>{category}</Link>：
              {posts.length} 篇
            </li>
          ))}
        </ul>
        <h3 className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
          统计
        </h3>
        <p>
          共计 {allPosts.length} 篇文章，
          {allPosts.reduce(
            (total, current) => total + countWords(current.body.raw),
            0
          )}
          &nbsp;字。
        </p>
        <h3 className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          推荐
        </h3>
        <p>
          如果你想看看其他和本站类似的独立博客，这里推荐一些我偶尔会看，并且觉得还不错的：
        </p>
        <ul>
          <li>
            <a href="https://firewood.news">积薪</a> •
            这不是一个独立博客，而是一个独立博客收集网站。我很喜欢它的页面设计，在上面也能发现非常多优质的博客。
          </li>
          <li>
            <a href="https://rercel.com">Rercel</a> • 不知道这个名字是不是在碰瓷
            Vercel，好在他的内容是不错的啦。作者主要写一些法律和哲学相关的话题，偶尔也涉及计算机技术。
          </li>
        </ul>
      </article>
    </div>
  );
}

function countWords(text: string) {
  // 使用正则表达式匹配英文单词和 CJK 文字
  const wordRegex =
    /[a-zA-Z]+|\p{Script=Han}|\p{Script=Katakana}|\p{Script=Hiragana}|\p{Script=Hangul}/gu;
  const matches = text.match(wordRegex);

  // 统计匹配到的单词数量
  const wordCount = matches ? matches.length : 0;

  return wordCount;
}
