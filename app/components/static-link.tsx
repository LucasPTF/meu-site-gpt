import type { AnchorHTMLAttributes, ReactNode } from "react";

type StaticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export default function StaticLink({ href, children, ...props }: StaticLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
