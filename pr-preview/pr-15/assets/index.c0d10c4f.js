import{w as t,r as n,o as r,j as s,q as i,x as c,aa as p,F as l}from"./index.39904079.js";const m=t(e=>e.genres.genres,e=>e),h=t(e=>e.genres.isLoading,e=>e),g="_card_1rf1o_1";var G={card:g};const x=({genre:e})=>r("div",{className:G.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),f=n.exports.memo(x),u=()=>{const e=i(),o=c(m),d=c(h);return n.exports.useEffect(()=>{e(p())},[e]),d?s("div",{children:"Loading"}):r(l,{children:[s("h1",{children:"Genres"}),o.map(a=>s(f,{genre:a},a.id))]})},L=n.exports.memo(u);export{L as GenresPage};
