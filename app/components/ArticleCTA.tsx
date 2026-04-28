import Link from "next/link";

type Props = {
  toolPath: string;
  toolName: string;
};

export default function ArticleCTA({ toolPath, toolName }: Props) {
  return (
    <div className="mt-12 rounded-xl border border-sky-500/30 bg-sky-500/10 p-6 text-center">
      <p className="text-white font-semibold text-lg mb-1">
        Ponlo en práctica ahora
      </p>
      <p className="text-slate-400 text-sm mb-4">
        Usa nuestra calculadora gratuita para aplicar estos conceptos a tus
        números reales.
      </p>
      <Link
        href={toolPath}
        className="inline-block px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#38bdf8" }}
      >
        Abrir {toolName} →
      </Link>
    </div>
  );
}
