import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { QRCodeSVG } from "qrcode.react";

const components = {
  Image,
  QRCodeSVG,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
