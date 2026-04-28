export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: "finanzas" | "salud" | "hogar" | "educacion" | "nutricion";
  relatedTool: string;
  relatedToolName: string;
  slug: string;
  keywords: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  content: string;
};
