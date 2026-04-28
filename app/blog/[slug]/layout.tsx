import type { Metadata } from "next";
import { getPostMeta, getAllSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);

  if (!meta) {
    return { title: "Artículo no encontrado" };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${meta.title} | utilbox.lat`,
      description: meta.description,
      url: `https://utilbox.lat/blog/${slug}`,
      siteName: "utilbox.lat",
      locale: "es_MX",
      type: "article",
      publishedTime: meta.date,
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    alternates: { canonical: `https://utilbox.lat/blog/${slug}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
