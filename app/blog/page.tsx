import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — Guías y calculadoras",
  description:
    "Artículos prácticos sobre finanzas personales, salud, hogar, educación y nutrición. Guías que complementan nuestras calculadoras gratuitas.",
  openGraph: {
    title: "Blog — Guías y calculadoras | utilbox.lat",
    description:
      "Artículos prácticos sobre finanzas, salud, hogar, educación y nutrición. Con calculadoras gratuitas.",
    url: "https://utilbox.lat/blog",
    siteName: "utilbox.lat",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | utilbox.lat",
    description: "Guías prácticas sobre finanzas, salud y más. Gratis.",
  },
  alternates: { canonical: "https://utilbox.lat/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogList posts={posts} />;
}
