


import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerUser } from '../authSlice';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum 3 characters required"),
  emailId:   z.string().email("Invalid email address"),
  password:  z.string().min(8, "Password must be at least 8 characters"),
});

// ── Icons ─────────────────────────────────────────────────────────────────────
const CodeIcon  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>;
const UserIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const MailIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const LockIcon  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>;
const ArrowR    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>;
const SparkIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const EyeOff   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const EyeOn    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;

const STRENGTH = [
  { label: '',       color: 'bg-zinc-700',         text: 'text-zinc-600'   },
  { label: 'Weak',   color: 'bg-red-500',           text: 'text-red-500'   },
  { label: 'Fair',   color: 'bg-amber-400',         text: 'text-amber-400' },
  { label: 'Strong', color: 'bg-emerald-500',       text: 'text-emerald-400' },
];

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { isAuthenticated, loading } = useSelector(s => s.auth);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => { if (isAuthenticated) navigate('/'); }, [isAuthenticated, navigate]);

  const onSubmit = (data) => dispatch(registerUser(data));

  const pw       = watch('password') || '';
  const strength = pw.length === 0 ? 0 : pw.length < 8 ? 1 : pw.length < 12 ? 2 : 3;

  const firstName = watch('firstName') || '';
  const emailId   = watch('emailId')   || '';
  const filledCount = [firstName, emailId, pw].filter(v => v.length > 0).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#111113] font-sans"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 50% -5%, rgba(16,185,129,.05), transparent),
          repeating-linear-gradient(0deg,  transparent, transparent 39px, rgba(16,185,129,.012) 39px, rgba(16,185,129,.012) 40px),
          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(16,185,129,.008) 39px, rgba(16,185,129,.008) 40px)
        `
      }}
    >

      {/* ── TOPBAR ── */}
      <div className="h-12 flex items-center px-5 bg-[#161618] border-b border-white/[0.07] flex-shrink-0">
        {/* Traffic lights */}
        {/* <div className="flex gap-[5px] mr-3">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        </div> */}
        <div className="w-px h-4 bg-white/[0.07] mr-3" />
        <NavLink to="/" className="flex items-center gap-2 text-emerald-400 font-bold text-[0.82rem] no-underline tracking-tight">
          <div className="w-[26px] h-[26px] rounded-[6px] bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
            <CodeIcon />
          </div>
          DSA Deck
        </NavLink>
      </div>

      {/* ── CENTER ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] bg-[#161618] border border-white/[0.07] rounded-xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)]
                        animate-[fadeUp_.4s_ease_both]">

          {/* top accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-emerald-500 via-emerald-300 to-transparent" />

          <div className="px-7 pt-8 pb-7">

            {/* Header */}
            <div className="text-center mb-7">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20
                              flex items-center justify-center text-emerald-400 mx-auto mb-4
                              shadow-[0_0_20px_rgba(16,185,129,0.12)]
                              animate-[glow_3s_ease_infinite]">
                <SparkIcon />
              </div>
              <h1 className="text-[1.3rem] font-extrabold tracking-tight text-white mb-1">
                Create account
              </h1>
              <p className="font-mono text-[0.63rem] text-zinc-600 uppercase tracking-widest">
                Join DSA Deck today
              </p>
            </div>

            {/* Progress bar */}
            <div>
              <p className="font-mono text-[0.58rem] text-zinc-600 text-right mb-1 tracking-wide">
                {filledCount}/3 fields
              </p>
              <div className="flex gap-1 mb-6">
                {[0, 1, 2].map(i => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-500"
                      style={{ width: filledCount > i ? '100%' : '0%' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* First Name */}
              <div>
                <label className="flex items-center gap-[5px] text-[0.72rem] font-semibold text-zinc-400 mb-[6px]">
                  <span className="text-emerald-400 opacity-80"><UserIcon /></span>
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className={`w-full px-[14px] py-[9px] bg-[#1c1c1f] border rounded-[7px] text-zinc-100
                              text-[0.85rem] outline-none placeholder-zinc-600
                              transition-all duration-200
                              focus:bg-[#242428] focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/[0.08]
                              ${errors.firstName
                                ? 'border-red-500/45 focus:border-red-500/45 focus:ring-red-500/[0.08]'
                                : 'border-white/[0.07]'
                              }`}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="mt-[5px] text-[0.7rem] font-mono text-red-400 flex items-center gap-[5px]">
                    <span className="inline-flex items-center justify-center w-[13px] h-[13px] rounded-full
                                     bg-red-500/15 border border-red-500/30 text-[0.6rem] font-bold flex-shrink-0">!</span>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-[5px] text-[0.72rem] font-semibold text-zinc-400 mb-[6px]">
                  <span className="text-emerald-400 opacity-80"><MailIcon /></span>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full px-[14px] py-[9px] bg-[#1c1c1f] border rounded-[7px] text-zinc-100
                              text-[0.85rem] outline-none placeholder-zinc-600
                              transition-all duration-200
                              focus:bg-[#242428] focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/[0.08]
                              ${errors.emailId
                                ? 'border-red-500/45 focus:border-red-500/45 focus:ring-red-500/[0.08]'
                                : 'border-white/[0.07]'
                              }`}
                  {...register('emailId')}
                />
                {errors.emailId && (
                  <p className="mt-[5px] text-[0.7rem] font-mono text-red-400 flex items-center gap-[5px]">
                    <span className="inline-flex items-center justify-center w-[13px] h-[13px] rounded-full
                                     bg-red-500/15 border border-red-500/30 text-[0.6rem] font-bold flex-shrink-0">!</span>
                    {errors.emailId.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-[5px] text-[0.72rem] font-semibold text-zinc-400 mb-[6px]">
                  <span className="text-emerald-400 opacity-80"><LockIcon /></span>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`w-full pl-[14px] pr-10 py-[9px] bg-[#1c1c1f] border rounded-[7px] text-zinc-100
                                text-[0.85rem] outline-none placeholder-zinc-600
                                transition-all duration-200
                                focus:bg-[#242428] focus:border-emerald-500/45 focus:ring-2 focus:ring-emerald-500/[0.08]
                                ${errors.password
                                  ? 'border-red-500/45 focus:border-red-500/45 focus:ring-red-500/[0.08]'
                                  : 'border-white/[0.07]'
                                }`}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-emerald-400
                               transition-colors duration-150 flex items-center p-[2px] bg-transparent border-none"
                  >
                    {showPass ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-[5px] text-[0.7rem] font-mono text-red-400 flex items-center gap-[5px]">
                    <span className="inline-flex items-center justify-center w-[13px] h-[13px] rounded-full
                                     bg-red-500/15 border border-red-500/30 text-[0.6rem] font-bold flex-shrink-0">!</span>
                    {errors.password.message}
                  </p>
                )}

                {/* Strength meter */}
                {pw.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map(lvl => (
                        <div key={lvl} className="flex-1 h-[3px] rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${strength >= lvl ? STRENGTH[strength].color : 'bg-transparent'}`}
                            style={{ width: strength >= lvl ? '100%' : '0%' }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className={`text-right font-mono text-[0.58rem] tracking-wide ${STRENGTH[strength].text}`}>
                      {STRENGTH[strength].label}
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-[10px] px-5 rounded-lg font-bold text-[0.85rem]
                             bg-emerald-500 text-[#003322]
                             flex items-center justify-center gap-2
                             transition-all duration-200
                             hover:bg-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:-translate-y-px
                             active:translate-y-0
                             disabled:opacity-55 disabled:cursor-not-allowed
                             relative overflow-hidden group"
                >
                  {/* shimmer */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent
                                   -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {loading ? (
                    <>
                      <span className="w-[14px] h-[14px] border-2 border-[#003322]/25 border-t-[#003322]
                                       rounded-full animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    <>Create Account <ArrowR /></>
                  )}
                </button>

                <p className="mt-3 text-center font-mono text-[0.6rem] text-zinc-600 leading-relaxed tracking-[0.3px]">
                  By signing up you agree to our Terms of Service<br />and Privacy Policy
                </p>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="font-mono text-[0.58rem] tracking-[1.5px] text-zinc-600">HAVE AN ACCOUNT?</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* Login link */}
            <p className="text-center text-[0.78rem] text-zinc-600">
              Already a member?{' '}
              <NavLink
                to="/login"
                className="text-emerald-400 font-semibold no-underline
                           inline-flex items-center gap-1
                           hover:text-emerald-300 transition-colors duration-150"
              >
                Sign in <ArrowR />
              </NavLink>
            </p>

          </div>
        </div>
      </div>

      {/* ── STATUS BAR ── */}
      <div className="h-[22px] flex items-center gap-4 px-4 bg-emerald-500
                      font-mono text-[0.6rem] font-semibold text-[#003322] tracking-[0.5px] flex-shrink-0">
        <span className="w-[5px] h-[5px] rounded-full bg-[#003322]/50 animate-pulse" />
        <span>New Account</span>
        <span className="ml-auto">DSA Deck</span>
      </div>

      {/* Keyframe injection (minimal — only what Tailwind can't do) */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes glow   { 0%,100% { box-shadow: 0 0 20px rgba(16,185,129,.12); } 50% { box-shadow: 0 0 36px rgba(16,185,129,.28); } }
      `}</style>
    </div>
  );
}
