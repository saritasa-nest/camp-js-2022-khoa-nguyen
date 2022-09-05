import{_ as V,a as x,p as q,i as J,c as Q,b as X,d as N,u as Y,r as C,e as O,j as p,f as E,g as A,s as D,h as K,k as ee,l as $,m as te,n as ne,o as _,q as P,t as re,v as M,L as se,T as ie,w as oe,F as ae}from"./index.af82041e.js";import{B as ce,C as j}from"./Card.8a94bcc3.js";const le=["sx"],ue=e=>{const t={systemProps:{},otherProps:{}};return Object.keys(e).forEach(n=>{q[n]?t.systemProps[n]=e[n]:t.otherProps[n]=e[n]}),t};function de(e){const{sx:t}=e,n=V(e,le),{systemProps:r,otherProps:s}=ue(n);let o;return Array.isArray(t)?o=[r,...t]:typeof t=="function"?o=(...i)=>{const a=t(...i);return J(a)?x({},r,a):r}:o=x({},r,t),x({},s,{sx:o})}const pe=Q();var fe=pe;const me=["className","component","disableGutters","fixed","maxWidth","classes"],xe=X(),ge=fe("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${N(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),he=e=>Y({props:e,name:"MuiContainer",defaultTheme:xe}),ve=(e,t)=>{const n=u=>A(t,u),{classes:r,fixed:s,disableGutters:o,maxWidth:i}=e,a={root:["root",i&&`maxWidth${N(String(i))}`,s&&"fixed",o&&"disableGutters"]};return O(a,n,r)};function be(e={}){const{createStyledComponent:t=ge,useThemeProps:n=he,componentName:r="MuiContainer"}=e,s=t(({theme:i,ownerState:a})=>x({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!a.disableGutters&&{paddingLeft:i.spacing(2),paddingRight:i.spacing(2),[i.breakpoints.up("sm")]:{paddingLeft:i.spacing(3),paddingRight:i.spacing(3)}}),({theme:i,ownerState:a})=>a.fixed&&Object.keys(i.breakpoints.values).reduce((u,l)=>{const c=l,d=i.breakpoints.values[c];return d!==0&&(u[i.breakpoints.up(c)]={maxWidth:`${d}${i.breakpoints.unit}`}),u},{}),({theme:i,ownerState:a})=>x({},a.maxWidth==="xs"&&{[i.breakpoints.up("xs")]:{maxWidth:Math.max(i.breakpoints.values.xs,444)}},a.maxWidth&&a.maxWidth!=="xs"&&{[i.breakpoints.up(a.maxWidth)]:{maxWidth:`${i.breakpoints.values[a.maxWidth]}${i.breakpoints.unit}`}}));return C.exports.forwardRef(function(a,u){const l=n(a),{className:c,component:d="div",disableGutters:f=!1,fixed:m=!1,maxWidth:h="lg"}=l,w=V(l,me),S=x({},l,{component:d,disableGutters:f,fixed:m,maxWidth:h}),v=ve(S,r);return p(s,x({as:d,ownerState:S,className:E(v.root,c),ref:u},w))})}const $e=be({createStyledComponent:D("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[`maxWidth${N(String(n.maxWidth))}`],n.fixed&&t.fixed,n.disableGutters&&t.disableGutters]}}),useThemeProps:e=>K({props:e,name:"MuiContainer"})});var ke=$e;const Se=C.exports.createContext();var L=Se;function ye(e){return A("MuiGrid",e)}const Ce=[0,1,2,3,4,5,6,7,8,9,10],_e=["column-reverse","column","row-reverse","row"],we=["nowrap","wrap-reverse","wrap"],b=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],k=ee("MuiGrid",["root","container","item","zeroMinWidth",...Ce.map(e=>`spacing-xs-${e}`),..._e.map(e=>`direction-xs-${e}`),...we.map(e=>`wrap-xs-${e}`),...b.map(e=>`grid-xs-${e}`),...b.map(e=>`grid-sm-${e}`),...b.map(e=>`grid-md-${e}`),...b.map(e=>`grid-lg-${e}`),...b.map(e=>`grid-xl-${e}`)]),We=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function g(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function Ge({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce((r,s)=>{let o={};if(t[s]&&(n=t[s]),!n)return r;if(n===!0)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if(n==="auto")o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const i=_({values:t.columns,breakpoints:e.breakpoints.values}),a=typeof i=="object"?i[s]:i;if(a==null)return r;const u=`${Math.round(n/a*1e8)/1e6}%`;let l={};if(t.container&&t.item&&t.columnSpacing!==0){const c=e.spacing(t.columnSpacing);if(c!=="0px"){const d=`calc(${u} + ${g(c)})`;l={flexBasis:d,maxWidth:d}}}o=$({flexBasis:u,flexGrow:0,maxWidth:u},l)}return e.breakpoints.values[s]===0?Object.assign(r,o):r[e.breakpoints.up(s)]=o,r},{})}function Ne({theme:e,ownerState:t}){const n=_({values:t.direction,breakpoints:e.breakpoints.values});return P({theme:e},n,r=>{const s={flexDirection:r};return r.indexOf("column")===0&&(s[`& > .${k.item}`]={maxWidth:"none"}),s})}function I({breakpoints:e,values:t}){let n="";Object.keys(t).forEach(s=>{n===""&&t[s]!==0&&(n=s)});const r=Object.keys(e).sort((s,o)=>e[s]-e[o]);return r.slice(0,r.indexOf(n))}function Pe({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t;let s={};if(n&&r!==0){const o=_({values:r,breakpoints:e.breakpoints.values});let i;typeof o=="object"&&(i=I({breakpoints:e.breakpoints.values,values:o})),s=P({theme:e},o,(a,u)=>{var l;const c=e.spacing(a);return c!=="0px"?{marginTop:`-${g(c)}`,[`& > .${k.item}`]:{paddingTop:g(c)}}:(l=i)!=null&&l.includes(u)?{}:{marginTop:0,[`& > .${k.item}`]:{paddingTop:0}}})}return s}function Me({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t;let s={};if(n&&r!==0){const o=_({values:r,breakpoints:e.breakpoints.values});let i;typeof o=="object"&&(i=I({breakpoints:e.breakpoints.values,values:o})),s=P({theme:e},o,(a,u)=>{var l;const c=e.spacing(a);return c!=="0px"?{width:`calc(100% + ${g(c)})`,marginLeft:`-${g(c)}`,[`& > .${k.item}`]:{paddingLeft:g(c)}}:(l=i)!=null&&l.includes(u)?{}:{width:"100%",marginLeft:0,[`& > .${k.item}`]:{paddingLeft:0}}})}return s}function Te(e,t,n={}){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[n[`spacing-xs-${String(e)}`]];const r=[];return t.forEach(s=>{const o=e[s];Number(o)>0&&r.push(n[`spacing-${s}-${String(o)}`])}),r}const ze=D("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:r,direction:s,item:o,spacing:i,wrap:a,zeroMinWidth:u,breakpoints:l}=n;let c=[];r&&(c=Te(i,l,t));const d=[];return l.forEach(f=>{const m=n[f];m&&d.push(t[`grid-${f}-${String(m)}`])}),[t.root,r&&t.container,o&&t.item,u&&t.zeroMinWidth,...c,s!=="row"&&t[`direction-xs-${String(s)}`],a!=="wrap"&&t[`wrap-xs-${String(a)}`],...d]}})(({ownerState:e})=>$({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},e.wrap!=="wrap"&&{flexWrap:e.wrap}),Ne,Pe,Me,Ge);function Re(e,t){if(!e||e<=0)return[];if(typeof e=="string"&&!Number.isNaN(Number(e))||typeof e=="number")return[`spacing-xs-${String(e)}`];const n=[];return t.forEach(r=>{const s=e[r];if(Number(s)>0){const o=`spacing-${r}-${String(s)}`;n.push(o)}}),n}const Be=e=>{const{classes:t,container:n,direction:r,item:s,spacing:o,wrap:i,zeroMinWidth:a,breakpoints:u}=e;let l=[];n&&(l=Re(o,u));const c=[];u.forEach(f=>{const m=e[f];m&&c.push(`grid-${f}-${String(m)}`)});const d={root:["root",n&&"container",s&&"item",a&&"zeroMinWidth",...l,r!=="row"&&`direction-xs-${String(r)}`,i!=="wrap"&&`wrap-xs-${String(i)}`,...c]};return O(d,ye,t)},je=C.exports.forwardRef(function(t,n){const r=K({props:t,name:"MuiGrid"}),{breakpoints:s}=te(),o=de(r),{className:i,columns:a,columnSpacing:u,component:l="div",container:c=!1,direction:d="row",item:f=!1,rowSpacing:m,spacing:h=0,wrap:w="wrap",zeroMinWidth:S=!1}=o,v=ne(o,We),U=m||h,F=u||h,Z=C.exports.useContext(L),T=c?a||12:Z,z={},R=$({},v);s.keys.forEach(y=>{v[y]!=null&&(z[y]=v[y],delete R[y])});const B=$({},o,{columns:T,container:c,direction:d,item:f,rowSpacing:U,columnSpacing:F,wrap:w,zeroMinWidth:S,spacing:h},z,{breakpoints:s.keys}),H=Be(B);return p(L.Provider,{value:T,children:p(ze,$({ownerState:B,className:E(H.root,i),as:l,ref:n},R))})});var W=je;const Le="_header_snili_1",Ve="_header__link_snili_11",Oe="_header__wrapper_snili_16";var G={header:Le,header__link:Ve,header__wrapper:Oe};const Ee=()=>{const e=re(),t=async()=>{await ie.remove(),e(oe(!1))};return p("div",{className:G.header,children:M("div",{className:G.header__wrapper,children:[p(se,{className:G.header__link,to:"/",children:"Home"}),p(ce,{variant:"contained",color:"secondary",onClick:t,children:"Log out"})]})})};var Ae={"default-layout":"_default-layout_11kd5_1"};const De=({children:e})=>M(ae,{children:[p(Ee,{}),p("div",{className:Ae["default-layout"],children:e})]}),Ue=()=>p(De,{children:p(ke,{children:M(W,{container:!0,justifyContent:"center",spacing:5,children:[p(W,{item:!0,xs:3,children:p(j,{children:"Test"})}),p(W,{item:!0,xs:9,children:p(j,{children:"Test2"})})]})})});export{Ue as AnimeTablePage};