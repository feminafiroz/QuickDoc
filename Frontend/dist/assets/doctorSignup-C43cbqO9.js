import{r as a,u as j,D as N,j as e,L as y}from"./index-C8FnT1Uh.js";import{u as v}from"./formik.esm-DplSx8st.js";import{a as P}from"./axios-B6xwUs71.js";import{F as i,f as n,a as c}from"./index-DBZ1OT0-.js";import{L as S,d as k}from"./quickdoc-DXHcAqDF.js";import{s as d}from"./toaster-DqQ00yAR.js";import{v as E}from"./validation-Chaci6--.js";import"./index-BZ5afw0P.js";const F=()=>{const[m,l]=a.useState(!1),u=j(),[r,x]=a.useState(!1),[o,h]=a.useState(!1),s=v({initialValues:{name:"",email:"",phoneNumber:"",password:"",confirmPassword:""},validate:E,onSubmit:({name:p,phoneNumber:g,email:b,password:f})=>{l(!0),P.post(N+"/register",{doctorName:p,phoneNumber:g,email:b,password:f}).then(({data:t})=>{d(t.message,"success"),setTimeout(()=>{u("/doctor/login")},1e3)}).catch(({response:t})=>{const{message:w}=t.data;l(!1),d(w,"error")})}});return e.jsxs("section",{className:"flex flex-col md:flex-row h-screen items-center",children:[e.jsxs("div",{className:"relative flex-shrink-0 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen",children:[e.jsx("div",{className:"absolute inset-0 bg-green-700 opacity-25"}),e.jsxs("h1",{className:"absolute top-24 left-8 font-semibold text-4xl text-white leading-snug",children:["Streamline Your Schedule,",e.jsx("br",{}),"Empower Your Practice!",e.jsx("br",{}),"Be a part of ",e.jsx("br",{}),e.jsx("img",{src:S,alt:"Quick Doc Logo",className:"h-14 mr-2 inline-block"}),e.jsx("span",{className:"text-5xl",children:"QuickDoc Community"})]}),e.jsx("img",{src:k,alt:"advertisement table image",className:"w-full h-full object-cover"})]}),e.jsx("div",{className:"bg-white mb-20 w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center",children:e.jsxs("div",{className:"w-full h-100",children:[e.jsx("h1",{className:"text-xl md:text-2xl font-bold leading-tight mt-12",children:"Sign Up"}),e.jsxs("form",{className:"mt-6",onSubmit:s.handleSubmit,children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700",children:"Name"}),e.jsx("input",{type:"text",placeholder:"Enter Doctor name",className:"w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none",autoFocus:!0,...s.getFieldProps("name")}),s.errors.name&&s.touched.name&&e.jsx("div",{className:"text-red-500",children:s.errors.name})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700",children:"Email Address"}),e.jsx("input",{type:"text",placeholder:"Enter Email Address",className:"w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none",...s.getFieldProps("email")}),s.errors.email&&s.touched.email&&e.jsx("div",{className:"text-red-500",children:s.errors.email})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700",children:"PhoneNumber"}),e.jsx("input",{type:"text",placeholder:"Enter Phone number",className:"w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none",...s.getFieldProps("phoneNumber")}),s.errors.phoneNumber&&s.touched.phoneNumber&&e.jsx("div",{className:"text-red-500",children:s.errors.phoneNumber})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-700",children:"Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:r?"text":"password",placeholder:"Enter Password",className:"w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none",...s.getFieldProps("password")}),e.jsx("span",{className:"absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer",onClick:()=>x(!r),children:e.jsx(i,{icon:r?n:c,className:"text-gray-700"})})]}),s.errors.password&&s.touched.password&&e.jsx("div",{className:"text-red-500",children:s.errors.password})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"block text-gray-700",children:"Confirm Password"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:o?"text":"password",placeholder:"Confirm Password",className:"w-full px-3 py-2 rounded-lg bg-gray-100 mt-2 border focus:border-green-500 focus:bg-white focus:outline-none",...s.getFieldProps("confirmPassword")}),e.jsx("span",{className:"absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer",onClick:()=>h(!o),children:e.jsx(i,{icon:o?n:c,className:"text-gray-700"})})]}),s.errors.confirmPassword&&s.touched.confirmPassword&&e.jsx("div",{className:"text-red-500",children:s.errors.confirmPassword})]}),e.jsx("button",{type:"submit",className:"w-full block bg-green-600 hover:bg-green-500 transition duration-300 focus:bg-green-400 text-white font-semibold rounded-lg px-4 py-3 mt-6",disabled:m,children:"Sign Up"})]}),e.jsxs("p",{className:"mt-8",children:["Have an account?",e.jsx(y,{to:"/doctor/login",className:"text-blue-500 hover:text-blue-700 font-semibold",children:"Login"})]})]})})]})},Q=()=>e.jsx(F,{});export{Q as default};
