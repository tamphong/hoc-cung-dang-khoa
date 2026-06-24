"use client";

import { useRouter, usePathname } from "next/navigation";

interface Props {
  activeTab: string;
  color: string;
}

export default function SubjectTabNav({ activeTab, color }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function go(tab: string) {
    router.push(`${pathname}?tab=${tab}`);
  }

  const tabs = [
    { id: "lessons", label: "📚 Bài học" },
    { id: "quiz", label: "🎯 Luyện tập" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((t) => {
        const active = activeTab === t.id;
        return (
          <button
            key={t.id}
            onClick={() => go(t.id)}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
            style={
              active
                ? { background: color, color: "white" }
                : { background: "white", color: "#64748b", border: "2px solid #e2e8f0" }
            }
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
