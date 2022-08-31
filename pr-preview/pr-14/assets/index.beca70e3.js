import{_ as f,r as C,j as p,u as H,a as G,L as q,T as J,s as Q,F as X}from"./index.59a5fc23.js";import{_ as N,p as Y,i as ee,c as te,a as ne,b as P,u as re,d as V,e as O,g as E,s as A,f as D,h as se,j as ie,r as y,k as M,B as oe,C as j}from"./Card.b7dd5a97.js";const ae=["sx"],ce=e=>{const t={systemProps:{},otherProps:{}};return Object.keys(e).forEach(n=>{Y[n]?t.systemProps[n]=e[n]:t.otherProps[n]=e[n]}),t};function ue(e){const{sx:t}=e,n=N(e,ae),{systemProps:r,otherProps:s}=ce(n);let o;return Array.isArray(t)?o=[r,...t]:typeof t=="function"?o=(...i)=>{const a=t(...i);return ee(a)?f({},r,a):r}:o=f({},r,t),f({},s,{sx:o})}const le=te();var de=le;const pe=["className","component","disableGutters","fixed","maxWidth","classes"],fe=ne(),me=de("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${P(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),xe=e=>re({props:e,name:"MuiContainer",defaultTheme:fe}),ge=(e,t)=>{const n=l=>E(t,l),{classes:r,fixed:s,disableGutters:o,maxWidth:i}=e,a={root:["root",i&&`maxWidth${P(String(i))}`,s&&"fixed",o&&"disableGutters"]};return V(a,n,r)};function he(e={}){const{createStyledComponent:t=me,useThemeProps:n=xe,componentName:r="MuiContainer"}=e,s=t(({theme:i,ownerState:a})=>f({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&{paddingLeft:i.spacing(2),paddingRight:i.spacing(2),[i.breakpoints.up("sm")]:{paddingLeft:i.spacing(3),paddingRight:i.spacing(3)}}),({theme:i,ownerState:a})=>a.fixed&&Object.keys(i.breakpoints.values).reduce((l,u)=>{const c=u,d=i.breakpoints.values[c];return d!==0&&(l[i.breakpoints.up(c)]={maxWidth:`${d}${i.breakpoints.unit}`}),l},{}),({theme:i,ownerState:a})=>f({},a.maxWidth==="xs"&&{[i.breakpoints.up("xs")]:{maxWidth:Math.max(i.breakpoints.values.xs,444)}},a.maxWidth&&a.maxWidth!=="xs"&&{[i.breakpoints.up(a.maxWidth)]:{maxWidth:`${i.breakpoints.values[a.maxWidth]}${i.breakpoints.unit}`}}));return C.exports.forwardRef(function(a,l){const u=n(a),{className:c,component:d="div",disableGutters:m=!1,fixed:x=!1,maxWidth:h="lg"}=u,_=N(u,pe),k=f({},u,{component:d,disableGutters:m,fixed:x,maxWidth:h}),b=ge(k,r);return p(s,f({as:d,ownerState:k,className:O(b.root,c),ref:l},_))})}const be=he({createStyledComponent:A("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${P(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>D({props:e,name:"MuiContainer"})});var ve=be;const $e=C.exports.createContext();var L=$e;function ke(e){return E("MuiGrid",e)}const Se=[0,1,2,3,4,5,6,7,8,9,10],Ce=["column-reverse","column","row-reverse","row"],ye=["nowrap","wrap-reverse","wrap"],v=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],$=se("MuiGrid",["root","container","item","zeroMinWidth",...Se.map(e=>`spacing-xs-${e}`),...Ce.map(e=>`direction-xs-${e}`),...ye.map(e=>`wrap-xs-${e}`),...v.map(e=>`grid-xs-${e}`),...v.map(e=>`grid-sm-${e}`),...v.map(e=>`grid-md-${e}`),...v.map(e=>`grid-lg-${e}`),...v.map(e=>`grid-xl-${e}`)]),_e=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function g(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function we({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce((r,s)=>{let o={};if(t[s]&&(n=t[s]),!n)return r;if(n===!0)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(n==="auto")o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const i=y({values:t.columns,breakpoints:e.breakpoints.values}),a=typeof i=="object"?i[s]:i;if(a==null)return r;const l=`${Math.round(n/a*1e8)/1e6}%`;let u={};if(t.container&&t.item&&t.columnSpacing!==0){const c=e.spacing(t.columnSpacing);if(c!=="0px"){const d=`calc(${l} + ${g(c)})`;u={flexBasis:d,maxWidth:d}}}o=f({flexBasis:l,flexGrow:0,maxWidth:l},u)}return e.breakpoints.values[s]===0?Object.assign(r,o):r[e.breakpoints.up(s)]=o,r},{})}function We({theme:e,ownerState:t}){const n=y({values:t.direction,breakpoints:e.breakpoints.values});return M({theme:e},n,r=>{const s={flexDirection:r};return r.indexOf("column")===0&&(s[`& > .${$.item}`]={maxWidth:"none"}),s})}function K({breakpoints:e,values:t}){let n="";Object.keys(t).forEach(s=>{n===""&&t[s]!==0&&(n=s)});const r=Object.keys(e).sort((s,o)=>e[s]-e[o]);return r.slice(0,r.indexOf(n))}function Ge({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t;let s={};if(n&&r!==0){const o=y({values:r,breakpoints:e.breakpoints.values});let i;typeof o=="object"&&(i=K({breakpoints:e.breakpoints.values,values:o})),s=M({theme:e},o,(a,l)=>{var u;const c=e.spacing(a);return c!=="0px"?{marginTop:`-${g(c)}`,[`& > .${$.item}`]:{paddingTop:g(c)}}:(u=i)!=null&&u.includes(l)?{}:{marginTop:0,[`& > .${$.item}`]:{paddingTop:0}}})}return s}function Ne({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t;let s={};if(n&&r!==0){const o=y({values:r,breakpoints:e.breakpoints.values});let i;typeof o=="object"&&(i=K({breakpoints:e.breakpoints.values,values:o})),s=M({theme:e},o,(a,l)=>{var u;const c=e.spacing(a);return c!=="0px"?{width:`calc(100% + ${g(c)})`,marginLeft:`-${g(c)}`,[`& > .${$.item}`]:{paddingLeft:g(c)}}:(u=i)!=null&&u.includes(l)?{}:{width:"100%",marginLeft:0,[`& > .${$.item}`]:{paddingLeft:0}}})}return s}function Pe(e,t,n={}){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[n[`spacing-xs-${String(e)}`]];const r=[];return t.forEach(s=>{const o=e[s];Number(o)>0&&r.push(n[`spacing-${s}-${String(o)}`])}),r}const Me=A("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:r,direction:s,item:o,spacing:i,wrap:a,zeroMinWidth:l,breakpoints:u}=n;let c=[];r&&(c=Pe(i,u,t));const d=[];return u.forEach(m=>{const x=n[m];x&&d.push(t[`grid-${m}-${String(x)}`])}),[t.root,r&&t.container,o&&t.item,l&&t.zeroMinWidth,...c,s!=="row"&&t[`direction-xs-${String(s)}`],a!=="wrap"&&t[`wrap-xs-${String(a)}`],...d]}})(({ownerState:e})=>f({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},e.wrap!=="wrap"&&{flexWrap:e.wrap}),We,Ge,Ne,we);function Te(e,t){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[`spacing-xs-${String(e)}`];const n=[];return t.forEach(r=>{const s=e[r];if(Number(s)>0){const o=`spacing-${r}-${String(s)}`;n.push(o)}}),n}const ze=e=>{const{classes:t,container:n,direction:r,item:s,spacing:o,wrap:i,zeroMinWidth:a,breakpoints:l}=e;let u=[];n&&(u=Te(o,l));const c=[];l.forEach(m=>{const x=e[m];x&&c.push(`grid-${m}-${String(x)}`)});const d={root:["root",n&&"container",s&&"item",a&&"zeroMinWidth",...u,r!=="row"&&`direction-xs-${String(r)}`,i!=="wrap"&&`wrap-xs-${String(i)}`,...c]};return V(d,ke,t)},Re=C.exports.forwardRef(function(t,n){const r=D({props:t,name:"MuiGrid"}),{breakpoints:s}=ie(),o=ue(r),{className:i,columns:a,columnSpacing:l,component:u="div",container:c=!1,direction:d="row",item:m=!1,rowSpacing:x,spacing:h=0,wrap:_="wrap",zeroMinWidth:k=!1}=o,b=N(o,_e),I=x||h,U=l||h,F=C.exports.useContext(L),T=c?a||12:F,z={},R=f({},b);s.keys.forEach(S=>{b[S]!=null&&(z[S]=b[S],delete R[S])});const B=f({},o,{columns:T,container:c,direction:d,item:m,rowSpacing:I,columnSpacing:U,wrap:_,zeroMinWidth:k,spacing:h},z,{breakpoints:s.keys}),Z=ze(B);return p(L.Provider,{value:T,children:p(Me,f({ownerState:B,className:O(Z.root,i),as:u,ref:n},R))})});var w=Re;const Be="_header_snili_1",je="_header__link_snili_11",Le="_header__wrapper_snili_16";var W={header:Be,header__link:je,header__wrapper:Le};const Ve=()=>{const e=H(),t=async()=>{await J.remove(),e(Q(!1))};return p("div",{className:W.header,children:G("div",{className:W.header__wrapper,children:[p(q,{className:W.header__link,to:"/",children:"Home"}),p(oe,{onClick:t,children:"Log out"})]})})};var Oe={"default-layout":"_default-layout_11kd5_1"};const Ee=({children:e})=>G(X,{children:[p(Ve,{}),p("div",{className:Oe["default-layout"],children:e})]}),Ke=()=>p(Ee,{children:p(ve,{children:G(w,{container:!0,justifyContent:"center",spacing:5,children:[p(w,{item:!0,xs:3,children:p(j,{children:"Test"})}),p(w,{item:!0,xs:9,children:p(j,{children:"Test2"})})]})})});export{Ke as AnimeTablePage};
