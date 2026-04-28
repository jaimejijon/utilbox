import { notFound } from "next/navigation";
import { getAllSlugs, getPostMeta } from "@/lib/blog";
import ArticleCTA from "@/app/components/ArticleCTA";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) notFound();

  let PostContent: React.ComponentType;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    PostContent = mod.default;
  } catch {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    url: `https://utilbox.lat/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "utilbox.lat",
      url: "https://utilbox.lat",
    },
    publisher: {
      "@type": "Organization",
      name: "utilbox.lat",
      url: "https://utilbox.lat",
    },
    inLanguage: "es",
  };

  return (
    <main className="min-h-screen bg-[#0F1117]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-[720px] mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-300 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-400 truncate">{meta.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
              {meta.category}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-500">{formatDate(meta.date)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {meta.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {meta.description}
          </p>
        </header>

        {/* MDX content */}
        <article className="prose-custom">
          <PostContent />
        </article>

        {/* CTA */}
        <ArticleCTA toolPath={meta.relatedTool} toolName={meta.relatedToolName} />
      </div>
    </main>
  );
}
