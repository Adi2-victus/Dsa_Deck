
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';

const loginSchema = z.object({
  emailId: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// ── Icons ─────────────────────────────────────────────────────────────────────
const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const EyeOn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);
const ArrowR = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
  </svg>
);

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [focused,  setFocused]  = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(s => s.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Geist:wght@400;500;600;700;800&display=swap');

        :root {
          --bg:      #111113;
          --c1:      #161618;
          --c2:      #1c1c1f;
          --c3:      #242428;
          --border:  rgba(255,255,255,.07);
          --border2: rgba(255,255,255,.13);
          --em:      #10b981;
          --em2:     #34d399;
          --em3:     #6ee7b7;
          --text:    #e8e8ea;
          --text2:   #9898a6;
          --text3:   #5a5a6a;
          --red:     #ef4444;
          --sans:    'Geist', system-ui, sans-serif;
          --mono:    'JetBrains Mono', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes spin    { to   { transform: rotate(360deg); } }
        @keyframes pulse   { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
        @keyframes glow    { 0%,100% { box-shadow: 0 0 20px rgba(16,185,129,.15); } 50% { box-shadow: 0 0 36px rgba(16,185,129,.3); } }

        .login-root {
          min-height: 100vh;
          background: var(--bg);
          font-family: var(--sans);
          color: var(--text);
          display: flex;
          flex-direction: column;

          /* subtle grid */
          background-image:
            radial-gradient(ellipse 70% 50% at 50% -5%, rgba(16,185,129,.06), transparent),
            repeating-linear-gradient(0deg,  transparent, transparent 39px, rgba(16,185,129,.015) 39px, rgba(16,185,129,.015) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(16,185,129,.01)  39px, rgba(16,185,129,.01)  40px);
        }

        /* ── TOPBAR ── */
        .ln-topbar {
          height: 48px; flex-shrink: 0;
          display: flex; align-items: center; padding: 0 20px;
          background: var(--c1);
          border-bottom: 1px solid var(--border);
        }
        .ln-tl { display: flex; gap: 5px; margin-right: 14px; }
        .ln-dot { width: 10px; height: 10px; border-radius: 50%; }
        .ln-sep { width: 1px; height: 16px; background: var(--border); margin-right: 14px; }
        .ln-logo {
          display: flex; align-items: center; gap: 7px;
          font-weight: 700; font-size: .82rem; color: var(--em);
          text-decoration: none; letter-spacing: -.2px;
        }
        .ln-logo-icon {
          width: 26px; height: 26px; border-radius: 6px;
          background: rgba(16,185,129,.1);
          border: 1px solid rgba(16,185,129,.25);
          display: flex; align-items: center; justify-content: center;
        }

        /* ── CENTER WRAP ── */
        .ln-center {
          flex: 1; display: flex; align-items: center; justify-content: center;
          padding: 40px 16px;
        }

        /* ── CARD ── */
        .ln-card {
          width: 100%; max-width: 400px;
          background: var(--c1);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          animation: fadeUp .4s ease both;
          box-shadow: 0 24px 64px rgba(0,0,0,.5);
        }

        /* card top accent bar */
        .ln-card-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--em), var(--em2), transparent);
        }

        .ln-card-body { padding: 32px 30px 28px; }

        /* ── HEADER ── */
        .ln-header { text-align: center; margin-bottom: 28px; }
        .ln-header-icon {
          width: 48px; height: 48px; border-radius: 12px; margin: 0 auto 14px;
          background: rgba(16,185,129,.08);
          border: 1px solid rgba(16,185,129,.2);
          display: flex; align-items: center; justify-content: center;
          color: var(--em);
          animation: glow 3s ease infinite;
        }
        .ln-title {
          font-size: 1.35rem; font-weight: 800; letter-spacing: -.5px;
          color: #fff; margin-bottom: 5px;
        }
        .ln-subtitle {
          font-family: var(--mono); font-size: .65rem; color: var(--text3);
          letter-spacing: 1px; text-transform: uppercase;
        }

        /* ── FORM ── */
        .ln-field { margin-bottom: 16px; }
        .ln-label {
          display: flex; align-items: center; gap: 5px;
          font-size: .72rem; font-weight: 600; color: var(--text2);
          margin-bottom: 7px; letter-spacing: .2px;
        }
        .ln-label svg { color: var(--em); opacity: .8; }

        .ln-input-wrap { position: relative; }
        .ln-input {
          width: 100%; padding: 9px 14px;
          background: var(--c2);
          border: 1px solid var(--border);
          border-radius: 7px;
          color: var(--text); font-family: var(--sans); font-size: .85rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .ln-input::placeholder { color: var(--text3); font-size: .82rem; }
        .ln-input:focus {
          border-color: rgba(16,185,129,.45);
          background: var(--c3);
          box-shadow: 0 0 0 3px rgba(16,185,129,.08);
        }
        .ln-input.err { border-color: rgba(239,68,68,.45); }
        .ln-input.err:focus { box-shadow: 0 0 0 3px rgba(239,68,68,.08); }
        .ln-input-pw { padding-right: 40px; }

        .ln-eye {
          position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: var(--text3); display: flex; align-items: center;
          transition: color .15s; padding: 2px;
        }
        .ln-eye:hover { color: var(--em); }

        .ln-err {
          margin-top: 5px; font-size: .7rem; font-family: var(--mono);
          color: var(--red); display: flex; align-items: center; gap: 5px;
        }
        .ln-err::before { content: '!'; width: 13px; height: 13px; border-radius: 50%; background: rgba(239,68,68,.15); border: 1px solid rgba(239,68,68,.3); display: flex; align-items: center; justify-content: center; font-size: .6rem; font-weight: 700; flex-shrink: 0; }

        /* server error */
        .ln-server-err {
          margin-bottom: 16px; padding: 10px 13px;
          background: rgba(239,68,68,.07);
          border: 1px solid rgba(239,68,68,.2);
          border-radius: 7px;
          font-family: var(--mono); font-size: .7rem; color: var(--red);
          display: flex; align-items: center; gap: 8px;
          animation: fadeUp .25s ease both;
        }
        .ln-server-err::before { content: '✕'; font-size: .65rem; opacity: .7; }

        /* ── SUBMIT ── */
        .ln-submit {
          width: 100%; margin-top: 22px; padding: 10px 20px;
          border-radius: 8px; border: none; cursor: pointer;
          font-family: var(--sans); font-size: .85rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: var(--em); color: #003322;
          transition: background .2s, box-shadow .2s, transform .15s;
          position: relative; overflow: hidden;
        }
        .ln-submit::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.08), transparent);
          transform: translateX(-100%);
          transition: transform .45s ease;
        }
        .ln-submit:hover:not(:disabled)::after { transform: translateX(100%); }
        .ln-submit:hover:not(:disabled) {
          background: var(--em2); box-shadow: 0 0 24px rgba(16,185,129,.35);
          transform: translateY(-1px);
        }
        .ln-submit:active:not(:disabled) { transform: none; }
        .ln-submit:disabled { opacity: .55; cursor: not-allowed; }

        .ln-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(0,51,34,.25);
          border-top-color: #003322;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }

        /* ── DIVIDER ── */
        .ln-divider {
          display: flex; align-items: center; gap: 10px;
          margin: 22px 0 18px;
        }
        .ln-divider-line { flex: 1; height: 1px; background: var(--border); }
        .ln-divider-txt { font-family: var(--mono); font-size: .58rem; letter-spacing: 1.5px; color: var(--text3); }

        /* ── SIGNUP LINK ── */
        .ln-signup {
          text-align: center;
          font-size: .78rem; color: var(--text3);
        }
        .ln-signup a {
          color: var(--em); text-decoration: none; font-weight: 600;
          display: inline-flex; align-items: center; gap: 3px;
          transition: color .15s;
        }
        .ln-signup a:hover { color: var(--em2); }

        /* ── STATUSBAR ── */
        .ln-statusbar {
          height: 22px; flex-shrink: 0;
          display: flex; align-items: center; gap: 14px; padding: 0 16px;
          background: var(--em);
          font-family: var(--mono); font-size: .6rem;
          font-weight: 600; color: #003322; letter-spacing: .5px;
        }
        .ln-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(0,51,34,.5);
          animation: pulse 2s ease infinite;
        }
      `}</style>

      <div className="login-root">

        {/* TOPBAR */}
        <div className="ln-topbar">
          {/* <div className="ln-tl">
            <div className="ln-dot" style={{background:'#ff5f57'}}/>
            <div className="ln-dot" style={{background:'#febc2e'}}/>
            <div className="ln-dot" style={{background:'#28c840'}}/>
          </div> */}
          <div className="ln-sep"/>
          <NavLink to="/" className="ln-logo">
            <div className="ln-logo-icon"><CodeIcon/></div>
            DSA Deck
          </NavLink>
        </div>

        {/* CENTER */}
        <div className="ln-center">
          <div className="ln-card">
            <div className="ln-card-bar"/>
            <div className="ln-card-body">

              {/* Header */}
              <div className="ln-header">
                <div className="ln-header-icon"><ShieldIcon/></div>
                <div className="ln-title">Welcome back</div>
                <div className="ln-subtitle">Sign in to your account</div>
              </div>

              {/* Server error */}
              {error && <div className="ln-server-err">{error}</div>}

              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Email */}
                <div className="ln-field">
                  <div className="ln-label"><MailIcon/> Email address</div>
                  <div className="ln-input-wrap">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={`ln-input${errors.emailId ? ' err' : ''}`}
                      {...register('emailId')}
                    />
                  </div>
                  {errors.emailId && <div className="ln-err">{errors.emailId.message}</div>}
                </div>

                {/* Password */}
                <div className="ln-field">
                  <div className="ln-label"><LockIcon/> Password</div>
                  <div className="ln-input-wrap">
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      className={`ln-input ln-input-pw${errors.password ? ' err' : ''}`}
                      {...register('password')}
                    />
                    <button type="button" className="ln-eye" onClick={() => setShowPass(v => !v)}>
                      {showPass ? <EyeOff/> : <EyeOn/>}
                    </button>
                  </div>
                  {errors.password && <div className="ln-err">{errors.password.message}</div>}
                </div>

                {/* Submit */}
                <button type="submit" className="ln-submit" disabled={loading}>
                  {loading ? (
                    <><div className="ln-spinner"/> Signing in…</>
                  ) : (
                    <>Sign In <ArrowR/></>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="ln-divider">
                <div className="ln-divider-line"/>
                <div className="ln-divider-txt">NEW HERE?</div>
                <div className="ln-divider-line"/>
              </div>

              {/* Signup */}
              <div className="ln-signup">
                Don't have an account?{' '}
                <NavLink to="/signup">
                  Create one <ArrowR/>
                </NavLink>
              </div>

            </div>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="ln-statusbar">
          <div className="ln-status-dot"/>
          <span>Secure Login</span>
          <span style={{marginLeft:'auto'}}>DSA Deck</span>
        </div>
      </div>
    </>
  );
}