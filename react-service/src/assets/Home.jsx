import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
 <div className="bg-gray-100 min-h-screen">
      <Navbar />

         {/* Add padding because navbar is fixed */}
         <div className="pt-18">

     {/* HERO */}
           <header className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 pt-40 pb-20 text-center">
             <h2 className="text-5xl font-bold">
               Effortless Summaries for Any Document
             </h2>
             <p className="text-xl mt-4">
               Convert lengthy content into accurate summaries instantly
             </p>

             <div className="mt-10 space-x-6">
               <button
                 onClick={() => navigate("/auth")}
                 className="bg-blue-900 text-white px-8 py-3 rounded-lg"
               >
                 Start Summarizing
               </button>

               <button
                 onClick={() => setShowModal(true)}
                 className="border-2 border-blue-900 px-8 py-3 rounded-lg"
               >
                 How It Works
               </button>
             </div>
           </header>

  {/* MODAL */}
       {showModal && (
         <div
           className="fixed inset-0 bg-black/50 flex justify-center items-center"
           onClick={() => setShowModal(false)}
         >
           <div
             className="bg-gradient-to-br from-yellow-300 to-blue-500 p-6 rounded-lg w-96"
             onClick={(e) => e.stopPropagation()}
           >
             <h2 className="text-xl font-bold mb-4">How It Works</h2>
             <ol className="list-decimal list-inside space-y-2">
               <li>Login or register to access the tool.</li>
               <li>Upload a document (PDF or TXT).</li>
               <li>Click the summarize button.</li>
               <li>Get a concise summary instantly.</li>
             </ol>
             <button
               onClick={() => setShowModal(false)}
               className="mt-4 bg-white px-4 py-2 rounded"
             >
               Close
             </button>
           </div>
         </div>
       )}

       {/* FEATURES */}
      <section className="bg-gradient-to-r from-teal-200 to-blue-400 py-16 mt-10 text-center">
         <h1 className="text-3xl font-bold mb-10">Key Features</h1>

         <div className="flex justify-center gap-8 px-10">
           <div className="bg-blue-100 p-6 rounded-lg w-80">
             <h3 className="font-bold">Automatic Summarization</h3>
             <p>AI powered summaries from long documents.</p>
           </div>

           <div className="bg-green-100 p-6 rounded-lg w-80">
             <h3 className="font-bold">Custom Length</h3>
             <p>Control summary depth easily.</p>
           </div>

           <div className="bg-emerald-100 p-6 rounded-lg w-80">
             <h3 className="font-bold">Multiple Formats</h3>
             <p>Supports PDF and TXT files.</p>
           </div>
         </div>
       </section>

       {/* FOOTER */}
       <footer className="bg-white border-t mt-16 py-6 text-center">
         © 2025 Summarization Tool. All rights reserved.
       </footer>
</div>
     </div>
  );
}

export default Home;