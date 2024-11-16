import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.slug("posts"),
          description: s.string(),
          category: s.string(),
          date: s.isodate(),
          updatedAt: s.isodate().optional(),
          keywords: s.array(s.string()).optional(),
          cover: s.image().optional(),
          video: s.file().optional(),
          wechatLink: s.string().optional(),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
          content: s.markdown(),
          raw: s.raw(),
        })
        .transform((data) => ({ ...data, permalink: `/posts/${data.slug}` })),
    },
    categories: {
      name: "Category",
      pattern: "categories.yml",
      schema: s
        .object({
          slug: s.slug("categories", ["admin", "login"]),
          name: s.string(),
          description: s.string(),
          count: s.number().optional(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/category/${data.slug}`,
        })),
    },
  },
  prepare({ posts, categories }) {
    categories.forEach((category) => {
      category.count = posts.filter(
        (post) => post.category === category.slug
      ).length;
    });
  },
});
