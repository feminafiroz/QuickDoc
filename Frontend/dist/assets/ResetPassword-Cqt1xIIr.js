import{u as l,b as m,j as s,U as i}from"./index-C8FnT1Uh.js";import{b as c}from"./validation-Chaci6--.js";import{a as n}from"./axios-B6xwUs71.js";import{s as o}from"./toaster-DqQ00yAR.js";import{u}from"./formik.esm-DplSx8st.js";import{i as p}from"./login_img_1-DGsDYkFd.js";const j=()=>{const a=l(),{id:t}=m(),e=u({initialValues:{password:"",confirmPassword:""},validate:c,onSubmit:({password:d})=>{n.post(i+`/reset_password/${t}`,{password:d}).then(({data:r})=>{o(r.message,"success"),a("/user/login")}).catch(({response:r})=>o(r.data.message,"error"))}});return s.jsx("div",{className:"flex items-center justify-center h-screen bg-cover bg-center",style:{backgroundImage:`url(${p})`},children:s.jsxs("div",{className:"max-w-md w-full bg-gray-100 bg-opacity-80 p-8 rounded-lg shadow-md",children:[s.jsx("h1",{className:"text-3xl font-bold mb-4 text-center text-black-400",children:"Reset Password"}),s.jsxs("form",{onSubmit:e.handleSubmit,children:[s.jsxs("div",{className:"mb-6",children:[s.jsx("label",{htmlFor:"password",className:"block text-lg font-medium text-black-400",children:"Password :"}),s.jsx("input",{type:"password",id:"password",className:" md:px-10 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-lg sm:text-lg border-gray-300 rounded-md py-2",...e.getFieldProps("password")}),!e.errors.password||e.touched.password&&s.jsx("p",{className:"text-red-500",children:e.errors.password})]}),s.jsxs("div",{className:"mb-6",children:[s.jsx("label",{htmlFor:"confirm-password",className:"block text-lg font-medium text-black-400",children:"Confirm Password :"}),s.jsx("input",{type:"password",id:"confirm-password",className:" md:px-10 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-lg sm:text-lg border-gray-300 rounded-md py-2",...e.getFieldProps("confirmPassword")}),!e.errors.confirmPassword||e.touched.confirmPassword&&s.jsx("p",{className:"text-red-500",children:e.errors.confirmPassword})]}),s.jsx("div",{className:"text-center",children:s.jsx("button",{type:"submit",className:"w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:outline-none focus:shadow-outline",children:"Reset Password"})})]})]})})};export{j as default};
