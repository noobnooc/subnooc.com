import { allPosts } from "@/.contentlayer/generated";
import { PostInfo } from "@/components/post-info";
import Link from "next/link";
import { compareDesc } from "date-fns";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {allPosts
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((post) => (
          <article key={post._id}>
            <Link href={post.slug}>
              <h2 className="font-serif font-bold">{post.title}</h2>
            </Link>
            {post.description && <p>{post.description}</p>}
            <PostInfo className="-mt-2" post={post} />
          </article>
        ))}
    </div>
  );
}
