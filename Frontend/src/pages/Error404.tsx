
// import { useNavigate } from "react-router-dom";


// function NotFoundPage() {
//   const navigate = useNavigate();

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-green-700 bg-fixed bg-cover bg-bottom error-bg">
//             <div className="container">
//                 <div className="row pb-1">
//                     <div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
//                         <div className="relative">
//                             <h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
//                                 <span>4</span><span>0</span><span>4</span>
//                             </h1>
//                             <span className="absolute top-0 -ml-12 text-white font-semibold">Oops!</span>
//                         </div>
//                         <h5 className="text-white font-semibold -mr-10 -mt-3">Page not found</h5>
//                         <p className="text-white mt-2 mb-6">We are sorry, but the page you requested was not found</p>
                        
//                     </div>
//                 </div>
                
//                 <center className="mt-6">
//         <a
//           href="#"
//           className="text-gray-700 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
//           onClick={() => navigate(-1)}
//         >
//           Go back
//         </a>
//       </center>
//             </div>
//         </div>
//     );
// }

// export default NotFoundPage;


import Image from "../assets/images/image.webp";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] bg-white items-center flex justify-center px-5 lg:px-0">
      <div className="w-[415px] text-center flex-col items-center justify-center mx-auto gap-[100px]">
        <div className="mb-8 md:mb-[56px]">
          <div className="max-w-[312px] w-full h-[160px] relative flex justify-center items-center mx-auto">
            <img src={Image}  alt="404" />
          </div>
        </div>
        <div>
          <h3 className="text-4xl md:text-[56px] leading-[64px] text-[#1A1C16]">
            Page Not Found
          </h3>
        </div>
        <div className="flex flex-col gap-6 mt-3">
          <div className="text-center">
            <p className="text-base leading-6 tracking-wider font-sans">
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
          </div>
          <div>
            <button 
            onClick={() => navigate(-1)}
            className="bg-[#8AC732] text-white font-sans max-w-[146px] w-full h-[48px] rounded-[100px] font-medium text-sm">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
