// src/pages/LandingPage.jsx
// import { Link } from "react-router-dom";
// import { Code, Trophy, Users, BarChart, ChevronRight, Shield } from 'lucide-react';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
//       {/* Navigation */}
//       <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
//         <div className="flex items-center gap-2">
//           <div className="bg-white rounded-lg p-2">
//             <Code className="text-indigo-600" size={32} />
//           </div>
//           <h1 className="text-3xl font-bold text-white">LeetClone</h1>
//         </div>
//         <div className="flex gap-4">
//           <Link to="/login" className="btn btn-ghost text-white hover:bg-white/20">
//             Sign In
//           </Link>
//           <Link to="/signup" className="btn btn-primary text-white">
//             Sign Up
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
//         <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
//           <span className="text-white font-semibold">New! Practice interviews with AI</span>
//         </div>
//         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
//           Master Coding Interviews with <span className="text-yellow-300">LeetClone</span>
//         </h1>
//         <p className="text-xl text-white/90 mb-10 max-w-3xl">
//           Join over 20 million developers in practicing coding skills, preparing for interviews, 
//           and getting hired at top tech companies.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link 
//             to="/signup" 
//             className="btn btn-primary btn-lg text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
//           >
//             Get Started
//             <ChevronRight className="ml-2" />
//           </Link>
//           <button className="btn btn-outline btn-lg text-white text-xl px-8 py-4 rounded-full border-white hover:bg-white/10">
//             Watch Demo
//           </button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="py-20 px-4 bg-white/10 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold text-white text-center mb-16">Why LeetClone?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
//                 <div className="bg-indigo-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
//                 <p className="text-white/80 mb-6">{feature.description}</p>
//                 <div className="flex items-center gap-2 text-indigo-300">
//                   <ChevronRight size={20} />
//                   <span>Learn more</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
//                 <div className="text-white/70">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Testimonials */}
//       <div className="py-20 px-4 bg-white/10 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-bold text-white text-center mb-16">Success Stories</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
//                   <div>
//                     <div className="font-bold text-white">{testimonial.name}</div>
//                     <div className="text-white/70">{testimonial.role}</div>
//                   </div>
//                 </div>
//                 <p className="text-white/80 italic mb-6">"{testimonial.quote}"</p>
//                 <div className="flex gap-1 text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 px-4">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold text-white mb-6">Ready to master coding interviews?</h2>
//           <p className="text-xl text-white/80 mb-10">
//             Join thousands of developers who've landed jobs at top tech companies after practicing with LeetClone.
//           </p>
//           <Link 
//             to="/signup" 
//             className="btn btn-primary btn-lg text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
//           >
//             Start Your Journey Today
//           </Link>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="py-10 px-4 border-t border-white/10">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-2 mb-6 md:mb-0">
//               <div className="bg-white rounded-lg p-2">
//                 <Code className="text-indigo-600" size={28} />
//               </div>
//               <h2 className="text-2xl font-bold text-white">LeetClone</h2>
//             </div>
//             <div className="flex gap-6 text-white/70">
//               <a href="#" className="hover:text-white">Terms</a>
//               <a href="#" className="hover:text-white">Privacy</a>
//               <a href="#" className="hover:text-white">Contact</a>
//             </div>
//           </div>
//           <div className="mt-10 text-center text-white/50">
//             © 2023 LeetClone. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const features = [
//   {
//     icon: <Code size={28} className="text-white" />,
//     title: "Real Interview Questions",
//     description: "Access 2,000+ authentic interview questions from top tech companies like Google, Amazon, and Meta."
//   },
//   {
//     icon: <Trophy size={28} className="text-white" />,
//     title: "Track Your Progress",
//     description: "Monitor your improvement with detailed statistics and personalized recommendations."
//   },
//   {
//     icon: <Users size={28} className="text-white" />,
//     title: "Community Support",
//     description: "Join discussions, share solutions, and get feedback from our developer community."
//   }
// ];

// const stats = [
//   { value: "20M+", label: "Active Users" },
//   { value: "2K+", label: "Coding Problems" },
//   { value: "100+", label: "Company Interviews" },
//   { value: "85%", label: "Success Rate" }
// ];

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Software Engineer at Google",
//     quote: "LeetClone helped me land my dream job at Google. The problems are challenging and realistic."
//   },
//   {
//     name: "Michael Chen",
//     role: "Frontend Developer at Meta",
//     quote: "The platform's interface is intuitive, and the community discussions were invaluable during my preparation."
//   },
//   {
//     name: "Alex Rodriguez",
//     role: "Backend Engineer at Amazon",
//     quote: "I went from struggling with basic algorithms to solving hard problems in just 3 months. Highly recommended!"
//   }
// ];

// export default LandingPage;


// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import { Code, Trophy, Users, BarChart, ChevronRight, Shield, Terminal, BookOpen } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-lg p-2">
            <Code className="text-indigo-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white">DSA Deck</h1>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-ghost text-white hover:bg-white/20">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-primary text-white">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
          <span className="text-white font-semibold">New! Practice interviews with AI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
          Master Coding Interviews with <span className="text-yellow-300">DSA Deck</span>
        </h1>
        <p className="text-xl text-white/90 mb-10 max-w-3xl">
          Join developers worldwide in practicing coding skills, preparing for interviews, 
          and getting hired at top tech companies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/signup" 
            className="btn btn-primary btn-lg text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
            <ChevronRight className="ml-2" />
          </Link>
          
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose LeetClone?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
              <div className="bg-indigo-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Terminal size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real Interview Questions</h3>
              <p className="text-white/80 mb-6">
                Access authentic interview questions from top tech companies like Google, Amazon, and Meta.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
              <div className="bg-indigo-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BookOpen size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Learning</h3>
              <p className="text-white/80 mb-6">
                Detailed editorial solutions and video explanations to help you master each concept.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all">
              <div className="bg-indigo-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Assistance</h3>
              <p className="text-white/80 mb-6">
                Get instant help from our AI tutor when you're stuck on a problem.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Showcase */}
      {/* <div className="py-20 px-4 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="bg-gray-800 border-2 border-dashed rounded-xl w-full h-96" />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-white mb-6">Powerful Coding Environment</h2>
              <p className="text-white/80 mb-6 text-lg">
                Our integrated coding environment supports multiple languages with real-time feedback and debugging tools.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/90">
                  <div className="bg-indigo-500 rounded-full p-1">
                    <ChevronRight size={16} className="text-white" />
                  </div>
                  <span>Code highlighting and auto-completion</span>
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <div className="bg-indigo-500 rounded-full p-1">
                    <ChevronRight size={16} className="text-white" />
                  </div>
                  <span>Custom test cases and debugging tools</span>
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <div className="bg-indigo-500 rounded-full p-1">
                    <ChevronRight size={16} className="text-white" />
                  </div>
                  <span>Performance analysis with runtime and memory metrics</span>
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <div className="bg-indigo-500 rounded-full p-1">
                    <ChevronRight size={16} className="text-white" />
                  </div>
                  <span>Submission history and progress tracking</span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      {/* <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to master coding interviews?</h2>
          <p className="text-xl text-white/80 mb-10">
            Start your journey today with our comprehensive coding platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="btn btn-primary btn-lg text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Create Free Account
            </Link>
            <Link 
              to="/login" 
              className="btn btn-outline btn-lg text-white text-xl px-8 py-4 rounded-full border-white hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-white rounded-lg p-2">
                <Code className="text-indigo-600" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-white">DSA Deck</h2>
            </div>
            <div className="flex gap-6 text-white/70">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-10 text-center text-white/50">
            © 2025 DSA Deck. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;