"use strict";(()=>{var e={};e.id=44,e.ids=[44],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},9648:e=>{e.exports=import("axios")},6249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},7925:(e,r,t)=>{t.a(e,async(e,a)=>{try{t.r(r),t.d(r,{config:()=>d,default:()=>s,routeModule:()=>p});var n=t(1802),o=t(7153),i=t(6249),c=t(6892),u=e([c]);c=(u.then?(await u)():u)[0];let s=(0,i.l)(c,"default"),d=(0,i.l)(c,"config"),p=new n.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/cryptocurrency/[id]",pathname:"/api/cryptocurrency/[id]",bundlePath:"",filename:""},userland:c});a()}catch(e){a(e)}})},6892:(e,r,t)=>{t.a(e,async(e,a)=>{try{t.r(r),t.d(r,{default:()=>i});var n=t(9648),o=e([n]);async function i(e,r){try{let t=await n.default.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${e.query.id}`,{headers:{"X-CMC_PRO_API_KEY":process.env.API_KEY}});r.status(200).json(t.data)}catch(e){console.error("Erro ao chamar a API CoinMarketCap:",e),r.status(500).json({error:"Erro ao processar a requisi\xe7\xe3o"})}}n=(o.then?(await o)():o)[0],a()}catch(e){a(e)}})},7153:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,r,t)=>{e.exports=t(145)}};var r=require("../../../webpack-api-runtime.js");r.C(e);var t=r(r.s=7925);module.exports=t})();