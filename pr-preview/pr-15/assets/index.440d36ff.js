import{t as c,r as n,n as r,j as s,m as i,v as t,a9 as p,F as m}from"./index.a1d3323c.js";const l=c(e=>e.genres.genres,e=>e),h=c(e=>e.genres.isLoading,e=>e),g="_card_1rf1o_1";var G={card:g};const f=({genre:e})=>r("div",{className:G.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),x=n.exports.memo(f),u=()=>{const e=i(),o=t(l),d=t(h);return n.exports.useEffect(()=>{e(p())},[e]),d?s("div",{children:"Loading"}):r(m,{children:[s("h1",{children:"Genres"}),o.map(a=>s(x,{genre:a},a.id))]})},C=n.exports.memo(u);export{C as GenresPage};