import{e as S,u as k,r as c,h as y,a as r,j as a,L as _,p as v,U as A,H as F}from"./index.1aad1de5.js";import{c as L,a as e,u as P,s as i,F as E,b as x,d as s,S as I}from"./auth.module.70ed826e.js";import{C as j,B}from"./index.d7aab7ef.js";const H=L().shape({email:e().email("This field has to be an email!").required("Email is required!"),password:e().required("Password is required!"),lastName:e().required("Last name is required!"),firstName:e().required("First name is required!"),confirmPassword:e().required("Confirm password is required!").test("is-match-password","Confirm password does not match with password",function(t){return t===this.parent.password})}),O={email:"",lastName:"",firstName:"",password:"",confirmPassword:""},R={isOpen:!1,message:"",duration:3e3},V=()=>{const t=S(),m=k(),[o,l]=c.exports.useState(R),u=async({password:n,email:f,firstName:w,lastName:g},{setErrors:b})=>{const d=await m(v(new A({password:n,email:f,firstName:w,lastName:g})));if(d.payload instanceof F){const{data:N,detail:q}=d.payload;b(N),l(C=>({...C,message:q}));return}t("/")},p=()=>{l(n=>({...n,isOpen:!1}))},h=P({initialValues:O,validationSchema:H,onSubmit:u});return c.exports.useEffect(()=>{m(y())},[]),r("div",{className:i.auth,children:[r(j,{children:[a("h1",{className:i.auth__title,children:"Welcome to Saritasa Anime"}),a(E,{value:h,children:r(x,{className:i.auth__form,children:[a(s,{label:"Email",name:"email",type:"email"}),a(s,{label:"First name",name:"firstName"}),a(s,{label:"Last name",name:"lastName"}),a(s,{label:"Password",name:"password",type:"password"}),a(s,{label:"Confirm password",name:"confirmPassword",type:"password"}),r("p",{children:["Already have an account?"," ",a(_,{to:"/login",className:i.auth__link,children:"Login now!"})," "]}),a(B,{type:"submit",children:"Register"})]})})]}),a(I,{open:o.isOpen,autoHideDuration:o.duration,onClose:p,message:o.message})]})};export{V as RegisterPage};
