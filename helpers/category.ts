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
    displayName: "文本翻译",
  },
  {
    name: "reading",
    displayName: "读读写写",
  },
  {
    name: 'recalls',
    displayName: '回头看看',
  },
  {
    name: 'verses',
    displayName: '也许是诗',
  }
];

export function getCategoryInfo(name: string): Category {
  return (
    CATEGORIES.find((category) => category.name === name) ?? {
      name,
      displayName: name,
    }
  );
}
