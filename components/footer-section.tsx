export function FooterSection() {
  return (
    <footer className="mt-10 border-t border-white/10 py-8">
      <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 AI 網頁開發接案工作室. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#services" className="transition hover:text-white">
            服務項目
          </a>
          <a href="#portfolio" className="transition hover:text-white">
            案例展示
          </a>
          <a href="#contact" className="transition hover:text-white">
            聯絡我們
          </a>
        </div>
      </div>
    </footer>
  );
}
