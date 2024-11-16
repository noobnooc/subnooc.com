import { posts } from "@/.velite";
import { PostInfo } from "@/components/post-info";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {posts
        .sort(
          (p1, p2) => new Date(p2.date).getTime() - new Date(p1.date).getTime()
        )
        .map((post) => (
          <article key={post.slug}>
            <Link href={post.permalink}>
              <h2 className="font-serif font-bold mb-4">{post.title}</h2>
            </Link>
            {post.description && <p className="mt-4">{post.description}</p>}
            <PostInfo className="-mt-2" post={post} />
          </article>
        ))}
    </div>
  );
}
