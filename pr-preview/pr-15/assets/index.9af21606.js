import{_ as pe,a as W,p as ue,i as me,r as d,g as T,b as R,s as b,c as oe,d as c,u as B,e as P,f as F,j as s,h as A,k as ge,l as G,m as fe,n as he,o as u,B as ve,q as J,L as be,T as ye,t as _e,F as se,v as xe,w as O,x as Z,y as Ce,z as ne,A as Ae,C as Ie}from"./index.4284b3dd.js";import{L as E,i as Se,a as ee,C as Le,B as Ne,b as Pe,T as Re}from"./TextField.0ba019fb.js";const $e=["sx"],ke=e=>{const t={systemProps:{},otherProps:{}};return Object.keys(e).forEach(a=>{ue[a]?t.systemProps[a]=e[a]:t.otherProps[a]=e[a]}),t};function Me(e){const{sx:t}=e,a=pe(e,$e),{systemProps:o,otherProps:i}=ke(a);let n;return Array.isArray(t)?n=[o,...t]:typeof t=="function"?n=(...l)=>{const r=t(...l);return me(r)?W({},o,r):o}:n=W({},o,t),W({},i,{sx:n})}const we=()=>{const[e,t]=d.exports.useState(""),[a,o]=d.exports.useState("");return d.exports.useEffect(()=>{const i=setTimeout(()=>{o(e)},300);return()=>{clearTimeout(i)}},[e]),{debounceValue:a,inputValue:e,setInputValue:t}},Te=(e,t)=>{const a=d.exports.useRef(0);d.exports.useEffect(()=>{if(a.current<2){a.current++;return}e()},t)};function Be(e){return T("MuiTypography",e)}R("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const Fe=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],Oe=e=>{const{align:t,gutterBottom:a,noWrap:o,paragraph:i,variant:n,classes:l}=e,r={root:["root",n,e.align!=="inherit"&&`align${oe(t)}`,a&&"gutterBottom",o&&"noWrap",i&&"paragraph"]};return F(r,Be,l)},Ve=b("span",{name:"MuiTypography",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.variant&&t[a.variant],a.align!=="inherit"&&t[`align${oe(a.align)}`],a.noWrap&&t.noWrap,a.gutterBottom&&t.gutterBottom,a.paragraph&&t.paragraph]}})(({theme:e,ownerState:t})=>c({margin:0},t.variant&&e.typography[t.variant],t.align!=="inherit"&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),te={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},Ge={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},De=e=>Ge[e]||e,ze=d.exports.forwardRef(function(t,a){const o=B({props:t,name:"MuiTypography"}),i=De(o.color),n=Me(c({},o,{color:i})),{align:l="inherit",className:r,component:p,gutterBottom:m=!1,noWrap:g=!1,paragraph:f=!1,variant:v="body1",variantMapping:I=te}=n,h=P(n,Fe),y=c({},n,{align:l,color:i,className:r,component:p,gutterBottom:m,noWrap:g,paragraph:f,variant:v,variantMapping:I}),_=p||(f?"p":I[v]||te[v])||"span",S=Oe(y);return s(Ve,c({as:_,ref:a,ownerState:y,className:A(S.root,r)},h))});var D=ze,Ee=ge(s("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function Ue(e){return T("MuiAvatar",e)}R("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const je=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],We=e=>{const{classes:t,variant:a,colorDefault:o}=e;return F({root:["root",a,o&&"colorDefault"],img:["img"],fallback:["fallback"]},Ue,t)},qe=b("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],a.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>c({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.variant==="square"&&{borderRadius:0},t.colorDefault&&c({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[600]}))),He=b("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Je=b(Ee,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});function Ye({crossOrigin:e,referrerPolicy:t,src:a,srcSet:o}){const[i,n]=d.exports.useState(!1);return d.exports.useEffect(()=>{if(!a&&!o)return;n(!1);let l=!0;const r=new Image;return r.onload=()=>{!l||n("loaded")},r.onerror=()=>{!l||n("error")},r.crossOrigin=e,r.referrerPolicy=t,r.src=a,o&&(r.srcset=o),()=>{l=!1}},[e,t,a,o]),i}const Ke=d.exports.forwardRef(function(t,a){const o=B({props:t,name:"MuiAvatar"}),{alt:i,children:n,className:l,component:r="div",imgProps:p,sizes:m,src:g,srcSet:f,variant:v="circular"}=o,I=P(o,je);let h=null;const y=Ye(c({},p,{src:g,srcSet:f})),_=g||f,S=_&&y!=="error",$=c({},o,{colorDefault:!S,component:r,variant:v}),k=We($);return S?h=s(He,c({alt:i,src:g,srcSet:f,sizes:m,ownerState:$,className:k.img},p)):n!=null?h=n:_&&i?h=i[0]:h=s(Je,{className:k.fallback}),s(qe,c({as:r,ownerState:$,className:A(k.root,l),ref:a},I,{children:h}))});var Qe=Ke;function Xe(e){return T("MuiCardContent",e)}R("MuiCardContent",["root"]);const Ze=["className","component"],et=e=>{const{classes:t}=e;return F({root:["root"]},Xe,t)},tt=b("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),at=d.exports.forwardRef(function(t,a){const o=B({props:t,name:"MuiCardContent"}),{className:i,component:n="div"}=o,l=P(o,Ze),r=c({},o,{component:n}),p=et(r);return s(tt,c({as:n,className:A(p.root,i),ownerState:r,ref:a},l))});var ot=at;function st(e){return T("MuiListItem",e)}const nt=R("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]);var N=nt;const rt=R("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);var it=rt;function lt(e){return T("MuiListItemSecondaryAction",e)}R("MuiListItemSecondaryAction",["root","disableGutters"]);const ct=["className"],dt=e=>{const{disableGutters:t,classes:a}=e;return F({root:["root",t&&"disableGutters"]},lt,a)},pt=b("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.disableGutters&&t.disableGutters]}})(({ownerState:e})=>c({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},e.disableGutters&&{right:0})),re=d.exports.forwardRef(function(t,a){const o=B({props:t,name:"MuiListItemSecondaryAction"}),{className:i}=o,n=P(o,ct),l=d.exports.useContext(E),r=c({},o,{disableGutters:l.disableGutters}),p=dt(r);return s(pt,c({className:A(p.root,i),ownerState:r,ref:a},n))});re.muiName="ListItemSecondaryAction";var ut=re;const mt=["className"],gt=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected"],ft=(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.alignItems==="flex-start"&&t.alignItemsFlexStart,a.divider&&t.divider,!a.disableGutters&&t.gutters,!a.disablePadding&&t.padding,a.button&&t.button,a.hasSecondaryAction&&t.secondaryAction]},ht=e=>{const{alignItems:t,button:a,classes:o,dense:i,disabled:n,disableGutters:l,disablePadding:r,divider:p,hasSecondaryAction:m,selected:g}=e;return F({root:["root",i&&"dense",!l&&"gutters",!r&&"padding",p&&"divider",n&&"disabled",a&&"button",t==="flex-start"&&"alignItemsFlexStart",m&&"secondaryAction",g&&"selected"],container:["container"]},st,o)},vt=b("div",{name:"MuiListItem",slot:"Root",overridesResolver:ft})(({theme:e,ownerState:t})=>c({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!t.disablePadding&&c({paddingTop:8,paddingBottom:8},t.dense&&{paddingTop:4,paddingBottom:4},!t.disableGutters&&{paddingLeft:16,paddingRight:16},!!t.secondaryAction&&{paddingRight:48}),!!t.secondaryAction&&{[`& > .${it.root}`]:{paddingRight:48}},{[`&.${N.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${N.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:G(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${N.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:G(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${N.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},t.alignItems==="flex-start"&&{alignItems:"flex-start"},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.button&&{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${N.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:G(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:G(e.palette.primary.main,e.palette.action.selectedOpacity)}}},t.hasSecondaryAction&&{paddingRight:48})),bt=b("li",{name:"MuiListItem",slot:"Container",overridesResolver:(e,t)=>t.container})({position:"relative"}),yt=d.exports.forwardRef(function(t,a){const o=B({props:t,name:"MuiListItem"}),{alignItems:i="center",autoFocus:n=!1,button:l=!1,children:r,className:p,component:m,components:g={},componentsProps:f={},ContainerComponent:v="li",ContainerProps:{className:I}={},dense:h=!1,disabled:y=!1,disableGutters:_=!1,disablePadding:S=!1,divider:$=!1,focusVisibleClassName:k,secondaryAction:Y,selected:ie=!1}=o,le=P(o.ContainerProps,mt),ce=P(o,gt),de=d.exports.useContext(E),U={dense:h||de.dense||!1,alignItems:i,disableGutters:_},j=d.exports.useRef(null);fe(()=>{n&&j.current&&j.current.focus()},[n]);const L=d.exports.Children.toArray(r),K=L.length&&Se(L[L.length-1],["ListItemSecondaryAction"]),M=c({},o,{alignItems:i,autoFocus:n,button:l,dense:U.dense,disabled:y,disableGutters:_,disablePadding:S,divider:$,hasSecondaryAction:K,selected:ie}),Q=ht(M),X=he(j,a),V=g.Root||vt,w=f.root||{},x=c({className:A(Q.root,w.className,p),disabled:y},ce);let C=m||"li";return l&&(x.component=m||"div",x.focusVisibleClassName=A(N.focusVisible,k),C=ve),K?(C=!x.component&&!m?"div":C,v==="li"&&(C==="li"?C="div":x.component==="li"&&(x.component="div")),s(E.Provider,{value:U,children:u(bt,c({as:v,className:A(Q.container,I),ref:X,ownerState:M},le,{children:[s(V,c({},w,!ee(V)&&{as:C,ownerState:c({},M,w.ownerState)},x,{children:L})),L.pop()]}))})):s(E.Provider,{value:U,children:u(V,c({},w,{as:C,ref:X,ownerState:M},!ee(V)&&{ownerState:c({},M,w.ownerState)},x,{children:[L,Y&&s(ut,{children:Y})]}))})});var _t=yt;const ae=()=>s("div",{children:s(Le,{color:"inherit"})}),xt="_header_1v0tx_1",Ct="_header__link_1v0tx_13",At="_header__wrapper_1v0tx_19";var q={header:xt,header__link:Ct,header__wrapper:At};const It=()=>{const e=J(),t=async()=>{await ye.remove(),e(_e(!1))};return s("div",{className:q.header,children:u("div",{className:q.header__wrapper,children:[s(be,{className:q.header__link,to:"/",children:"Home"}),s(Ne,{variant:"contained",color:"secondary",onClick:t,children:"Log out"})]})})};var St={"default-layout":"_default-layout_rv8pr_1"};const Lt=({children:e})=>u(se,{children:[s(It,{}),s("div",{className:St["default-layout"],children:e})]}),{selectAll:Nt}=xe.getSelectors(),Pt=O(e=>Nt(e.anime),e=>e),Rt=O(e=>e.anime.isLoading,e=>e);O(e=>e.auth.isAuthorized,e=>e);O(e=>e.anime.totalItems,e=>e);const $t=O(e=>e.anime.nextPage,e=>e);var z={"anime-item":"_anime-item_tf0g2_1","anime-item__thumb":"_anime-item__thumb_tf0g2_8","anime-item__wrapper":"_anime-item__wrapper_tf0g2_16","anime-item__content":"_anime-item__content_tf0g2_21"};const kt=({data:e})=>s(Pe,{className:z["anime-item__wrapper"],children:u(ot,{className:z["anime-item"],children:[e.image&&s(Qe,{alt:e.titleEnglish,src:e.image,className:z["anime-item__thumb"]}),u("div",{className:z["anime-item__content"],children:[s(D,{children:e.titleJapan||"--"}),s(D,{children:e.titleEnglish||"--"}),u(D,{children:["Status: ",e.status||"--"]}),u(D,{children:["Type: ",e.type||"--"]})]})]})});var Mt={"anime-item":"_anime-item_dkuyb_1"};const wt={root:null,rootMargin:"20px",threshold:.2},Tt=()=>{const e=d.exports.useRef(null),t=Z(Rt),a=J(),o=Z($t),i=Ce(Pt);d.exports.useEffect(()=>{a(ne(""))},[]);const n=d.exports.useCallback(l=>{l[0].isIntersecting&&o&&a(Ae(o))},[o]);return d.exports.useEffect(()=>{const l=new IntersectionObserver(n,wt);return e.current&&l.observe(e.current),()=>{l.disconnect()}},[n]),t?s(ae,{}):i.length===0?s("div",{children:"There is no result"}):u(se,{children:[i?.map((l,r)=>s("div",{ref:e,className:Mt["anime-item"],children:s(kt,{data:l})},r)),s("div",{children:o&&s(ae,{})})]})},Bt=d.exports.memo(Tt);var Ft={"anime-search__input":"_anime-search__input_1g9xt_1"};const Ot=()=>{const{inputValue:e,setInputValue:t,debounceValue:a}=we(),o=n=>{t(n.target.value)},i=J();return Te(()=>{i(ne({search:a}))},[a]),s("div",{children:s(Re,{value:e,onChange:o,className:Ft["anime-search__input"],placeholder:"e.g.Naruto, ...",type:"search"})})},Vt=d.exports.memo(Ot);var Gt={"anime-sidebar":"_anime-sidebar_1qzlg_1"};const Dt=()=>u(_t,{className:Gt["anime-sidebar"],children:[s(Ie,{listTab:[{label:"Search",panel:s(Vt,{})},{label:"Filter",panel:s("div",{children:"Filter"})},{label:"Sorting",panel:s("div",{children:"Sorting"})}]}),s(Bt,{})]}),zt=d.exports.memo(Dt);var H={"anime-table":"_anime-table_1sw7u_1"};const Et=()=>s(Lt,{children:u("div",{className:H["anime-table"],children:[s("div",{className:H["anime-table__sidebar"],children:s(zt,{})}),s("div",{className:H["anime-table__content"],children:s("h1",{children:"Place holder for next implementation"})})]})}),Wt=d.exports.memo(Et);export{Wt as AnimeTablePage,Et as AnimeTablePageInner};