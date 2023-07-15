export type Category = {
  name: string;
  displayName: string;
};

const CATEGORIES: Category[] = [
  {
    name: "blog-journey",
    displayName: "博客历程",
  },
  {
    name: "chatter",
    displayName: "自言自语",
  },
  {
    name: "translation",
    displayName: "翻译",
  },
  {
    name: "reading",
    displayName: "读书",
  },
];

export function getCategoryInfo(name: string): Category {
  return (
    CATEGORIES.find((category) => category.name === name) ?? {
      name,
      displayName: name,
    }
  );
}
