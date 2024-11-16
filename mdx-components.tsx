import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    QRCodeSVG,
    Link,
  };
}
