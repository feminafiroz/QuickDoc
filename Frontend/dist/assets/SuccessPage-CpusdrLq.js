import{b as n,j as e,L as i,l,U as c}from"./index-C8FnT1Uh.js";import{N as d}from"./navbar-CRTHrb3s.js";import{a as p}from"./axiosService-DVz0kc08.js";import{F as x}from"./Footer-DCM7NwJF.js";import"./logo-NL4NpGi6.js";import"./toaster-DqQ00yAR.js";import"./setnget-jfIHgayU.js";import"./axios-B6xwUs71.js";import"./index-VWaDGczM.js";import"./index-BykXDHJr.js";import"./index-BZ5afw0P.js";const h=({isSuccess:t})=>{const{id:a}=n();return e.jsx("div",{className:"bg-gray-100  h-[75vh] flex justify-center items-center px-2",children:e.jsx("div",{className:`bg-white p-6 rounded-lg shadow-md ${t&&"px-10"}`,children:e.jsxs("div",{className:"text-center",children:[t?e.jsx("svg",{viewBox:"0 0 24 24",className:"text-green-600 w-16 h-16 mx-auto my-6 ",children:e.jsx("path",{fill:"currentColor",d:"M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"})}):e.jsx("div",{className:"w-16 h-16 mx-auto my-6",children:e.jsx("img",{src:"https://miro.medium.com/v2/resize:fit:810/1*OkeqV425CNZUQT2HSkTnJA.png",alt:"Payment failed image"})}),e.jsx("h3",{className:"md:text-2xl text-lg text-gray-900 font-semibold mb-2",children:t?"Booking Successfull":"Payment Failed!"}),e.jsx("p",{className:"text-gray-600 mb-4",children:t?e.jsxs(e.Fragment,{children:["Thank you for completing your payment.",e.jsx("br",{}),"You can cancel the appointment up to 1 hour before the scheduled time"]}):"Sorry, your payment was unsuccessful. Please try again later."}),e.jsx("p",{className:"text-gray-600 mb-8",children:t?"Have a great day!":"If the problem persists, please contact customer support."}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsx(i,{to:t?`/appoinmentDetails/${a}`:"/",className:`inline-block px-8 py-3 ${t?"bg-green-600 hover:bg-green-500":"bg-red-600 hover:bg-red-500"} text-white font-semibold rounded-lg shadow-md transition duration-300`,children:t?"View Booking":"GO BACK"})})]})})})},F=()=>{const[t]=l(),{id:a}=n(),r=t.get("success"),o=r==="true";if(r){const m=o?"Paid":"Failed";p.patch(c+`/payment/status/${a}`,{paymentStatus:m}).then(({data:s})=>console.log(s)).catch(s=>console.log(s))}return e.jsxs(e.Fragment,{children:[e.jsx(d,{}),e.jsx(h,{isSuccess:o}),e.jsx(x,{})]})};export{F as default};
