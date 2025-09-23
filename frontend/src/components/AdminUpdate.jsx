// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useNavigate, useParams } from 'react-router';
// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient';

// // Reuse same schema
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
// //   const { id } = useParams();
//   let {problemId}  = useParams();
 
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       visibleTestCases: [],
//       hiddenTestCases: [],
//       startCode: [],
//       referenceSolution: [],
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

// //   useEffect(() => {
// //     const fetchProblem = async () => {
// //       try {
// //         const res = await axiosClient.get(`/problem/problemById/${problemId}`);
// //         reset(res.data); // This pre-fills the form
// //       } catch (error) {
// //         alert('Failed to fetch problem data.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProblem();
// //   }, [problemId, reset]);
    
//   // AdminUpdate.jsx
// // useEffect(() => {
// //     const fetchProblem = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axiosClient.get(`/problem/problemById/${problemId}`);
// //         reset(res.data);
// //       } catch (error) {
// //         console.error('Fetch error:', error);
// //         alert(`Failed to fetch problem: ${error.response?.data?.message || error.message}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (problemId) fetchProblem(); // Only fetch if problemId exists
// //   }, [problemId, reset]);

// //   console.log(fetchProblem);


// // useEffect(() => {
// //     const fetchProblem = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axiosClient.get(`/problem/problemById/${problemId}`);
        
// //         // Ensure the arrays are in the correct order: C++, Java, JavaScript
// //         const orderedData = {
// //           ...res.data,
// //           startCode: sortByLanguage(res.data.startCode),
// //           referenceSolution: sortByLanguage(res.data.referenceSolution)
// //         };
        
// //         reset(orderedData);
// //       } catch (error) {
// //         console.error('Fetch error:', error);
// //         alert(`Failed to fetch problem: ${error.response?.data?.message || error.message}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     if (problemId) fetchProblem();
// //   }, [problemId, reset]);
  
// //   // Helper function to sort code arrays by language
// //   const sortByLanguage = (items) => {
// //     const languageOrder = ['C++', 'Java', 'JavaScript'];
// //     return items.sort((a, b) => {
// //       return languageOrder.indexOf(a.language) - languageOrder.indexOf(b.language);
// //     });
// //   };

// // ****************************************
// // ... existing imports and schema ...

//     // ... useForm and useFieldArray declarations ...
  
//     useEffect(() => {
//       const fetchProblem = async () => {
//         try {
//           setLoading(true);
//           const res = await axiosClient.get(`/problem/problemById/${problemId}`);
          
//           // Ensure the arrays are in the correct order: C++, Java, JavaScript
//           const orderedData = {
//             ...res.data,
//             startCode: sortByLanguage(res.data.startCode),
//             referenceSolution: sortByLanguage(res.data.referenceSolution)
//           };
          
//           reset(orderedData);
//         } catch (error) {
//           console.error('Fetch error:', error);
//           alert(`Failed to fetch problem: ${error.response?.data?.message || error.message}`);
//         } finally {
//           setLoading(false);
//         }
//       };
      
//       if (problemId) fetchProblem();
//     }, [problemId, reset]);
    
//     // Helper function to sort code arrays by language
//     const sortByLanguage = (items) => {
//       const languageOrder = ['C++', 'Java', 'JavaScript'];
      
//       // Create a new array with all languages
//       const result = languageOrder.map(lang => {
//         const existing = items.find(item => item.language === lang);
//         return existing || { language: lang, initialCode: '', completeCode: '' };
//       });
      
//       return result;
//     };
  
//     const onSubmit = async (data) => {
//       try {
//         // Transform data to match backend structure
//         const backendData = {
//           ...data,
//           startCode: data.startCode.map(item => ({
//             language: item.language,
//             initialCode: item.initialCode
//           })),
//           referenceSolution: data.referenceSolution.map(item => ({
//             language: item.language,
//             completeCode: item.completeCode
//           }))
//         };
  
//         await axiosClient.put(`/problem/update/${problemId}`, backendData);
//         alert('Problem updated successfully!');
//         navigate('/');
//       } catch (error) {
//         console.error('Update error:', error);
//         alert(`Update failed: ${error.response?.data?.message || error.message}`);
//       }
//     };
  
//     // ... rest of the component ...
  

  












// //   const onSubmit = async (data) => {
// //     try {
// //     //   await axiosClient.put(`/problem/update/${id}`, data);
// //       await axiosClient.put(`/problem/update/${problemId}`, data);
// //       alert('Problem updated successfully!');
// //       navigate('/');
// //     } catch (error) {
// //       alert(`Update failed: ${error.response?.data?.message || error.message}`);
// //     }
// //   };
// //   console.log(onSubmit);
















//   if (loading) {
//     return <div className="text-center p-6">Loading problem...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Update Problem</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register('tags')}
//                   className={`select select-bordered ${errors.tags && 'select-error'}`}
//                 >
//                   <option value="array">Array</option>
//                   <option value="linkedList">Linked List</option>
//                   <option value="graph">Graph</option>
//                   <option value="dp">DP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <input
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <input
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
//                 </h3>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <button type="submit" className="btn btn-warning w-full">
//           Update Problem
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminUpdate;






// **********aditya"""""
// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useNavigate, useParams } from 'react-router';
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
//   let {problemId}  = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       visibleTestCases: [],
//       hiddenTestCases: [],
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'Java', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' }
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'Java', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' }
//       ]
//     }
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
//         setLoading(true);
//         const res = await axiosClient.get(`/problem/problemById/${problemId}`);
//         reset(res.data);
//       } catch (error) {
//         console.error('Fetch error:', error);
//         alert(`Failed to fetch problem: ${error.response?.data?.message || error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (problemId) fetchProblem();
//   }, [problemId, reset]);

//   const onSubmit = async (data) => {
//     try {
//       // Transform data to match backend structure
//       const backendData = {
//         ...data,
//         startCode: data.startCode.map(item => ({
//           language: item.language,
//           initialCode: item.initialCode
//         })),
//         referenceSolution: data.referenceSolution.map(item => ({
//           language: item.language,
//           completeCode: item.completeCode
//         }))
//       };

//       await axiosClient.put(`/problem/update/${problemId}`, backendData);
//       alert('Problem updated successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Update error:', error);
//       alert(`Update failed: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   if (loading) {
//     return <div className="text-center p-6">Loading problem...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Update Problem</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register('tags')}
//                   className={`select select-bordered ${errors.tags && 'select-error'}`}
//                 >
//                   <option value="array">Array</option>
//                   <option value="linkedList">Linked List</option>
//                   <option value="graph">Graph</option>
//                   <option value="dp">DP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <input
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <input
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
//                 </h3>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                   {errors.startCode?.[index]?.initialCode && (
//                     <span className="text-error">Initial code is required</span>
//                   )}
//                 </div>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                   {errors.referenceSolution?.[index]?.completeCode && (
//                     <span className="text-error">Reference solution is required</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <button type="submit" className="btn btn-warning w-full">
//           Update Problem
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminUpdate;






// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useNavigate, useParams } from 'react-router';
// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient';

// // Reuse same schema
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//       explanation: z.string().min(1, 'Explanation is required'),
//     })
//   ).min(1, 'At least one visible test case required'),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//     })
//   ).min(1, 'At least one hidden test case required'),
//   startCode: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       initialCode: z.string().min(1, 'Initial code is required'),
//     })
//   ).length(3, 'All three languages required'),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       completeCode: z.string().min(1, 'Complete code is required'),
//     })
//   ).length(3, 'All three languages required'),
// });

// function AdminUpdate() {
//   let {problemId}  = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       visibleTestCases: [],
//       hiddenTestCases: [],
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'Java', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' }
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'Java', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' }
//       ]
//     }
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
//         setLoading(true);
//         const res = await axiosClient.get(`/problem/problemById/${problemId}`);
//         reset(res.data);
//       } catch (error) {
//         alert(`Failed to fetch problem: ${error.response?.data?.message || error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (problemId) fetchProblem();
//   }, [problemId, reset]);

//   const onSubmit = async (data) => {
//     try {
//       // Transform data to match backend structure
//       const backendData = {
//         ...data,
//         startCode: data.startCode.map(item => ({
//           language: item.language,
//           initialCode: item.initialCode
//         })),
//         referenceSolution: data.referenceSolution.map(item => ({
//           language: item.language,
//           completeCode: item.completeCode
//         }))
//       };

//       await axiosClient.put(`/problem/update/${problemId}`, backendData);
//       alert('Problem updated successfully!');
//       navigate('/admin');
//     } catch (error) {
//       alert(`Update failed: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   if (loading) {
//     return <div className="text-center p-6">Loading problem...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Update Problem</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//                 {errors.difficulty && (
//                   <span className="text-error">{errors.difficulty.message}</span>
//                 )}
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register('tags')}
//                   className={`select select-bordered ${errors.tags && 'select-error'}`}
//                 >
//                   <option value="array">Array</option>
//                   <option value="linkedList">Linked List</option>
//                   <option value="graph">Graph</option>
//                   <option value="dp">DP</option>
//                 </select>
//                 {errors.tags && (
//                   <span className="text-error">{errors.tags.message}</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
//             {errors.visibleTestCases && (
//               <span className="text-error">{errors.visibleTestCases.message}</span>
//             )}
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 {errors.visibleTestCases?.[index]?.input && (
//                   <span className="text-error">Input is required</span>
//                 )}
//                 <input
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 {errors.visibleTestCases?.[index]?.output && (
//                   <span className="text-error">Output is required</span>
//                 )}
//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
                
//                 {errors.visibleTestCases?.[index]?.explanation && (
//                   <span className="text-error">Explanation is required</span>
//                 )}
//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
//             {errors.hiddenTestCases && (
//               <span className="text-error">{errors.hiddenTestCases.message}</span>
//             )}
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 {errors.hiddenTestCases?.[index]?.input && (
//                   <span className="text-error">Input is required</span>
//                 )}
//                 <input
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 {errors.hiddenTestCases?.[index]?.output && (
//                   <span className="text-error">Output is required</span>
//                 )}
//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
//           {errors.startCode && (
//             <span className="text-error">{errors.startCode.message}</span>
//           )}
//           {errors.referenceSolution && (
//             <span className="text-error">{errors.referenceSolution.message}</span>
//           )}
//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
//                 </h3>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                   {errors.startCode?.[index]?.initialCode && (
//                     <span className="text-error">Initial code is required</span>
//                   )}
//                 </div>
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                   {errors.referenceSolution?.[index]?.completeCode && (
//                     <span className="text-error">Reference solution is required</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <button 
//           type="submit" 
//           className="btn btn-warning w-full"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Updating...' : 'Update Problem'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminUpdate;





import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
      explanation: z.string().min(1),
    })
  ).min(1),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1),
      output: z.string().min(1),
    })
  ).min(1),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1),
    })
  ).length(3),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1),
    })
  ).length(3),
});

function AdminUpdate() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'medium',
      tags: 'array',
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: [{ input: '', output: '' }],
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' },
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' },
      ],
    },
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({
    control,
    name: 'visibleTestCases',
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({
    control,
    name: 'hiddenTestCases',
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axiosClient.get(`/problem/problemById/${problemId}`);
        
        // Sort code arrays to ensure consistent order
        const languageOrder = ['C++', 'Java', 'JavaScript'];
        const sortedStartCode = languageOrder.map(lang => 
          res.data.startCode.find(code => code.language === lang) || 
          { language: lang, initialCode: '' }
        );
        
        const sortedRefSolution = languageOrder.map(lang => 
          res.data.referenceSolution.find(code => code.language === lang) || 
          { language: lang, completeCode: '' }
        );

        reset({
          ...res.data,
          startCode: sortedStartCode,
          referenceSolution: sortedRefSolution
        });
      } catch (err) {
        setError(`Failed to load problem: ${err.response?.data?.message || err.message}`);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (problemId) fetchProblem();
  }, [problemId, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosClient.put(`/problem/update/${problemId}`, data);
      alert('Problem updated successfully!');
      // navigate('/admin/problems');
    } catch (err) {
      setError(`Update failed: ${err.response?.data?.message || err.message}`);
      console.error('Submission error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading problem...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Update Problem</h1>
      
      {error && (
        <div className="alert alert-error mb-6">
          <div className="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                 className="w-6 h-6 mx-2 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
            </svg>
            <label>{error}</label>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title*</span>
              </label>
              <input
                {...register('title')}
                className={`input input-bordered ${errors.title && 'input-error'}`}
                placeholder="Problem title"
              />
              {errors.title && (
                <span className="text-error text-sm mt-1">{errors.title.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tags*</span>
              </label>
              <select
                {...register('tags')}
                className={`select select-bordered w-full ${errors.tags && 'select-error'}`}
              >
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">Dynamic Programming</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Difficulty*</span>
              </label>
              <select
                {...register('difficulty')}
                className={`select select-bordered w-full ${errors.difficulty && 'select-error'}`}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Description*</span>
            </label>
            <textarea
              {...register('description')}
              className={`textarea textarea-bordered h-48 ${errors.description && 'textarea-error'}`}
              placeholder="Detailed problem description"
            />
            {errors.description && (
              <span className="text-error text-sm mt-1">{errors.description.message}</span>
            )}
          </div>
        </div>

        {/* Test Cases Section */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
          {/* Visible Test Cases */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg">Visible Test Cases*</h3>
              <button
                type="button"
                onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                className="btn btn-sm btn-primary"
              >
                + Add Case
              </button>
            </div>
            
            <div className="space-y-4">
              {visibleFields.map((field, index) => (
                <div key={field.id} className="border border-base-300 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Case {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeVisible(index)}
                      className="btn btn-xs btn-error"
                      disabled={visibleFields.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Input*</span>
                      </label>
                      <input
                        {...register(`visibleTestCases.${index}.input`)}
                        className="input input-bordered"
                        placeholder="e.g. [1,2,3]"
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Output*</span>
                      </label>
                      <input
                        {...register(`visibleTestCases.${index}.output`)}
                        className="input input-bordered"
                        placeholder="e.g. 6"
                      />
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Explanation*</span>
                    </label>
                    <textarea
                      {...register(`visibleTestCases.${index}.explanation`)}
                      className="textarea textarea-bordered"
                      placeholder="Explanation for the test case"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hidden Test Cases */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg">Hidden Test Cases*</h3>
              <button
                type="button"
                onClick={() => appendHidden({ input: '', output: '' })}
                className="btn btn-sm btn-primary"
              >
                + Add Case
              </button>
            </div>
            
            <div className="space-y-4">
              {hiddenFields.map((field, index) => (
                <div key={field.id} className="border border-base-300 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Case {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeHidden(index)}
                      className="btn btn-xs btn-error"
                      disabled={hiddenFields.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Input*</span>
                      </label>
                      <input
                        {...register(`hiddenTestCases.${index}.input`)}
                        className="input input-bordered"
                        placeholder="e.g. [4,5,6]"
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Output*</span>
                      </label>
                      <input
                        {...register(`hiddenTestCases.${index}.output`)}
                        className="input input-bordered"
                        placeholder="e.g. 15"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Templates Section */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
          <div className="space-y-8">
            {['C++', 'Java', 'JavaScript'].map((lang, index) => {
              const langKey = lang.toLowerCase().replace('+', 'pp');
              return (
                <div key={lang} className="border border-base-300 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-4">{lang} Template</h3>
                  
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Initial Code*</span>
                    </label>
                    <div className="bg-base-200 p-3 rounded-lg">
                      <textarea
                        {...register(`startCode.${index}.initialCode`)}
                        className="w-full bg-transparent font-mono text-sm"
                        rows={8}
                        spellCheck="false"
                      />
                    </div>
                    {errors.startCode?.[index]?.initialCode && (
                      <span className="text-error text-sm mt-1">
                        {errors.startCode[index].initialCode.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Reference Solution*</span>
                    </label>
                    <div className="bg-base-200 p-3 rounded-lg">
                      <textarea
                        {...register(`referenceSolution.${index}.completeCode`)}
                        className="w-full bg-transparent font-mono text-sm"
                        rows={8}
                        spellCheck="false"
                      />
                    </div>
                    {errors.referenceSolution?.[index]?.completeCode && (
                      <span className="text-error text-sm mt-1">
                        {errors.referenceSolution[index].completeCode.message}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button 
            type="button" 
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Problem'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUpdate;