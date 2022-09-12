import{_ as oe,a as j,p as ie,i as le,r as d,u as ce,g as O,b as _,s as A,c as se,d as u,e as V,f as B,h as F,j as n,k as E,l as de,B as ue,m as pe,n as w,o as me,q as ge,t as he,v as m,w as k,L as fe,T as ve,x as ye,F as ne,y as H,A as D,z as be,C as N,D as R,E as _e,G as I,H as z,I as xe,J as Ce,S as Se,O as Ae,K as Ie,M as Me}from"./index.0e2c3705.js";import{L as q,B as $e,C as Pe,F as Ne,I as ke,S as we,a as Te,b as Le,T as Re,c as Oe}from"./TextField.0293c542.js";const Ve=["sx"],Be=e=>{const t={systemProps:{},otherProps:{}};return Object.keys(e).forEach(r=>{ie[r]?t.systemProps[r]=e[r]:t.otherProps[r]=e[r]}),t};function Fe(e){const{sx:t}=e,r=oe(e,Ve),{systemProps:a,otherProps:l}=Be(r);let s;return Array.isArray(t)?s=[a,...t]:typeof t=="function"?s=(...o)=>{const i=t(...o);return le(i)?j({},a,i):a}:s=j({},a,t),j({},l,{sx:s})}const Ee=300,De=e=>{const[t,r]=d.exports.useState(e),[a,l]=d.exports.useState("");return d.exports.useEffect(()=>{const s=setTimeout(()=>{l(t)},Ee);return()=>{clearTimeout(s)}},[t]),{debounceValue:a,inputValue:t,setInputValue:r}},U=()=>{const[e,t]=ce(),r=()=>{let s={};return e.forEach((o,i)=>{s={...s,[i]:o}}),s},a={get(s){return e.get(s)},set(s,o){o===""||o==null?e.delete(s):e.set(s,o),t(e)},delete(s){e.delete(s),t(e)}},l=s=>({set(o){a.set(s,o)},delete(){a.delete(s)},get(){return a.get(s)}});return{currentQueryParams:r(),queryMethods:a,searchParams:e,getQueryMethodWithKey:l}},Ue=(e,t,r)=>{const a=d.exports.useRef(0);d.exports.useEffect(()=>{if(a.current<e){a.current++;return}t()},r)};function je(e){return O("MuiTypography",e)}_("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const ze=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],Qe=e=>{const{align:t,gutterBottom:r,noWrap:a,paragraph:l,variant:s,classes:o}=e,i={root:["root",s,e.align!=="inherit"&&`align${se(t)}`,r&&"gutterBottom",a&&"noWrap",l&&"paragraph"]};return F(i,je,o)},We=A("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.variant&&t[r.variant],r.align!=="inherit"&&t[`align${se(r.align)}`],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})(({theme:e,ownerState:t})=>u({margin:0},t.variant&&e.typography[t.variant],t.align!=="inherit"&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),J={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},Ge={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},He=e=>Ge[e]||e,qe=d.exports.forwardRef(function(t,r){const a=V({props:t,name:"MuiTypography"}),l=He(a.color),s=Fe(u({},a,{color:l})),{align:o="inherit",className:i,component:c,gutterBottom:p=!1,noWrap:v=!1,paragraph:h=!1,variant:y="body1",variantMapping:x=J}=s,g=B(s,ze),f=u({},s,{align:o,color:l,className:i,component:c,gutterBottom:p,noWrap:v,paragraph:h,variant:y,variantMapping:x}),C=c||(h?"p":x[y]||J[y])||"span",b=Qe(f);return n(We,u({as:C,ref:r,ownerState:f,className:E(b.root,i)},g))});var T=qe,Je=de(n("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function Ke(e){return O("MuiAvatar",e)}_("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const Xe=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],Ye=e=>{const{classes:t,variant:r,colorDefault:a}=e;return F({root:["root",r,a&&"colorDefault"],img:["img"],fallback:["fallback"]},Ke,t)},Ze=A("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>u({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.variant==="square"&&{borderRadius:0},t.colorDefault&&u({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[600]}))),et=A("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),tt=A(Je,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});function at({crossOrigin:e,referrerPolicy:t,src:r,srcSet:a}){const[l,s]=d.exports.useState(!1);return d.exports.useEffect(()=>{if(!r&&!a)return;s(!1);let o=!0;const i=new Image;return i.onload=()=>{!o||s("loaded")},i.onerror=()=>{!o||s("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=r,a&&(i.srcset=a),()=>{o=!1}},[e,t,r,a]),l}const rt=d.exports.forwardRef(function(t,r){const a=V({props:t,name:"MuiAvatar"}),{alt:l,children:s,className:o,component:i="div",imgProps:c,sizes:p,src:v,srcSet:h,variant:y="circular"}=a,x=B(a,Xe);let g=null;const f=at(u({},c,{src:v,srcSet:h})),C=v||h,b=C&&f!=="error",M=u({},a,{colorDefault:!b,component:i,variant:y}),S=Ye(M);return b?g=n(et,u({alt:l,src:v,srcSet:h,sizes:p,ownerState:M,className:S.img},c)):s!=null?g=s:C&&l?g=l[0]:g=n(tt,{className:S.fallback}),n(Ze,u({as:i,ownerState:M,className:E(S.root,o),ref:r},x,{children:g}))});var K=rt;function st(e){return O("MuiCardContent",e)}_("MuiCardContent",["root"]);const nt=["className","component"],ot=e=>{const{classes:t}=e;return F({root:["root"]},st,t)},it=A("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),lt=d.exports.forwardRef(function(t,r){const a=V({props:t,name:"MuiCardContent"}),{className:l,component:s="div"}=a,o=B(a,nt),i=u({},a,{component:s}),c=ot(i);return n(it,u({as:s,className:E(c.root,l),ownerState:i,ref:r},o))});var ct=lt;const dt=_("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);var X=dt;const ut=_("MuiListItemIcon",["root","alignItemsFlexStart"]);var Y=ut;const pt=_("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]);var Z=pt;function mt(e){return O("MuiMenuItem",e)}const gt=_("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var $=gt;const ht=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex"],ft=(e,t)=>{const{ownerState:r}=e;return[t.root,r.dense&&t.dense,r.divider&&t.divider,!r.disableGutters&&t.gutters]},vt=e=>{const{disabled:t,dense:r,divider:a,disableGutters:l,selected:s,classes:o}=e,c=F({root:["root",r&&"dense",t&&"disabled",!l&&"gutters",a&&"divider",s&&"selected"]},mt,o);return u({},o,c)},yt=A(ue,{shouldForwardProp:e=>pe(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:ft})(({theme:e,ownerState:t})=>u({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${$.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:w(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${$.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:w(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${$.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:w(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:w(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${$.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${$.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${X.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${X.inset}`]:{marginLeft:52},[`& .${Z.root}`]:{marginTop:0,marginBottom:0},[`& .${Z.inset}`]:{paddingLeft:36},[`& .${Y.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&u({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${Y.root} svg`]:{fontSize:"1.25rem"}}))),bt=d.exports.forwardRef(function(t,r){const a=V({props:t,name:"MuiMenuItem"}),{autoFocus:l=!1,component:s="li",dense:o=!1,divider:i=!1,disableGutters:c=!1,focusVisibleClassName:p,role:v="menuitem",tabIndex:h}=a,y=B(a,ht),x=d.exports.useContext(q),g={dense:o||x.dense||!1,disableGutters:c},f=d.exports.useRef(null);me(()=>{l&&f.current&&f.current.focus()},[l]);const C=u({},a,{dense:g.dense,divider:i,disableGutters:c}),b=vt(a),M=ge(f,r);let S;return a.disabled||(S=h!==void 0?h:-1),n(q.Provider,{value:g,children:n(yt,u({ref:M,role:v,tabIndex:S,component:s,focusVisibleClassName:E(b.focusVisible,p)},y,{ownerState:C,classes:b}))})});var ee=bt;const te=({isBackdropLoading:e=!0})=>{const t=n(Pe,{color:"inherit"});return e?n($e,{sx:{zIndex:2},open:!0,children:t}):n("div",{className:he.loading,children:t})},G=({isNoneSelection:e=!1,list:t,onChangeSideEffect:r,...a})=>{const l=()=>a.defaultValue!=null?(a.multiple,a.defaultValue):a.multiple?[]:"",[s,o]=d.exports.useState(l),i=c=>{const p=c.target.value;if(r?.(p),a.multiple){o(p);return}o(p)};return m(Ne,{fullWidth:!0,children:[n(ke,{id:`select-${a.id}`,children:a.label}),m(we,{...a,value:s,labelId:`select-${a.id}`,sx:{width:"100%"},onChange:i,children:[t.map((c,p)=>n(ee,{value:c.value,children:c.text??c.value},p)),e&&n(ee,{value:"",children:n("em",{children:"None"})})]})]})},_t="_header_1v0tx_1",xt="_header__link_1v0tx_13",Ct="_header__wrapper_1v0tx_19";var Q={header:_t,header__link:xt,header__wrapper:Ct};const St=()=>{const e=k(),t=async()=>{await ve.remove(),e(ye(!1))};return n("div",{className:Q.header,children:m("div",{className:Q.header__wrapper,children:[n(fe,{className:Q.header__link,to:"/",children:"Home"}),n(Te,{variant:"contained",color:"secondary",onClick:t,children:"Log out"})]})})};var At={"default-layout":"_default-layout_rv8pr_1"};const It=({children:e})=>m(ne,{children:[n(St,{}),n("div",{className:At["default-layout"],children:e})]}),Mt=Object.values(H).filter(e=>e!==H.Default).map(e=>({value:e})),$t=()=>{const{queryMethods:e,currentQueryParams:t}=U(),r=k(),a=D.fromUrl(t),l=s=>{const o=s,i=o.map(c=>be.typeModelToDto[c]).join(",");e.set("types",i),r(N(new R({...a,types:o})))};return n(G,{id:"anime-filter",multiple:!0,defaultValue:a.types,label:"Filter by types",onChangeSideEffect:l,list:Mt})},{selectAll:Pt}=_e.getSelectors(),Nt=I(e=>Pt(e.anime),e=>e),kt=I(e=>e.anime.isLoading,e=>e);I(e=>e.auth.isAuthorized,e=>e);I(e=>e.anime.totalItems,e=>e);const wt=I(e=>e.anime.nextPageUrl,e=>e),Tt=I(e=>e.anime.isLoadingNextPage,e=>e);var Lt="/camp-js-2022-khoa-nguyen/pr-preview/pr-18/assets/fallback-avatar.4d92921c.jpg";const Rt={FallbackAvatar:Lt};var P={"anime-item":"_anime-item_u6zmk_1","anime-item__thumb":"_anime-item__thumb_u6zmk_8","anime-item__content":"_anime-item__content_u6zmk_16"};const L=e=>e??"--",ae=({animeInfo:e})=>n(Le,{className:P["anime-item__wrapper"],children:m(ct,{className:P["anime-item"],children:[e.image==null&&n(K,{alt:e.titleEnglish,src:Rt.FallbackAvatar,className:P["anime-item__thumb"]}),e.image&&n(K,{alt:e.titleEnglish,src:e.image,className:P["anime-item__thumb"]}),m("div",{className:P["anime-item__content"],children:[n(T,{children:L(e.titleJapan)}),n(T,{children:L(e.titleEnglish)}),m(T,{children:["Status: ",L(e.status)]}),m(T,{children:["Type: ",L(e.type)]})]})]})});var Ot={"anime-item":"_anime-item_dkuyb_1"};const Vt={root:null,rootMargin:"30px",threshold:.2},Bt=()=>{const e=d.exports.useRef(null),t=z(kt),r=k(),a=z(wt),l=xe(Nt),{currentQueryParams:s}=U(),o=z(Tt);d.exports.useEffect(()=>{const c=D.fromUrl(s);r(N(c))},[]);const i=c=>{c[0].isIntersecting&&a&&r(Ce(a))};return d.exports.useEffect(()=>{const c=new IntersectionObserver(i,Vt);return e.current&&c.observe(e.current),()=>{c.disconnect()}},[i]),t?n(te,{isBackdropLoading:!1}):l.length===0?n("div",{children:"There is no result"}):m(ne,{children:[l?.map((c,p)=>p===l.length-1?n("div",{ref:e,className:Ot["anime-item"],children:n(ae,{animeInfo:c})},c.id):n(ae,{animeInfo:c},c.id)),o&&n(te,{isBackdropLoading:!1})]})},Ft=d.exports.memo(Bt);var Et={"anime-search__input":"_anime-search__input_1g9xt_1"};const Dt=()=>{const{currentQueryParams:e,getQueryMethodWithKey:t}=U(),r=t("search"),{inputValue:a,setInputValue:l,debounceValue:s}=De(r.get()??""),o=c=>{l(c.target.value)},i=k();return Ue(1,()=>{r.set(s);const c=D.fromUrl(e);i(N(new R({...c,search:s})))},[s]),n("div",{children:n(Re,{value:a,onChange:o,className:Et["anime-search__input"],placeholder:"e.g.Naruto, ...",type:"search"})})},Ut=d.exports.memo(Dt);var jt={"anime-sorting":"_anime-sorting_bbp2x_1"};const zt=Object.values(Se).map(e=>({value:e})),Qt=Object.values(Ae).map(e=>({value:e})),Wt=()=>{const{currentQueryParams:e,queryMethods:t}=U(),r=k(),a=D.fromUrl(e),l=o=>{const i=o;t.set("sorting",Ie.toUrl(i)),r(N(new R({...a,sorting:i})))},s=o=>{const i=o;t.set("ordering",i),r(N(new R({...a,ordering:i})))};return m("div",{className:jt["anime-sorting"],children:[n(G,{defaultValue:a.sorting,onChangeSideEffect:l,id:"sort-anime",label:"Sort by",isNoneSelection:!0,list:zt}),n(G,{disabled:a.sorting==null,defaultValue:a.ordering,onChangeSideEffect:s,id:"order-anime",label:"Order by",list:Qt})]})};var re={"anime-sidebar":"_anime-sidebar_8ow7o_1","anime-tab-group":"_anime-tab-group_8ow7o_16"};const Gt=()=>m(Oe,{component:"aside",className:re["anime-sidebar"],children:[n("div",{className:re["anime-tab-group"],children:n(Me,{listTab:[{label:"Search",panel:n(Ut,{})},{label:"Filter",panel:n($t,{})},{label:"Sorting",panel:n(Wt,{})}]})}),n(Ft,{})]}),Ht=d.exports.memo(Gt);var W={"anime-table":"_anime-table_1sw7u_1"};const qt=()=>n(It,{children:m("div",{className:W["anime-table"],children:[n("div",{className:W["anime-table__sidebar"],children:n(Ht,{})}),n("div",{className:W["anime-table__content"],children:n("h1",{children:"Place holder for next implementation"})})]})}),Xt=d.exports.memo(qt);export{Xt as AnimeTablePage,qt as AnimeTablePageInner};
