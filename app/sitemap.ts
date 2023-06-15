import { allPosts } from "@/.contentlayer/generated";
import { compareDesc } from "date-fns";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://subnooc.com",
      lastModified: new Date(
        allPosts.sort((a, b) =>
          compareDesc(new Date(a.date), new Date(b.date))
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
  ];
}
