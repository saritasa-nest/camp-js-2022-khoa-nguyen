import{r as n,v as r,j as s,z as d,K as o,ao as i,F as p}from"./index.369117f5.js";import{s as m,a as h}from"./selectors.4a754fb5.js";const l="_card_1rf1o_1";var G={card:l};const f=({genre:e})=>r("div",{className:G.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),x=n.exports.memo(f),g=()=>{const e=d(),t=o(m),c=o(h);return n.exports.useEffect(()=>{e(i())},[e]),c?s("div",{children:"Loading"}):r(p,{children:[s("h1",{children:"Genres"}),t.map(a=>s(x,{genre:a},a.id))]})},C=n.exports.memo(g);export{C as GenresPage};
