import { StudioShell } from "@/components/studio/studio-shell";
import { studioContracts } from "@/lib/studio/mock-data";

export default function StudioTemplatesPage() {
  const template = studioContracts[0];

  return (
    <StudioShell
      eyebrow="Templates"
      title="合約模板管理"
      description="這裡先展示築時數位目前採用的防禦型合約結構。後續若要多模板並存，可在此管理不同服務版本。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Template Summary</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[0.05em] text-stone-900">築時數位防禦型網站合約</h3>
          <div className="mt-5 space-y-3 text-sm leading-7 text-stone-700">
            <p>- 限制每階段免費修改 2 次</p>
            <p>- 分期收款，未入帳可暫停工作</p>
            <p>- 未付清前，設計稿與原始碼智財權保留於築時數位</p>
            <p>- 甲方失聯超過 14 日可終止並結算</p>
            <p>- 客戶可透過電子簽署頁在手機上完成簽約</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-stone-200 bg-white p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Clause Stack</p>
          <div className="mt-5 space-y-4">
            {template.clauses.map((clause) => (
              <article key={clause.id} className="rounded-[22px] border border-stone-200 bg-stone-50 p-4">
                <p className="text-sm font-semibold text-stone-900">{clause.title}</p>
                <p className="mt-2 text-sm leading-7 text-stone-700">{clause.content}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </StudioShell>
  );
}
