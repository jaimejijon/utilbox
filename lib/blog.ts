import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostMeta } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      return { ...(data as Omit<PostMeta, "slug">), slug };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return { ...(data as Omit<PostMeta, "slug">), slug };
}
