import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-3 text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2 text-white">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-slate-300 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc text-slate-300 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal text-slate-300 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-sky-400 hover:text-sky-300 underline">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-400 pl-4 my-4 text-slate-400 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate-800 text-sky-300 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm">
        {children}
      </pre>
    ),
    ...components,
  };
}
