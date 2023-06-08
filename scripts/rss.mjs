import { compareDesc, parseISO } from "date-fns";
import { Feed } from "feed";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { allPosts } from "../.contentlayer/generated/index.mjs";

const feed = new Feed({
  title: "主观世界",
  description: "Nooc 的主观世界",
  id: "https://subnooc.com",
  link: "https://subnooc.com",
  language: "zh",
  favicon: "https://subnooc.com/favicon.ico",
  copyright: "All rights reserved 2023, Nooc",
  author: {
    name: "Nooc",
    email: "nooc@nooc.ink",
    link: "https://nooc.ink",
  },
});

const remark = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

allPosts
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .forEach((post) => {
    const url = `https://subnooc.com/${post._raw.flattenedPath}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: String(remark.processSync(post.body.raw)),
      date: parseISO(post.date),
      category: [{ name: post.category }],
      author: [
        {
          name: "Nooc",
          email: "nooc@nooc.ink",
          link: "https://nooc.ink",
        },
      ],
    });
  });

if (!existsSync("./public")) {
  mkdirSync("./public");
}

writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" });
