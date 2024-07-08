import{k as N,r as u,u as k,j as e,U as f}from"./index-C8FnT1Uh.js";import{F as I}from"./Footer-DCM7NwJF.js";import{a as v}from"./axiosService-DVz0kc08.js";import{s as b}from"./toaster-DqQ00yAR.js";import{N as T}from"./navbar-CRTHrb3s.js";import"./index-BykXDHJr.js";import"./index-BZ5afw0P.js";import"./logo-NL4NpGi6.js";import"./axios-B6xwUs71.js";import"./index-VWaDGczM.js";import"./setnget-jfIHgayU.js";var S="https://js.stripe.com/v3",B=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,w="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",R=function(){for(var t=document.querySelectorAll('script[src^="'.concat(S,'"]')),n=0;n<t.length;n++){var s=t[n];if(B.test(s.src))return s}return null},y=function(t){var n="",s=document.createElement("script");s.src="".concat(S).concat(n);var a=document.head||document.body;if(!a)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return a.appendChild(s),s},A=function(t,n){!t||!t._registerWrapper||t._registerWrapper({name:"stripe-js",version:"3.4.0",startTime:n})},d=null,h=null,p=null,D=function(t){return function(){t(new Error("Failed to load Stripe.js"))}},M=function(t,n){return function(){window.Stripe?t(window.Stripe):n(new Error("Stripe.js not available"))}},$=function(t){return d!==null?d:(d=new Promise(function(n,s){if(typeof window>"u"||typeof document>"u"){n(null);return}if(window.Stripe&&t&&console.warn(w),window.Stripe){n(window.Stripe);return}try{var a=R();if(a&&t)console.warn(w);else if(!a)a=y(t);else if(a&&p!==null&&h!==null){var o;a.removeEventListener("load",p),a.removeEventListener("error",h),(o=a.parentNode)===null||o===void 0||o.removeChild(a),a=y(t)}p=M(n,s),h=D(s),a.addEventListener("load",p),a.addEventListener("error",h)}catch(c){s(c);return}}),d.catch(function(n){return d=null,Promise.reject(n)}))},F=function(t,n,s){if(t===null)return null;var a=t.apply(void 0,n);return A(a,s),a},m,P=!1,E=function(){return m||(m=$(null).catch(function(t){return m=null,Promise.reject(t)}),m)};Promise.resolve().then(function(){return E()}).catch(function(r){P||console.warn(r)});var G=function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];P=!0;var a=Date.now();return E().then(function(o){return F(o,n,a)})};const _=()=>{const r=N(l=>l.appointment),t=N(l=>l.UserSlice.id),[n,s]=u.useState(!1),[a,o]=u.useState(0),[c,j]=u.useState("Online"),W=k();u.useEffect(()=>{(async()=>{try{const i=await v.get(`${f}/fetchWallet/${t}`);o(i.data.getWallet.balance)}catch(i){console.error("Error fetching wallet balance:",i)}})()},[t]);const g=l=>{l==="Wallet"&&j("Wallet"),l==="Online"&&j("Online")},C=async()=>{try{const l=await G("pk_test_51PNFlRErRNTixaXa7HWJocG4C0lsQmsZXOzZTC4yyWEtGIOrOppfwZJmYal2MkDDEwIon7JYCScLd2Yvmg27GNLd00tnjhusoo"),i=await v.post(`${f}/appointments`,{...r,userId:t,paymentMethod:c});if(i.data.id){const x=await l;await(x==null?void 0:x.redirectToCheckout({sessionId:i.data.id}))}else b(i.data.message,"error")}catch(l){console.log("Error in creating order",l)}},O=async()=>{try{const l=await v.post(`${f}/walletPayment`,{...r,userId:t,paymentMethod:c});if(l.data.success){const i=l.data.createBooking._id;W(`/payment_status/${i}?success=true`)}else b(l.data.message,"error")}catch{console.log("error in wallet payment")}},L=()=>{s(!0)};return e.jsx("div",{className:"container mx-auto p-4",children:r&&e.jsxs("div",{className:"border p-4 rounded shadow-lg grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"text-sm text-gray-700 mb-4",children:[e.jsxs("div",{className:"border p-4 rounded mb-4",children:[e.jsx("img",{src:r.doctorImage,alt:"doctor image",className:"w-64 h-64 object-cover rounded-md mb-4"}),e.jsxs("h1",{className:"text-2xl font-bold mb-4",children:["Dr. ",r.doctorName]}),e.jsxs("p",{className:"text-xl",children:[e.jsx("strong",{children:"Amount:"})," $",r.fee]}),e.jsxs("p",{className:"text-xl",children:[e.jsx("strong",{children:"Date:"})," ",r.date]}),e.jsxs("p",{className:"text-xl",children:[e.jsx("strong",{children:"Time:"})," ",r.timeSlot]})]}),e.jsx("div",{className:"text-sm text-gray-900 mb-4",children:e.jsx("div",{className:"border p-4 rounded mb-4",children:e.jsxs("p",{className:"text-xl",children:[e.jsx("strong",{children:"Wallet Balance:"})," $",a||0]})})})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsxs("div",{className:"border p-4 rounded mb-4",children:[e.jsx("h2",{className:"text-xl font-bold mb-2",children:"Patients Details"}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx("div",{className:"flex flex-col",children:e.jsxs("h1",{children:["Patient Name  :  ",r.patientName]})}),e.jsx("div",{className:"flex flex-col",children:e.jsxs("h1",{children:["Patient Age  :  ",r.patientAge]})}),e.jsx("div",{className:"flex flex-col",children:e.jsxs("h1",{children:["Patient Number  :  ",r.patientNumber]})}),e.jsx("div",{className:"flex flex-col",children:e.jsxs("h1",{children:["Patient Problem  :  ",r.patientProblem]})})]})]}),e.jsxs("div",{className:"border p-4 rounded mb-4",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Payment"}),e.jsxs("div",{className:"p-2",children:[e.jsx("label",{className:"block mb-2 text-sm font-semibold text-gray-900",children:"Payment Method"}),e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"mb-2 flex items-center",children:[e.jsx("input",{className:"mr-2 h-5 w-5",type:"radio",name:"paymentMethod",id:"Online",value:"Online",defaultChecked:!0,onChange:()=>g("Online")}),e.jsx("label",{className:"hover:cursor-pointer",htmlFor:"Online",children:"Online"})]}),e.jsxs("div",{className:"mb-2 flex items-center",children:[e.jsx("input",{className:"mr-2 h-5 w-5",type:"radio",name:"paymentMethod",id:"Wallet",value:"Wallet",onChange:()=>g("Wallet")}),e.jsx("label",{className:"hover:cursor-pointer",htmlFor:"Wallet",children:"Wallet"})]}),e.jsx("div",{className:"text-right",children:e.jsx("button",{className:"bg-blue-500 text-white py-2 px-4 rounded",onClick:L,children:"Proceed to Payment"})})]}),n&&c==="Online"&&e.jsx("div",{className:"mt-4",children:e.jsx("button",{onClick:C,className:"bg-cyan-950 px-4 py-2 rounded-md shadow-md mt-4 ml-2",children:e.jsx("p",{className:"text-white",children:"Stripe Online Payment"})})}),n&&c==="Wallet"&&e.jsx("div",{className:"mt-4",children:e.jsx("button",{onClick:O,className:"bg-green-500 px-4 py-2 rounded-md shadow-md mt-4 ml-2",children:e.jsx("p",{className:"text-white",children:"Wallet Payment"})})})]})]})]})]})})};function ee(){return e.jsxs("div",{children:[e.jsx(T,{}),e.jsx(_,{}),e.jsx(I,{})]})}export{ee as default};
