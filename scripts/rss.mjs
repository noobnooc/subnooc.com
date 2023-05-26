import { compareDesc, parseISO } from "date-fns";
import { Feed } from "feed";
import { writeFileSync } from "fs";
import { allPosts } from "../.contentlayer/generated/index.mjs";

const feed = new Feed({
  title: "主观世界",
  description: "Nooc 的主观世界",
  id: "https://subjective.world",
  link: "https://subjective.world",
  language: "zh",
  favicon: "https://subjective.world/favicon.ico",
  copyright: "All rights reserved 2022, Nooc",
  author: {
    name: "Nooc",
    email: "nooc@nooc.ink",
    link: "https://blog.example.com",
  },
});

allPosts
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .forEach((post) => {
    const url = `https://subjective.world/posts/${post._raw.flattenedPath}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.body.raw,
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

writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" });
