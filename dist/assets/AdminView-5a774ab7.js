import{_ as f,n as h,z as _,o as s,c as t,u as a,a as o,j as c,B as V,F as i,b as g,C as k,d as v,t as w,p as y,f as I}from"./index-85a56c2e.js";const u=n=>(y("data-v-6fedeb80"),n=n(),I(),n),S=u(()=>o("h1",null,"Administration",-1)),x={key:0},b={class:"mon-compte"},L=u(()=>o("p",null,"Les users présents dans la base de données :",-1)),R={key:1},A={__name:"AdminView",setup(n){const e=h();let r=e.user.userId;if(r===void 0)try{e.getUserFromLocalStorage(),r=e.user.userId}catch{e.logout(r)}return e.getUsers(),(l,B)=>{const p=_("RouterLink"),m=_("RouterView");return s(),t(i,null,[S,a(k)().fullPath==="/admin"?(s(),t("div",x,[o("h3",b,[c(p,{to:`/admin/user/${a(r)}`},{default:V(()=>[v(" Gérez mon compte ")]),_:1},8,["to"])]),L,o("p",null,[o("ol",null,[(s(!0),t(i,null,g(a(e).users,d=>(s(),t("li",{key:d.id},w(d.email),1))),128))])])])):(s(),t("div",R,[c(m)]))],64)}}},C=f(A,[["__scopeId","data-v-6fedeb80"]]);export{C as default};
