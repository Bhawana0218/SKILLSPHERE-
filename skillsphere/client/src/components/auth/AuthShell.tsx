import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-screen bg-[#06121F] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/25 via-sky-500/20 to-indigo-600/25 blur-3xl" />
          <div className="absolute bottom-[-260px] right-[-200px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <span className="text-lg font-semibold text-white">S</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">SkillSphere</div>
              <div className="text-xs text-white/60">Hyperlocal freelance ecosystem</div>
            </div>
          </Link>
          <div className="hidden text-xs text-white/60 md:block">
            Secure access • Verified work • Trusted payments
          </div>
        </header>

        <main className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 pb-16 pt-2 md:grid-cols-2 md:items-center">
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10"
            >
              <div className="text-sm font-semibold text-white/80">NAYODA • SkillSphere</div>
              <h1 className="mt-4 text-3xl font-semibold leading-tight">
                Industry-grade onboarding for a next-level product.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Email verification, secure password recovery, and two-factor authentication
                designed for real-world teams and real users.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-white/70">Security</div>
                  <div className="mt-1 font-semibold">2FA + verified email</div>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="text-white/70">Speed</div>
                  <div className="mt-1 font-semibold">Fast recovery flows</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-3xl bg-white p-7 text-slate-900 shadow-xl shadow-black/20 ring-1 ring-white/15 backdrop-blur"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
            </div>

            {children}

            {footer ? <div className="mt-6 border-t border-slate-200 pt-5">{footer}</div> : null}
          </motion.section>
        </main>
      </div>
    </div>
  );
}

