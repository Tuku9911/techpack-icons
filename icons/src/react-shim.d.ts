declare module "react" {
  export interface SVGProps<T> {
    className?: string;
    [key: string]: unknown;
  }
  export function createElement(type: unknown, props?: unknown, ...children: unknown[]): unknown;
}

declare module "react/jsx-runtime" {
  export namespace JSX {
    interface IntrinsicElements {
      svg: Record<string, unknown>;
      g: Record<string, unknown>;
      path: Record<string, unknown>;
      title: Record<string, unknown>;
      [elem: string]: Record<string, unknown> | undefined;
    }
  }
  export const jsx: unknown;
  export const jsxs: unknown;
  export const Fragment: unknown;
}
