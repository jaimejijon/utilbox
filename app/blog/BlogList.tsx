"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/types/blog";

const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "finanzas", label: "Finanzas" },
  { id: "salud", label: "Salud" },
  { id: "hogar", label: "Hogar" },
  { id: "educacion", label: "Educación" },
  { id: "nutricion", label: "Nutrición" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  finanzas: "#22c55e",
  salud: "#ef4444",
  hogar: "#f97316",
  educacion: "#a855f7",
  nutricion: "#eab308",
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? posts : posts.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-[#0F1117]">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
        <p className="text-slate-400 mb-8 text-lg">
          Guías prácticas que complementan nuestras calculadoras.
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                active === cat.id
                  ? "bg-sky-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-slate-400">No hay artículos en esta categoría aún.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-[#0f172a] rounded-xl border border-slate-800 p-5 hover:border-sky-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor:
                        (CATEGORY_COLORS[post.category] ?? "#38bdf8") + "22",
                      color: CATEGORY_COLORS[post.category] ?? "#38bdf8",
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDate(post.date)}
                  </span>
                </div>
                <h2 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-sky-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
