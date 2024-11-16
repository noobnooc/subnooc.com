import { posts, categories } from "@/.velite";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://subnooc.com",
      lastModified: new Date(
        posts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0].date
      ),
    },
    {
      url: "https://subnooc.com/archive",
      lastModified: new Date(),
    },
    {
      url: "https://subnooc.com/about",
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: new URL(post.permalink, "https://subnooc.com").href,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : new Date(post.date),
    })),
    ...categories.map((category) => ({
      url: new URL(category.permalink, "https://subnooc.com").href,
      lastModified: new Date(),
    })),
  ];
}
