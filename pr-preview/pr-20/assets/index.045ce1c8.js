import{a6 as g,a7 as o,a8 as l,f,x as w,y,a9 as b,r as L,aa as k,ab as v,j as a,k as r,ac as S,ad as I,ae as n,L as _,J as q,af as x,ag as A,l as E}from"./index.8ccc3518.js";import{s as e,C as F}from"./auth.module.51ed5251.js";const N=g().shape({email:o().email("This field has to be an email!").required("Email is required!"),password:o().required("Password is required!")}),P=new l({email:"",password:""}),C=()=>{const s=f(),{enqueueSnackbar:i}=w(),c=y(b),d=async({email:m,password:p})=>{const t=await s(x(new l({email:m,password:p})));if(t.payload instanceof A){const h=t.payload.detail;i(h,{variant:"error"});return}i("Login successfully!",{variant:"success"}),s(E(!0))};L.exports.useEffect(()=>{s(k())},[]);const u=v({initialValues:P,validationSchema:N,onSubmit:d});return a("div",{className:e.auth,children:r(F,{children:[a("h1",{className:e.auth__title,children:"Welcome to Saritasa Anime"}),a(S,{value:u,children:r(I,{className:e.auth__form,children:[a(n,{label:"Email",name:"email",propsInput:{type:"email"}}),a(n,{label:"Password",name:"password",propsInput:{type:"password"}}),r("p",{children:["Don't have an account?"," ",a(_,{className:e.auth__link,to:"/register",children:"Register now!"})," "]}),a(q,{loading:c,color:"primary",variant:"contained",type:"submit",children:"Login"})]})})]})})};export{C as LoginPage};
