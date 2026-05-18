// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient';

// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1),
//       output: z.string().min(1),
//       explanation: z.string().min(1),
//     })
//   ).min(1),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1),
//       output: z.string().min(1),
//     })
//   ).min(1),
//   startCode: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       initialCode: z.string().min(1),
//     })
//   ).length(3),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       completeCode: z.string().min(1),
//     })
//   ).length(3),
// });

// function AdminUpdate() {
//   const { problemId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       title: '',
//       description: '',
//       difficulty: 'medium',
//       tags: 'array',
//       visibleTestCases: [{ input: '', output: '', explanation: '' }],
//       hiddenTestCases: [{ input: '', output: '' }],
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'Java', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' },
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'Java', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' },
//       ],
//     },
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible,
//   } = useFieldArray({
//     control,
//     name: 'visibleTestCases',
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden,
//   } = useFieldArray({
//     control,
//     name: 'hiddenTestCases',
//   });

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await axiosClient.get(`/problem/problemById/${problemId}`);
        
//         // Sort code arrays to ensure consistent order
//         const languageOrder = ['C++', 'Java', 'JavaScript'];
//         const sortedStartCode = languageOrder.map(lang => 
//           res.data.startCode.find(code => code.language === lang) || 
//           { language: lang, initialCode: '' }
//         );
        
//         const sortedRefSolution = languageOrder.map(lang => 
//           res.data.referenceSolution.find(code => code.language === lang) || 
//           { language: lang, completeCode: '' }
//         );

//         reset({
//           ...res.data,
//           startCode: sortedStartCode,
//           referenceSolution: sortedRefSolution
//         });
//       } catch (err) {
//         setError(`Failed to load problem: ${err.response?.data?.message || err.message}`);
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (problemId) fetchProblem();
//   }, [problemId, reset]);

//   const onSubmit = async (data) => {
//     try {
//       await axiosClient.put(`/problem/update/${problemId}`, data);
//       alert('Problem updated successfully!');
//       // navigate('/admin/problems');
//     } catch (err) {
//       setError(`Update failed: ${err.response?.data?.message || err.message}`);
//       console.error('Submission error:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading problem...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-6xl">
//       <h1 className="text-3xl font-bold mb-6">Update Problem</h1>
      
//       {error && (
//         <div className="alert alert-error mb-6">
//           <div className="flex-1">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
//                  className="w-6 h-6 mx-2 stroke-current">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
//                     d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
//             </svg>
//             <label>{error}</label>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information Section */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title*</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//                 placeholder="Problem title"
//               />
//               {errors.title && (
//                 <span className="text-error text-sm mt-1">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Tags*</span>
//               </label>
//               <select
//                 {...register('tags')}
//                 className={`select select-bordered w-full ${errors.tags && 'select-error'}`}
//               >
//                 <option value="array">Array</option>
//                 <option value="linkedList">Linked List</option>
//                 <option value="graph">Graph</option>
//                 <option value="dp">Dynamic Programming</option>
//               </select>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Difficulty*</span>
//               </label>
//               <select
//                 {...register('difficulty')}
//                 className={`select select-bordered w-full ${errors.difficulty && 'select-error'}`}
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-control mt-4">
//             <label className="label">
//               <span className="label-text">Description*</span>
//             </label>
//             <textarea
//               {...register('description')}
//               className={`textarea textarea-bordered h-48 ${errors.description && 'textarea-error'}`}
//               placeholder="Detailed problem description"
//             />
//             {errors.description && (
//               <span className="text-error text-sm mt-1">{errors.description.message}</span>
//             )}
//           </div>
//         </div>

//         {/* Test Cases Section */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
//           {/* Visible Test Cases */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-medium text-lg">Visible Test Cases*</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 + Add Case
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {visibleFields.map((field, index) => (
//                 <div key={field.id} className="border border-base-300 p-4 rounded-lg space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Case {index + 1}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeVisible(index)}
//                       className="btn btn-xs btn-error"
//                       disabled={visibleFields.length <= 1}
//                     >
//                       Remove
//                     </button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Input*</span>
//                       </label>
//                       <input
//                         {...register(`visibleTestCases.${index}.input`)}
//                         className="input input-bordered"
//                         placeholder="e.g. [1,2,3]"
//                       />
//                     </div>
                    
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Output*</span>
//                       </label>
//                       <input
//                         {...register(`visibleTestCases.${index}.output`)}
//                         className="input input-bordered"
//                         placeholder="e.g. 6"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Explanation*</span>
//                     </label>
//                     <textarea
//                       {...register(`visibleTestCases.${index}.explanation`)}
//                       className="textarea textarea-bordered"
//                       placeholder="Explanation for the test case"
//                       rows={2}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Hidden Test Cases */}
//           <div>
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-medium text-lg">Hidden Test Cases*</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 + Add Case
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {hiddenFields.map((field, index) => (
//                 <div key={field.id} className="border border-base-300 p-4 rounded-lg space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Case {index + 1}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeHidden(index)}
//                       className="btn btn-xs btn-error"
//                       disabled={hiddenFields.length <= 1}
//                     >
//                       Remove
//                     </button>
//                   </div>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Input*</span>
//                       </label>
//                       <input
//                         {...register(`hiddenTestCases.${index}.input`)}
//                         className="input input-bordered"
//                         placeholder="e.g. [4,5,6]"
//                       />
//                     </div>
                    
//                     <div className="form-control">
//                       <label className="label">
//                         <span className="label-text">Output*</span>
//                       </label>
//                       <input
//                         {...register(`hiddenTestCases.${index}.output`)}
//                         className="input input-bordered"
//                         placeholder="e.g. 15"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Code Templates Section */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
//           <div className="space-y-8">
//             {['C++', 'Java', 'JavaScript'].map((lang, index) => {
//               const langKey = lang.toLowerCase().replace('+', 'pp');
//               return (
//                 <div key={lang} className="border border-base-300 rounded-lg p-4">
//                   <h3 className="font-medium text-lg mb-4">{lang} Template</h3>
                  
//                   <div className="form-control mb-4">
//                     <label className="label">
//                       <span className="label-text">Initial Code*</span>
//                     </label>
//                     <div className="bg-base-200 p-3 rounded-lg">
//                       <textarea
//                         {...register(`startCode.${index}.initialCode`)}
//                         className="w-full bg-transparent font-mono text-sm"
//                         rows={8}
//                         spellCheck="false"
//                       />
//                     </div>
//                     {errors.startCode?.[index]?.initialCode && (
//                       <span className="text-error text-sm mt-1">
//                         {errors.startCode[index].initialCode.message}
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="form-control">
//                     <label className="label">
//                       <span className="label-text">Reference Solution*</span>
//                     </label>
//                     <div className="bg-base-200 p-3 rounded-lg">
//                       <textarea
//                         {...register(`referenceSolution.${index}.completeCode`)}
//                         className="w-full bg-transparent font-mono text-sm"
//                         rows={8}
//                         spellCheck="false"
//                       />
//                     </div>
//                     {errors.referenceSolution?.[index]?.completeCode && (
//                       <span className="text-error text-sm mt-1">
//                         {errors.referenceSolution[index].completeCode.message}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-8">
//           <button 
//             type="button" 
//             className="btn btn-ghost"
//             onClick={() => navigate(-1)}
//           >
//             Cancel
//           </button>
//           <button 
//             type="submit" 
//             className="btn btn-primary"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? 'Updating...' : 'Update Problem'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AdminUpdate;



import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ic = {
  home:    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  chevR:   <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>,
  shield:  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>,
  list:    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>,
  edit:    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
  plus:    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>,
  trash:   <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
  code:    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
  eye:     <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>,
  lock:    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
  check:   <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>,
  warn:    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>,
  spin:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/></svg>,
  tag:     <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>,
};

// Lang colors
const LANG_STYLES = {
  'C++':        { dot: '#00b4d8', label: 'CPP',  glow: 'rgba(0,180,216,.3)'  },
  'Java':       { dot: '#f77f00', label: 'JAVA', glow: 'rgba(247,127,0,.3)'  },
  'JavaScript': { dot: '#ffd166', label: 'JS',   glow: 'rgba(255,209,102,.3)' },
};

const DIFF_STYLES = {
  easy:   { color: '#34d399', bg: 'rgba(52,211,153,.08)',   border: 'rgba(52,211,153,.25)'  },
  medium: { color: '#fbbf24', bg: 'rgba(251,191,36,.08)',   border: 'rgba(251,191,36,.25)'  },
  hard:   { color: '#f87171', bg: 'rgba(248,113,113,.08)',  border: 'rgba(248,113,113,.25)' },
};

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(z.object({ input: z.string().min(1), output: z.string().min(1), explanation: z.string().min(1) })).min(1),
  hiddenTestCases:  z.array(z.object({ input: z.string().min(1), output: z.string().min(1) })).min(1),
  startCode: z.array(z.object({ language: z.enum(['C++', 'Java', 'JavaScript']), initialCode: z.string().min(1) })).length(3),
  referenceSolution: z.array(z.object({ language: z.enum(['C++', 'Java', 'JavaScript']), completeCode: z.string().min(1) })).length(3),
});

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeader({ icon, label, idx, accent = '#fbbf24' }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}30`, boxShadow: `0 0 12px ${accent}20` }}
           className="w-8 h-8 rounded-[7px] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-mono text-[0.58rem] tracking-[1.5px] text-zinc-600 flex items-center gap-[5px] mb-0.5">
          <span className="w-[10px] h-px bg-current" /> SEC_{idx}
        </div>
        <div className="text-[0.88rem] font-bold tracking-[-0.2px] text-[#e8e8ea]">{label}</div>
      </div>
    </div>
  );
}

function StyledInput({ register, name, placeholder, error, className = '' }) {
  return (
    <div className="relative">
      <input
        {...register(name)}
        placeholder={placeholder}
        className={`w-full bg-[#111113] border rounded-[7px] px-3 py-2.5 text-[0.82rem] text-[#e8e8ea]
                    font-mono placeholder-zinc-700 outline-none transition-all duration-200
                    focus:border-amber-500/40 focus:shadow-[0_0_12px_rgba(251,191,36,.1)]
                    ${error ? 'border-red-500/50' : 'border-white/[0.08]'} ${className}`}
      />
      {error && <p className="text-red-400 font-mono text-[0.62rem] mt-1 ml-1">{error}</p>}
    </div>
  );
}

function StyledTextarea({ register, name, placeholder, error, rows = 4, mono = false }) {
  return (
    <div className="relative">
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={rows}
        spellCheck="false"
        className={`w-full bg-[#111113] border rounded-[7px] px-3 py-2.5 text-[0.82rem] text-[#e8e8ea]
                    placeholder-zinc-700 outline-none transition-all duration-200 resize-y leading-[1.7]
                    focus:border-amber-500/40 focus:shadow-[0_0_12px_rgba(251,191,36,.1)]
                    ${mono ? 'font-mono' : 'font-sans'}
                    ${error ? 'border-red-500/50' : 'border-white/[0.08]'}`}
      />
      {error && <p className="text-red-400 font-mono text-[0.62rem] mt-1 ml-1">{error}</p>}
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label className="flex items-center gap-1 font-mono text-[0.65rem] tracking-[0.8px] text-zinc-500 mb-1.5 uppercase">
      {children}
      {required && <span className="text-amber-500/70">*</span>}
    </label>
  );
}

function Card({ children, className = '', delay = '' }) {
  return (
    <div className={`bg-[#161618] border border-white/[0.07] rounded-[12px] p-6
                     hover:border-white/[0.1] transition-all duration-300 ${delay} ${className}`}
         style={{ animation: `fadeUp .45s ease both` }}>
      {children}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
function AdminUpdate() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeDiff, setActiveDiff] = useState('medium');

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '', description: '', difficulty: 'medium', tags: 'array',
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases:  [{ input: '', output: '' }],
      startCode: [
        { language: 'C++',        initialCode: '' },
        { language: 'Java',       initialCode: '' },
        { language: 'JavaScript', initialCode: '' },
      ],
      referenceSolution: [
        { language: 'C++',        completeCode: '' },
        { language: 'Java',       completeCode: '' },
        { language: 'JavaScript', completeCode: '' },
      ],
    },
  });

  const currentDiff = watch('difficulty');

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenFields,  append: appendHidden,  remove: removeHidden  } = useFieldArray({ control, name: 'hiddenTestCases'  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axiosClient.get(`/problem/problemById/${problemId}`);
        const order = ['C++', 'Java', 'JavaScript'];
        const sortedStart = order.map(lang => res.data.startCode.find(c => c.language === lang) || { language: lang, initialCode: '' });
        const sortedRef   = order.map(lang => res.data.referenceSolution.find(c => c.language === lang) || { language: lang, completeCode: '' });
        reset({ ...res.data, startCode: sortedStart, referenceSolution: sortedRef });
        setActiveDiff(res.data.difficulty || 'medium');
      } catch (err) {
        setError(`Failed to load: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };
    if (problemId) fetchProblem();
  }, [problemId, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosClient.put(`/problem/update/${problemId}`, data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(`Update failed: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111113] flex flex-col items-center justify-center gap-4">
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }`}</style>
        <div style={{ animation: 'spin 1s linear infinite' }} className="text-amber-400">{Ic.spin}</div>
        <p className="font-mono text-[0.7rem] text-zinc-600 tracking-[1.5px]">LOADING PROBLEM...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111113] text-[#e8e8ea]">
      <style>{`
        @keyframes fadeUp  { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes pulse2  { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
        .anim-fu   { animation: fadeUp .42s ease both; }
        .anim-fu-1 { animation: fadeUp .42s .07s ease both; }
        .anim-fu-2 { animation: fadeUp .42s .14s ease both; }
        .anim-fu-3 { animation: fadeUp .42s .21s ease both; }
        .anim-fu-4 { animation: fadeUp .42s .28s ease both; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 640px) { .field-row { grid-template-columns: 1fr; } }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 4px; }
        select option { background: #1c1c1f; color: #e8e8ea; }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="sticky top-0 z-50 h-12 flex items-center justify-between px-[18px]
                      bg-[#161618] border-b border-white/[0.07] flex-shrink-0">
        <div className="flex items-center gap-[10px]">
          <div className="flex gap-[5px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="w-px h-4 bg-white/[0.07]" />
          <div className="flex items-center gap-[5px] font-mono text-[0.72rem]">
            <NavLink to="/" className="flex items-center gap-1 text-zinc-600 no-underline hover:text-amber-400 transition-colors">
              {Ic.home} Home
            </NavLink>
            <span className="text-zinc-600">{Ic.chevR}</span>
            <NavLink to="/admin" className="text-zinc-600 no-underline hover:text-amber-400 transition-colors">Admin</NavLink>
            <span className="text-zinc-600">{Ic.chevR}</span>
            <span className="text-zinc-400 font-medium">Update Problem</span>
          </div>
        </div>
        <div className="flex items-center gap-[6px] font-mono text-[0.62rem]
                        px-[10px] py-[3px] rounded bg-amber-500/[0.08]
                        border border-amber-500/20 text-amber-400">
          <span className="w-[5px] h-[5px] rounded-full bg-amber-400
                           shadow-[0_0_6px_rgba(251,191,36,.7)]"
                style={{ animation: 'pulse2 2s ease infinite' }} />
          EDIT MODE
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="text-center px-6 pt-12 pb-8 anim-fu">
        <div className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[1.5px] text-zinc-600 mb-4
                        px-3 py-1.5 rounded bg-amber-500/[0.06] border border-amber-500/15">
          <span className="text-amber-400">{Ic.edit}</span>
          OP_02 — PATCH /api/problem/:id
        </div>
        <h1 className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-[-1.5px] leading-[1.05] mb-3 text-white">
          Update <em className="not-italic text-amber-400">Problem</em>
        </h1>
        <p className="font-mono text-[0.78rem] text-zinc-600 max-w-[380px] mx-auto leading-[1.7] tracking-[0.3px]">
          {problemId
            ? <>Editing <span className="text-amber-400/70 font-semibold">{problemId.slice(0,8)}…</span></>
            : 'Modify existing challenge details below.'}
        </p>
      </div>

      {/* ── ERROR / SUCCESS TOASTS ── */}
      <div className="max-w-[860px] w-full mx-auto px-5">
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-[8px] bg-red-500/[0.06] border border-red-500/25 mb-5 anim-fu">
            <span className="text-red-400 flex-shrink-0">{Ic.warn}</span>
            <span className="font-mono text-[0.75rem] text-red-300">{error}</span>
            <button onClick={() => setError('')} className="ml-auto text-zinc-600 hover:text-red-400 transition-colors font-mono text-xs">✕</button>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-[8px] bg-emerald-500/[0.06] border border-emerald-500/25 mb-5 anim-fu">
            <span className="text-emerald-400 flex-shrink-0">{Ic.check}</span>
            <span className="font-mono text-[0.75rem] text-emerald-300">Problem updated successfully!</span>
          </div>
        )}
      </div>

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[860px] w-full mx-auto px-5 pb-20 space-y-4">

        {/* ── BASIC INFO ── */}
        <div className="bg-[#161618] border border-white/[0.07] rounded-[12px] p-6 anim-fu-1
                        hover:border-amber-500/10 transition-all duration-300">
          <SectionHeader icon={Ic.tag} label="Basic Information" idx="01" accent="#fbbf24" />

          {/* Title */}
          <div className="mb-4">
            <Label required>Title</Label>
            <StyledInput register={register} name="title" placeholder="Problem title…"
                         error={errors.title?.message} />
          </div>

          {/* Difficulty + Tags row */}
          <div className="field-row mb-4">
            {/* Difficulty */}
            <div>
              <Label required>Difficulty</Label>
              <div className="flex gap-2">
                {['easy','medium','hard'].map(d => {
                  const s = DIFF_STYLES[d];
                  const active = currentDiff === d;
                  return (
                    <button key={d} type="button"
                      onClick={() => setValue('difficulty', d)}
                      style={active ? { color: s.color, background: s.bg, borderColor: s.border, boxShadow: `0 0 10px ${s.bg}` } : {}}
                      className={`flex-1 py-2 rounded-[7px] font-mono text-[0.67rem] font-semibold tracking-[0.8px] uppercase
                                  border transition-all duration-200
                                  ${active ? '' : 'text-zinc-600 border-white/[0.07] bg-transparent hover:border-white/[0.14]'}`}>
                      {d}
                    </button>
                  );
                })}
              </div>
              {/* hidden input for form */}
              <input type="hidden" {...register('difficulty')} />
            </div>

            {/* Tags */}
            <div>
              <Label required>Tag</Label>
              <select {...register('tags')}
                className="w-full bg-[#111113] border border-white/[0.08] rounded-[7px] px-3 py-2.5
                           text-[0.82rem] text-[#e8e8ea] font-mono outline-none transition-all duration-200
                           focus:border-amber-500/40 focus:shadow-[0_0_12px_rgba(251,191,36,.1)]
                           appearance-none cursor-pointer">
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">Dynamic Programming</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label required>Description</Label>
            <StyledTextarea register={register} name="description"
                            placeholder="Detailed problem description…" rows={6}
                            error={errors.description?.message} />
          </div>
        </div>

        {/* ── VISIBLE TEST CASES ── */}
        <div className="bg-[#161618] border border-white/[0.07] rounded-[12px] p-6 anim-fu-2
                        hover:border-amber-500/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader icon={Ic.eye} label="Visible Test Cases" idx="02" accent="#a78bfa" />
            <button type="button" onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
              className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.5px]
                         px-3 py-1.5 rounded-[6px] border border-violet-500/25 text-violet-400
                         bg-violet-500/[0.06] hover:bg-violet-500/[0.12] hover:border-violet-500/40
                         transition-all duration-200">
              {Ic.plus} ADD CASE
            </button>
          </div>

          <div className="space-y-4">
            {visibleFields.map((field, i) => (
              <div key={field.id}
                   className="border border-white/[0.06] rounded-[9px] p-4 bg-[#111113]/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[0.62rem] tracking-[1px] text-zinc-600">
                    CASE_{String(i+1).padStart(2,'0')}
                  </span>
                  <button type="button" onClick={() => removeVisible(i)}
                    disabled={visibleFields.length <= 1}
                    className="flex items-center gap-1 font-mono text-[0.62rem] text-zinc-700
                               hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    {Ic.trash} REMOVE
                  </button>
                </div>
                <div className="field-row mb-3">
                  <div>
                    <Label required>Input</Label>
                    <StyledInput register={register} name={`visibleTestCases.${i}.input`} placeholder="e.g. [1,2,3]"
                                 error={errors.visibleTestCases?.[i]?.input?.message} />
                  </div>
                  <div>
                    <Label required>Output</Label>
                    <StyledInput register={register} name={`visibleTestCases.${i}.output`} placeholder="e.g. 6"
                                 error={errors.visibleTestCases?.[i]?.output?.message} />
                  </div>
                </div>
                <div>
                  <Label required>Explanation</Label>
                  <StyledTextarea register={register} name={`visibleTestCases.${i}.explanation`}
                                  placeholder="Explain the logic…" rows={2}
                                  error={errors.visibleTestCases?.[i]?.explanation?.message} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HIDDEN TEST CASES ── */}
        <div className="bg-[#161618] border border-white/[0.07] rounded-[12px] p-6 anim-fu-2
                        hover:border-amber-500/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader icon={Ic.lock} label="Hidden Test Cases" idx="03" accent="#f87171" />
            <button type="button" onClick={() => appendHidden({ input: '', output: '' })}
              className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-[0.5px]
                         px-3 py-1.5 rounded-[6px] border border-red-500/25 text-red-400
                         bg-red-500/[0.06] hover:bg-red-500/[0.12] hover:border-red-500/40
                         transition-all duration-200">
              {Ic.plus} ADD CASE
            </button>
          </div>

          <div className="space-y-4">
            {hiddenFields.map((field, i) => (
              <div key={field.id}
                   className="border border-white/[0.06] rounded-[9px] p-4 bg-[#111113]/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[0.62rem] tracking-[1px] text-zinc-600">
                    HIDDEN_{String(i+1).padStart(2,'0')}
                  </span>
                  <button type="button" onClick={() => removeHidden(i)}
                    disabled={hiddenFields.length <= 1}
                    className="flex items-center gap-1 font-mono text-[0.62rem] text-zinc-700
                               hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    {Ic.trash} REMOVE
                  </button>
                </div>
                <div className="field-row">
                  <div>
                    <Label required>Input</Label>
                    <StyledInput register={register} name={`hiddenTestCases.${i}.input`} placeholder="e.g. [4,5,6]"
                                 error={errors.hiddenTestCases?.[i]?.input?.message} />
                  </div>
                  <div>
                    <Label required>Output</Label>
                    <StyledInput register={register} name={`hiddenTestCases.${i}.output`} placeholder="e.g. 15"
                                 error={errors.hiddenTestCases?.[i]?.output?.message} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CODE TEMPLATES ── */}
        <div className="bg-[#161618] border border-white/[0.07] rounded-[12px] p-6 anim-fu-3
                        hover:border-amber-500/10 transition-all duration-300">
          <SectionHeader icon={Ic.code} label="Code Templates" idx="04" accent="#00b4d8" />

          <div className="space-y-5">
            {['C++', 'Java', 'JavaScript'].map((lang, i) => {
              const ls = LANG_STYLES[lang];
              return (
                <div key={lang} className="border border-white/[0.06] rounded-[9px] overflow-hidden">
                  {/* Lang header strip */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111113]/80 border-b border-white/[0.06]">
                    <div style={{ background: ls.dot, boxShadow: `0 0 8px ${ls.glow}` }}
                         className="w-2 h-2 rounded-full flex-shrink-0" />
                    <span className="font-mono text-[0.65rem] font-bold tracking-[1px]" style={{ color: ls.dot }}>
                      {ls.label}
                    </span>
                    <span className="ml-auto font-mono text-[0.58rem] text-zinc-700">{lang}</span>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Start code */}
                    <div>
                      <Label required>Initial Code (Starter Template)</Label>
                      <div style={{ borderColor: `${ls.dot}18` }}
                           className="rounded-[7px] border bg-[#0e0e10] overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/[0.05]">
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700" />
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700" />
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700" />
                          <span className="ml-2 font-mono text-[0.58rem] text-zinc-700 tracking-[0.5px]">starter.{lang === 'C++' ? 'cpp' : lang === 'Java' ? 'java' : 'js'}</span>
                        </div>
                        <textarea
                          {...register(`startCode.${i}.initialCode`)}
                          rows={7}
                          spellCheck="false"
                          className="w-full bg-transparent font-mono text-[0.78rem] text-[#cdd6f4] leading-[1.7]
                                     px-4 py-3 outline-none resize-y placeholder-zinc-700"
                          placeholder={`// Write ${lang} starter template…`}
                        />
                      </div>
                      {errors.startCode?.[i]?.initialCode && (
                        <p className="text-red-400 font-mono text-[0.62rem] mt-1 ml-1">
                          {errors.startCode[i].initialCode.message}
                        </p>
                      )}
                    </div>

                    {/* Reference solution */}
                    <div>
                      <Label required>Reference Solution</Label>
                      <div style={{ borderColor: `${ls.dot}18` }}
                           className="rounded-[7px] border bg-[#0e0e10] overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/[0.05]">
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700" />
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700" />
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700" />
                          <span className="ml-2 font-mono text-[0.58rem] text-zinc-700 tracking-[0.5px]">solution.{lang === 'C++' ? 'cpp' : lang === 'Java' ? 'java' : 'js'}</span>
                        </div>
                        <textarea
                          {...register(`referenceSolution.${i}.completeCode`)}
                          rows={7}
                          spellCheck="false"
                          className="w-full bg-transparent font-mono text-[0.78rem] text-[#cdd6f4] leading-[1.7]
                                     px-4 py-3 outline-none resize-y placeholder-zinc-700"
                          placeholder={`// Write ${lang} reference solution…`}
                        />
                      </div>
                      {errors.referenceSolution?.[i]?.completeCode && (
                        <p className="text-red-400 font-mono text-[0.62rem] mt-1 ml-1">
                          {errors.referenceSolution[i].completeCode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ACTIONS ── */}
        <div className="flex items-center justify-between gap-4 anim-fu-4 pt-1">
          <div className="font-mono text-[0.62rem] text-zinc-700 tracking-[0.3px]">
            PATCH /api/problem/{problemId?.slice(0,8)}…
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-[7px] font-mono text-[0.75rem] font-semibold tracking-[0.5px]
                         text-zinc-500 border border-white/[0.07] bg-transparent
                         hover:text-zinc-300 hover:border-white/[0.15] transition-all duration-200">
              CANCEL
            </button>
            <button type="submit" disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-[7px] font-mono text-[0.75rem]
                         font-semibold tracking-[0.5px] transition-all duration-200
                         bg-amber-500/[0.12] border border-amber-500/35 text-amber-400
                         hover:bg-amber-500/[0.2] hover:border-amber-500/60
                         hover:shadow-[0_0_18px_rgba(251,191,36,.2)]
                         disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <>
                  <span style={{ animation: 'spin 1s linear infinite' }}>{Ic.spin}</span>
                  UPDATING…
                </>
              ) : (
                <>{Ic.edit} UPDATE PROBLEM</>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* ── STATUS BAR ── */}
      <div className="mt-auto h-[22px] flex items-center gap-4 px-4
                      bg-amber-500 font-mono text-[0.6rem] font-semibold
                      text-[#3d2000] tracking-[0.5px] flex-shrink-0">
        <span className="flex items-center gap-[6px] opacity-70">{Ic.shield}</span>
        <span>Admin Panel</span>
        <span className="flex items-center gap-[6px] opacity-70">{Ic.edit}</span>
        <span>Update Problem</span>
        <span className="ml-auto">DSA Deck</span>
      </div>
    </div>
  );
}

export default AdminUpdate;