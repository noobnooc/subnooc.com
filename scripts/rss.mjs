// @ts-check

import { Feed } from "feed";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import { readFile } from "fs/promises";

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
    email: "nooc@nooc.me",
    link: "https://nooc.me",
  },
});

const remark = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const posts = JSON.parse(await readFile(".velite/posts.json", "utf8"));

posts
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .forEach((post) => {
    const url = new URL(post.permalink, "https://subnooc.com").href;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: String(remark.processSync(post.raw)),
      date: new Date(post.date),
      category: [{ name: post.category }],
      author: [
        {
          name: "Nooc",
          email: "nooc@nooc.me",
          link: "https://nooc.me",
        },
      ],
    });
  });

if (!existsSync("./public")) {
  mkdirSync("./public");
}

writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" });
