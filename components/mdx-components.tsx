import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { QRCodeSVG } from "qrcode.react";

const components = {
  Image,
  Link,
  QRCodeSVG,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  // @ts-ignore
  return <Component components={components} />;
}
