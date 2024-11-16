import classNames from "classnames";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2 font-serif font-bold">主观世界</h1>
      <p className="text-md mt-0 opacity-60 text-slate-700 dark:text-slate-200">
        走出唯一真理观
      </p>
      <hr className="my-4" />
      <div
        className={classNames(
          "prose dark:prose-invert",
          "prose-headings:font-serif prose-headings:mt-8",
          "prose-h1:text-3xl",
          "prose-h2:text-xl",
          "prose-h3:text-lg",
          "prose-blockquote:font-normal",
          "prose-pre:border prose-pre:rounded-xl",
          "before:prose-p:content-none after:prose-p:content-none"
        )}
      >
        {children}
      </div>
    </article>
  );
}
