// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Home, RefreshCw, Zap,Video } from 'lucide-react';
// import { NavLink } from 'react-router';

// function Admin() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const adminOptions = [
//     {
//       id: 'create',
//       title: 'Create Problem',
//       description: 'Add a new coding problem to the platform',
//       icon: Plus,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/create'
//     },
//     {
//       id: 'update',
//       title: 'Update Problem',
//       description: 'Edit existing problems and their details',
//       icon: Edit,
//       color: 'btn-warning',
//       bgColor: 'bg-warning/10',
//       route: '/admin/update-list' // Placeholder for dynamic problem ID
//     },
//     {
//       id: 'delete',
//       title: 'Delete Problem',
//       description: 'Remove problems from the platform',
//       icon: Trash2,
//       color: 'btn-error',
//       bgColor: 'bg-error/10',
//       route: '/admin/delete'
//     },
//     {
//       id: 'video',
//       title: 'Video Problem',
//       description: 'Upload And Delete Videos',
//       icon: Video,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/video'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-base-content mb-4">
//             Admin Panel
//           </h1>
//           <p className="text-base-content/70 text-lg">
//             Manage coding problems on your platform
//           </p>
//         </div>

//         {/* Admin Options Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {adminOptions.map((option) => {
//             const IconComponent = option.icon;
//             return (
//               <div
//                 key={option.id}
//                 className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//               >
//                 <div className="card-body items-center text-center p-8">
//                   {/* Icon */}
//                   <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
//                     <IconComponent size={32} className="text-base-content" />
//                   </div>
                  
//                   {/* Title */}
//                   <h2 className="card-title text-xl mb-2">
//                     {option.title}
//                   </h2>
                  
//                   {/* Description */}
//                   <p className="text-base-content/70 mb-6">
//                     {option.description}
//                   </p>
                  
//                   {/* Action Button */}
//                   <div className="card-actions">
//                     <div className="card-actions">
//                     <NavLink 
//                     to={option.route}
//                    className={`btn ${option.color} btn-wide`}
//                    >
//                    {option.title}
//                    </NavLink>
//                    </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Admin;





import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ic = {
  plus:   <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
  edit:   <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
  trash:  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  video:  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>,
  home:   <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  chevR:  <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>,
  list:   <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>,
};

// Per-card Tailwind color maps (static so Tailwind can detect classes)
const CARD_STYLES = {
  create: {
    hover_border:  'hover:border-emerald-500/30',
    hover_shadow:  'hover:shadow-[0_0_24px_rgba(16,185,129,.18)]',
    icon_color:    'text-emerald-400',
    icon_bg:       'bg-emerald-500/[0.08]',
    icon_border:   'border-emerald-500/30',
    icon_glow:     'shadow-[0_0_14px_rgba(16,185,129,.3)]',
    title_color:   'text-emerald-400',
    tag_color:     'text-emerald-400',
    tag_bg:        'bg-emerald-500/[0.08]',
    tag_border:    'border-emerald-500/30',
    cta_color:     'text-emerald-400',
    cta_bg:        'bg-emerald-500/[0.08]',
    cta_border:    'border-emerald-500/30',
  },
  update: {
    hover_border:  'hover:border-amber-500/30',
    hover_shadow:  'hover:shadow-[0_0_24px_rgba(245,158,11,.18)]',
    icon_color:    'text-amber-400',
    icon_bg:       'bg-amber-500/[0.08]',
    icon_border:   'border-amber-500/30',
    icon_glow:     'shadow-[0_0_14px_rgba(245,158,11,.3)]',
    title_color:   'text-amber-400',
    tag_color:     'text-amber-400',
    tag_bg:        'bg-amber-500/[0.08]',
    tag_border:    'border-amber-500/30',
    cta_color:     'text-amber-400',
    cta_bg:        'bg-amber-500/[0.08]',
    cta_border:    'border-amber-500/30',
  },
  delete: {
    hover_border:  'hover:border-red-500/30',
    hover_shadow:  'hover:shadow-[0_0_24px_rgba(239,68,68,.18)]',
    icon_color:    'text-red-400',
    icon_bg:       'bg-red-500/[0.08]',
    icon_border:   'border-red-500/30',
    icon_glow:     'shadow-[0_0_14px_rgba(239,68,68,.3)]',
    title_color:   'text-red-400',
    tag_color:     'text-red-400',
    tag_bg:        'bg-red-500/[0.08]',
    tag_border:    'border-red-500/30',
    cta_color:     'text-red-400',
    cta_bg:        'bg-red-500/[0.08]',
    cta_border:    'border-red-500/30',
  },
  video: {
    hover_border:  'hover:border-blue-500/30',
    hover_shadow:  'hover:shadow-[0_0_24px_rgba(59,130,246,.18)]',
    icon_color:    'text-blue-400',
    icon_bg:       'bg-blue-500/[0.08]',
    icon_border:   'border-blue-500/30',
    icon_glow:     'shadow-[0_0_14px_rgba(59,130,246,.3)]',
    title_color:   'text-blue-400',
    tag_color:     'text-blue-400',
    tag_bg:        'bg-blue-500/[0.08]',
    tag_border:    'border-blue-500/30',
    cta_color:     'text-blue-400',
    cta_bg:        'bg-blue-500/[0.08]',
    cta_border:    'border-blue-500/30',
  },
};

const CARDS = [
  { id: 'create', title: 'Create Problem', desc: 'Add a new coding challenge to the platform',   icon: Ic.plus,  route: '/admin/create',      tag: 'NEW',   idx: '01', meta: 'POST /api/problem/create'  },
  { id: 'update', title: 'Update Problem', desc: 'Edit existing problems and their details',      icon: Ic.edit,  route: '/admin/update-list',  tag: 'EDIT',  idx: '02', meta: 'PATCH /api/problem/:id'    },
  { id: 'delete', title: 'Delete Problem', desc: 'Permanently remove problems from the platform', icon: Ic.trash, route: '/admin/delete',       tag: 'DEL',   idx: '03', meta: 'DELETE /api/problem/:id'   },
  { id: 'video',  title: 'Video Manager',  desc: 'Upload and manage editorial video content',     icon: Ic.video, route: '/admin/video',        tag: 'MEDIA', idx: '04', meta: 'POST /api/video/upload'    },
];

export default function Admin() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#111113] text-[#e8e8ea]">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .anim-fadeup { animation: fadeUp .45s ease both; }
        .anim-fadeup-d1 { animation: fadeUp .4s .06s ease both; }
        .anim-fadeup-d2 { animation: fadeUp .4s .12s ease both; }
        .anim-fadeup-d3 { animation: fadeUp .4s .18s ease both; }
        .anim-fadeup-d4 { animation: fadeUp .4s .24s ease both; }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="sticky top-0 z-50 h-12 flex items-center justify-between px-[18px]
                      bg-[#161618] border-b border-white/[0.07] flex-shrink-0">
        <div className="flex items-center gap-[10px]">
          {/* Traffic lights */}
          <div className="flex gap-[5px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="w-px h-4 bg-white/[0.07]" />
          {/* Breadcrumb */}
          <div className="flex items-center gap-[5px] text-[0.72rem]">
            <NavLink to="/"
              className="flex items-center gap-1 text-zinc-600 no-underline hover:text-emerald-400 transition-colors">
              {Ic.home} Home
            </NavLink>
            <span className="text-zinc-600">{Ic.chevR}</span>
            <span className="text-zinc-400 font-medium">Admin Panel</span>
          </div>
        </div>

        {/* Badge */}
        <div className="flex items-center gap-[6px] font-mono text-[0.62rem]
                        px-[10px] py-[3px] rounded bg-emerald-500/[0.08]
                        border border-emerald-500/20 text-emerald-400">
          <span className="w-[5px] h-[5px] rounded-full bg-emerald-400
                           shadow-[0_0_6px_rgba(16,185,129,.7)] animate-pulse" />
          ADMIN ACCESS
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="text-center px-6 pt-14 pb-9 anim-fadeup">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-[-1.5px] leading-[1.05] mb-3 text-white">
          Admin <em className="not-italic text-emerald-400">Dashboard</em>
        </h1>
        <p className="font-mono text-[0.78rem] text-zinc-600 max-w-[380px] mx-auto leading-[1.7] tracking-[0.3px]">
          Select an operation below to manage<br />problems and content on the platform.
        </p>
      </div>

      {/* ── GRID ── */}
      <div className="max-w-[980px] w-full mx-auto mb-16 px-5
                      grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
        {CARDS.map((c, i) => {
          const s = CARD_STYLES[c.id];
          const isHov = hovered === c.id;
          const delayClass = ['anim-fadeup-d1','anim-fadeup-d2','anim-fadeup-d3','anim-fadeup-d4'][i];

          return (
            <NavLink
              key={c.id}
              to={c.route}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              className={`block no-underline rounded-[10px] overflow-hidden
                          bg-[#161618] border transition-all duration-200
                          hover:-translate-y-[2px] relative group
                          ${delayClass}
                          ${isHov ? `border-opacity-100 ${s.hover_border} ${s.hover_shadow}` : 'border-white/[0.07]'}`}
            >
              {/* shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.025] to-transparent
                               -translate-x-full group-hover:translate-x-full transition-transform duration-500
                               pointer-events-none" />

              {/* Card top */}
              <div className="flex items-start gap-4 p-[22px] pb-[18px]">
                {/* Icon */}
                <div className={`w-[50px] h-[50px] rounded-[10px] flex items-center justify-center
                                 flex-shrink-0 border transition-all duration-200
                                 ${isHov ? `${s.icon_color} ${s.icon_bg} ${s.icon_border} ${s.icon_glow}` : 'text-zinc-600 bg-[#1c1c1f] border-white/[0.07]'}`}>
                  {c.icon}
                </div>

                {/* Meta */}
                <div className="flex-1 min-w-0">
                  {/* Index */}
                  <div className="flex items-center gap-[6px] font-mono text-[0.58rem] tracking-[1.5px] text-zinc-600 mb-1">
                    <span className="w-[10px] h-px bg-current" />
                    OP_{c.idx}
                  </div>
                  {/* Title */}
                  <div className={`text-[0.95rem] font-bold tracking-[-0.2px] mb-[5px] transition-colors duration-200
                                   ${isHov ? s.title_color : 'text-[#e8e8ea]'}`}>
                    {c.title}
                  </div>
                  {/* Desc */}
                  <div className="text-[0.78rem] text-zinc-600 leading-[1.6]">
                    {c.desc}
                  </div>
                </div>

                {/* Tag pill */}
                <div className={`font-mono text-[0.58rem] font-semibold tracking-[1px]
                                 px-2 py-[2px] rounded-[3px] border flex-shrink-0
                                 transition-all duration-200
                                 ${isHov ? `${s.tag_color} ${s.tag_bg} ${s.tag_border}` : 'text-zinc-600 bg-transparent border-white/[0.07]'}`}>
                  {c.tag}
                </div>
              </div>

              {/* Footer strip */}
              <div className="flex items-center justify-between mx-[22px] py-[10px] border-t border-white/[0.07]">
                <span className="font-mono text-[0.62rem] text-zinc-600 tracking-[0.3px]">
                  {c.meta}
                </span>
                <div className={`inline-flex items-center gap-[5px]
                                 font-mono text-[0.62rem] font-semibold tracking-[0.5px]
                                 px-[10px] py-[3px] rounded border transition-all duration-200
                                 ${isHov ? `${s.cta_color} ${s.cta_bg} ${s.cta_border}` : 'text-zinc-600 bg-transparent border-white/[0.07]'}`}>
                  Open {Ic.arrow}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* ── STATUS BAR ── */}
      <div className="mt-auto h-[22px] flex items-center gap-4 px-4
                      bg-emerald-500 font-mono text-[0.6rem] font-semibold
                      text-[#003322] tracking-[0.5px] flex-shrink-0">
        <span className="flex items-center gap-[6px] opacity-70">{Ic.shield}</span>
        <span>Admin Panel</span>
        <span className="flex items-center gap-[6px] opacity-70">{Ic.list}</span>
        <span>4 Operations</span>
        <span className="ml-auto">DSA Deck</span>
      </div>
    </div>
  );
}