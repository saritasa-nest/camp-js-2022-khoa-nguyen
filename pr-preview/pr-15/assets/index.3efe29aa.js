import{c as t,r as n,a as r,j as s,u as i,e as c,y as p,F as l}from"./index.2bfc29a8.js";const m=t(e=>e.genres.genres,e=>e),h=t(e=>e.genres.isLoading,e=>e),g="_card_1rf1o_1";var G={card:g};const f=({genre:e})=>r("div",{className:G.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),u=n.exports.memo(f),x=()=>{const e=i(),o=c(m),d=c(h);return n.exports.useEffect(()=>{e(p())},[e]),d?s("div",{children:"Loading"}):r(l,{children:[s("h1",{children:"Genres"}),o.map(a=>s(u,{genre:a},a.id))]})},L=n.exports.memo(x);export{L as GenresPage};
