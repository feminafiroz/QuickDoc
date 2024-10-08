import{r as c,j as e,U as D,m as $,q as S,C as v}from"./index-FtoaIzxn.js";import{a as u}from"./axiosService-Bk3JA0V8.js";import{f as T}from"./index-BojVbZw0.js";import{N as C}from"./navbar--kMTgj1R.js";import{a as R}from"./index-Bvt82b2g.js";import"./axios-B6xwUs71.js";import"./index-VWaDGczM.js";import"./toaster-DOicKWBQ.js";import"./setnget-jfIHgayU.js";import"./logo-NL4NpGi6.js";import"./iconBase-CbxJS-00.js";const P=({conversation:a,lastMessage:g})=>{const[m,t]=c.useState({});return c.useEffect(()=>{(async()=>{try{const f=a.members[1],h=await u.get(`${D}/doctor/${f}`);t(h.data.doctor)}catch(f){console.error("Error fetching doctor data:",f)}})()},[a]),console.log(m,"checking"),e.jsx("div",{className:"bg-white rounded-lg shadow-md p-2 flex flex-col mb-1",children:e.jsxs("div",{className:"flex flex-col sm:flex-row items-center sm:items-start",children:[e.jsx("img",{className:"w-14 h-14 rounded-full object-cover mb-2 sm:mb-0 sm:mr-4",src:m.profileImage,alt:"Doctor Profile"}),e.jsxs("div",{className:"flex flex-col text-center sm:text-left",children:[e.jsx("span",{className:"font-medium",children:m.doctorName}),e.jsx("span",{className:"text-gray-500 text-sm",children:g==null?void 0:g.text})]})]})})},U=({message:a,own:g,receiverProfilePicture:m,receiverName:t})=>e.jsxs("div",{className:`message flex flex-col mt-5 ml-5 ${g?"items-end":"items-start"}`,children:[e.jsx("div",{className:"fixed top-1 left-0  w-full lg:w-3/4 lg:ml-96 mt-16 h-13 bg-gray-200 flex items-center justify-between p-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:m,alt:"Profile",className:"w-10 h-10 rounded-full mr-4"}),e.jsx("span",{className:"text-xl font-bold",children:t})]})}),e.jsx("div",{className:"flex mt-14",children:e.jsx("p",{className:`messageText p-2 rounded-lg ${g?"bg-blue-500 text-white":"bg-gray-300 text-black"}`,children:a==null?void 0:a.text})}),e.jsx("div",{className:"text-xs mt-1",children:a!=null&&a.createdAt?T(a.createdAt):""})]}),K=()=>{const a=$(s=>s.UserSlice),[g,m]=c.useState([]),[t,b]=c.useState(null),[f,h]=c.useState([]),[N,M]=c.useState(""),[w,A]=c.useState(null),[p,I]=c.useState(null),y=c.useRef(null),n=S();c.useEffect(()=>{n==null||n.on("getMessage",s=>{A({senderId:s.senderId,text:s.text,createdAt:Date.now()})}),n==null||n.on("updateLastMessage",s=>{m(r=>{const i=r.map(l=>l._id===s.conversationId?{...l,lastMessage:s.lastMessage}:l);return i.sort((l,o)=>new Date(o.lastMessage.createdAt).getTime()-new Date(l.lastMessage.createdAt).getTime()),i})})},[]),c.useEffect(()=>{w&&(t!=null&&t.members.includes(w.senderId)&&h(s=>[...s,w]),m(s=>{const r=s.map(i=>i._id===(t==null?void 0:t._id)?{...i,lastMessage:w}:i);return r.sort((i,l)=>new Date(l.lastMessage.createdAt).getTime()-new Date(i.lastMessage.createdAt).getTime()),r}))},[w,t]),c.useEffect(()=>{n==null||n.emit("addUser",a.id),n==null||n.on("getUsers",s=>{})},[a]),c.useEffect(()=>{(async()=>{try{const i=(await u.get(`${v}/conversations/${a.id}`)).data,l=await Promise.all(i.map(async o=>{const d=(await u.get(`${v}/messages/${o._id}`)).data.messages,j=d[d.length-1];return{...o,lastMessage:j}}));l.sort((o,x)=>new Date(x.lastMessage.createdAt).getTime()-new Date(o.lastMessage.createdAt).getTime()),m(l)}catch(r){console.error("Error fetching conversations:",r)}})()},[a.id]),c.useEffect(()=>{(async()=>{if(t)try{const r=await u.get(`${v}/messages/${t._id}`);h(r.data.messages)}catch(r){console.error("Error fetching messages:",r)}})()},[t]);const E=async s=>{b(s);const r=s.members.find(o=>o!==a.id);try{const o=await u.get(`${D}/doctor/${r}`);I(o.data.doctor)}catch(o){console.error("Error fetching receiver details:",o)}const l=(await u.get(`${v}/messages/${s._id}`)).data.messages.slice(-1)[0];m(o=>{const x=o.map(d=>d._id===s._id?{...d,lastMessage:l}:d);return x.sort((d,j)=>new Date(j.lastMessage.createdAt).getTime()-new Date(d.lastMessage.createdAt).getTime()),x})},_=async s=>{s.preventDefault();const r={senderId:a.id,text:N,conversationId:t==null?void 0:t._id},i=t.members.find(l=>l!==a.id);n==null||n.emit("sendMessage",{senderId:a.id,receiverId:i,text:N,conversationId:t==null?void 0:t._id});try{const l=await u.post(`${v}/messages`,r);h([...f,l.data]),M(""),m(o=>{const x=o.map(d=>d._id===(t==null?void 0:t._id)?{...d,lastMessage:l.data}:d);return x.sort((d,j)=>new Date(j.lastMessage.createdAt).getTime()-new Date(d.lastMessage.createdAt).getTime()),x})}catch(l){console.error("Error sending message:",l)}};return c.useEffect(()=>{var s;(s=y.current)==null||s.scrollIntoView({behavior:"smooth"})},[f]),e.jsxs(e.Fragment,{children:[e.jsx(C,{}),e.jsxs("div",{className:"h-[664px] flex flex-col lg:flex-row",children:[e.jsx("div",{className:"w-full lg:w-1/4 bg-gray-200",children:e.jsx("div",{className:"p-4 h-full flex flex-col",children:g.map((s,r)=>e.jsx("div",{onClick:()=>E(s),children:e.jsx(P,{conversation:s,lastMessage:s.lastMessage})},r))})}),e.jsx("div",{className:"w-full lg:w-3/4 bg-gray-100",children:e.jsx("div",{className:"flex flex-col h-full",children:e.jsx("div",{className:"h-full flex flex-col overflow-y-scroll pr-4",children:t?e.jsxs(e.Fragment,{children:[f.map((s,r)=>e.jsx("div",{className:"flex-1",ref:y,children:e.jsx(U,{message:s,own:s.senderId===a.id,receiverProfilePicture:p==null?void 0:p.profileImage,receiverName:p==null?void 0:p.doctorName})},r)),e.jsxs("div",{className:"flex items-center",children:[e.jsx("textarea",{className:"w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none ml-4 mb-5",placeholder:"Write a message...",onChange:s=>M(s.target.value),value:N}),e.jsx("button",{className:"ml-2 mb-5 mr-5 px-5 py-3 bg-blue-500 text-white rounded-md cursor-pointer focus:outline-none hover:bg-blue-600",onClick:_,children:e.jsx(R,{size:18})})]})]}):e.jsx("div",{className:"text-center text-5xl text-gray-400 cursor-default mt-20 lg:mt-52",children:"Open a chat to start conversation.."})})})})]})]})};export{K as default};
