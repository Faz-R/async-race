(()=>{"use strict";var t,e,n,a,s={11:(t,e,n)=>{var a=n(91),s=n.n(a),r=new URL(n(606),n.b);s()(r)},91:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),e.hash&&(t+=e.hash),e.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(t)?'"'.concat(t,'"'):t):t}},191:(t,e,n)=>{n.a(t,(async(t,a)=>{try{n.d(e,{Z:()=>l});var s=n(31),r=n(888),i=n(590),o=n(92),c=t([s,r,o]);[s,r,o]=c.then?(await c)():c;class d{static updateWinners(){var t;const e=window.location.hash.slice(1);null===(t=document.getElementById("winners"))||void 0===t||t.remove();const n=new r.Z,a=n.render();a.id="winners","garage"===e&&(a.style.display="none"),n.listen(a),d.container.append(a)}static renderPages(t){const e=new s.Z,n=e.render();n.id="garage",e.listen(n),d.container.append(n);const a=new r.Z,i=a.render();i.id="winners",a.listen(i),d.container.append(i),t?"garage"===t?document.getElementById("winners").style.display="none":document.getElementById("garage").style.display="none":i.style.display="none"}static hiddenPage(t){"garage"===t?(document.getElementById("winners").style.display="none",document.getElementById("garage").style.display="block"):(document.getElementById("winners").style.display="block",document.getElementById("garage").style.display="none")}constructor(){this.header=new i.Z("header","header")}run(){const t=window.location.hash.slice(1);d.container.append(this.header.render()),d.renderPages(t||"garage"),o.Z.enableRouteChange()}}d.container=document.body;const l=d;a()}catch(t){a(t)}}))},31:(t,e,n)=>{n.a(t,(async(t,a)=>{try{n.d(e,{Z:()=>b});var s=n(414),r=n(248),i=n(272),o=n(92),c=n(437),d=n(191),l=t([r,i,o,d]);[r,i,o,d]=l.then?(await l)():l;let u=!0,g=!0,m=!0;const h=Math.ceil(Number(r.Z.carsCount)/7);r.Z.carsPage<h&&(g=!1);class p extends s.Z{render(){const t=p.TextObject.GarageTitle;return this.container.innerHTML=`\n    <div class='message-block' id='message'></div>\n    <form class="create-block block">\n      <input type='text' class='input create-text' name='form-text'>\n      <input type='color' class='input input-color create-color' name='form-color'>\n      <button class="button" id='create-button'>create</button>\n    </form>\n    <form class="update-block block" ${u?"disabled":""}>\n      <input type='text' class='input' name='form-text' ${u?"disabled":""}>\n      <input type='color' class='input input-color' name='form-color' ${u?"disabled":""}>\n      <button class="button update-button" ${u?"disabled":""}>update</button>\n    </form>\n    <div class="race-block block">\n      <button class="button race-button" id="race">race</button>\n      <button class="button reset-button" id="reset" disabled=true>reset</button>\n      <button class="button generate-button">generate cars</button>\n    </div>\n    <h1>${t} (${r.Z.carsCount})</h1>\n    <div class='pagination'>\n      <button class='page-prev button' ${m?"disabled":""} id='prev-garage-page'><i class="fa-solid fa-chevron-left"></i></button>\n      <div>Page: ${r.Z.carsPage}</div>\n      <button class='page-next button' ${g?"disabled":""} id='next-garage-page'><i class="fa-solid fa-chevron-right"></i></button>\n    </div>\n    ${o.Z.renderGarage()}\n    `,this.container}listen(t){let e;t.addEventListener("click",(async t=>{const n=t.target.parentNode,a=t.target;if(n){if(n.className.includes("remove-button")){const t=Number(n.id.replace("remove-car-",""));await(0,c.tD)(t),await(0,c.BS)(t),await(0,o.g)(),await o.Z.updateStateWinners(),d.Z.updateWinners(),this.render()}n.className.includes("select-button")&&(e=Number(n.id.replace("select-car-","")),u=!1,this.render()),n.className.includes("start-button")&&(e=Number(n.id.replace("start-engine-car-","")),await o.Z.startDriving(e)),n.className.includes("stop-button")&&(e=Number(n.id.replace("stop-engine-car-","")),await o.Z.stopDriving(e)),n.className.includes("page-next")&&r.Z.carsPage<h&&(m=!1,r.Z.carsPage+=1,r.Z.carsPage===h&&(g=!0),await(0,o.g)(),this.render()),n.className.includes("page-prev")&&r.Z.carsPage>1&&(g=!1,r.Z.carsPage-=1,1===r.Z.carsPage&&(m=!0),await(0,o.g)(),this.render())}if(a){if(a.className.includes("generate-button")){const t=(0,i.cj)();g=!1,t.forEach((async t=>{await(0,c.DT)(t),await(0,o.g)(),this.render()}))}if(a.className.includes("race-button")){a.disabled=!0;const t=await(0,i.S3)(o.Z.startDriving);await(0,c.AV)(t),await o.Z.updateStateWinners(),d.Z.updateWinners();const e=document.getElementById("message");e&&(e.innerHTML=`${t.name} went first ${t.time}s!`,e.classList.toggle("visible",!0)),document.getElementById("reset").disabled=!1}if(a.className.includes("reset-button")){a.disabled=!0,r.Z.cars.map((({id:t})=>o.Z.stopDriving(t)));const t=document.getElementById("message");null==t||t.classList.toggle("visible",!1),document.getElementById("race").disabled=!1}}})),t.addEventListener("submit",(async t=>{t.preventDefault();const n=null==t?void 0:t.target,a=new FormData(n);let s=a.get("form-text"),r=a.get("form-color");s||(s=""),r||(r="#000000");const i={name:s,color:r};t.target.className.includes("create-block")&&await(0,c.DT)(i),t.target.className.includes("update-block")&&(await(0,c.Bo)(e,i),u=!0),await(0,o.g)(),this.render()}))}}p.TextObject={GarageTitle:"Garage"};const b=p;a()}catch(t){a(t)}}))},590:(t,e,n)=>{n.d(e,{Z:()=>i});class a{constructor(t,e){this.container=document.createElement(t),this.container.className=e}render(){return this.container}}var s;!function(t){t.GaragePage="garage",t.WinnersPage="winners"}(s||(s={}));const r=[{id:s.GaragePage,text:"Garage"},{id:s.WinnersPage,text:"Winners"}],i=class extends a{renderPageButtons(){const t=document.createElement("div");t.className="header-buttons",r.forEach((e=>{const n=document.createElement("a");n.href=`#${e.id}`,n.innerText=e.text,n.className="header-button button",t.append(n)})),this.container.append(t)}render(){return this.renderPageButtons(),this.container}}},888:(t,e,n)=>{n.a(t,(async(t,a)=>{try{n.d(e,{Z:()=>l});var s=n(414),r=n(248),i=n(92),o=n(272),c=t([r,i,o]);[r,i,o]=c.then?(await c)():c;class d extends s.Z{constructor(){super(...arguments),this.nextPage=!1,this.prevPage=!0,this.maxPages=Math.ceil(Number(r.Z.winnersCount)/10)}render(){r.Z.winnersPage>=this.maxPages&&(this.nextPage=!0);const t=d.TextObject.WinnersTitle;return this.container.innerHTML=`\n    <h1>${t} (${r.Z.winnersCount})</h1>\n    <div class='pagination'>\n      <button class='page-prev button' ${this.prevPage?"disabled":""}><i class="fa-solid fa-chevron-left"></i></button>\n      <div>Page: ${r.Z.winnersPage}</div>\n      <button class='page-next button' ${this.nextPage?"disabled":""}><i class="fa-solid fa-chevron-right"></i></button>\n    </div>\n    <table class='table'>\n      <tr class='table-row head-row'>\n        <th class='table-col-head' id='sort-by-id'>№</th>\n        <th class='table-col-head'>Car</th>\n        <th class='table-col-head'>Name</th>\n        <th class='table-col-head col-wins' id='sort-by-wins'>\n          Wins \n          ${(0,o.r$)("wins")}\n        </th>\n        <th class='table-col-head col-time' id='sort-by-time'>\n          Best time(s) \n          ${(0,o.r$)("time")}\n        </th>\n      </tr>\n      <tbody>\n      ${r.Z.winners.map(((t,e)=>`<tr class='table-row'>\n        <td class='table-col'>${e+1+10*(r.Z.winnersPage-1)}</td>\n        <td class='table-col col-img'>${i.Z.renderCarImage(t.car.color)}</td>\n        <td class='table-col'>${t.car.name}</td>\n        <td class='table-col'>${t.wins}</td>\n        <td class='table-col'>${t.time}</td>\n      </tr>`)).join("")}\n      </tbody>\n    </table>\n    `,this.container}listen(t){t.addEventListener("click",(async t=>{const e=t.target.parentNode,n=t.target;e.className.includes("page-next")&&r.Z.winnersPage<this.maxPages&&(this.prevPage=!1,r.Z.winnersPage+=1,r.Z.winnersPage===this.maxPages&&(this.nextPage=!0),await i.Z.updateStateWinners(),this.render()),e.className.includes("page-prev")&&r.Z.winnersPage>1&&(this.nextPage=!1,r.Z.winnersPage-=1,1===r.Z.winnersPage&&(this.prevPage=!0),await i.Z.updateStateWinners(),this.render()),"sort-by-wins"===n.id&&(r.Z.sortBy="wins",r.Z.sortOrder="DESC"===r.Z.sortOrder?"ASC":"DESC",await i.Z.updateStateWinners(),this.render()),"sort-by-time"===n.id&&(r.Z.sortBy="time",r.Z.sortOrder="DESC"===r.Z.sortOrder?"ASC":"DESC",await i.Z.updateStateWinners(),this.render())}))}}d.TextObject={WinnersTitle:"Winners"};const l=d;a()}catch(t){a(t)}}))},414:(t,e,n)=>{n.d(e,{Z:()=>s});class a{constructor(){this.container=document.createElement("div")}render(){return this.container}}a.TextObject={};const s=a},253:(t,e,n)=>{n.a(t,(async(t,e)=>{try{n(11);var a=n(191),s=t([a]);(new((a=(s.then?(await s)():s)[0]).Z)).run(),e()}catch(t){e(t)}}))},92:(t,e,n)=>{n.a(t,(async(t,a)=>{try{n.d(e,{Z:()=>m,g:()=>u});var s=n(191),r=n(437),i=n(248),o=n(272),c=t([s,i,o]);[s,i,o]=c.then?(await c)():c;const d=t=>`\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="70"><path fill="${t}" d="M107 74c-28 0-73 5-73 5s6 1 5 4-13 17-16 19c-2 2-5 2-8 2l-2 4c-5 8-4 17-4 16v1c-7 4-8 6-9 7l1 21c1 2 8 6 12 8a27 27 0 0 1 8-21 27 27 0 0 1 46 19l-1 7h121a27 27 0 1 1 52-1c5 0 14-2 15-4 1-3 3-17 1-25-2-7-13-21-52-29-44-25-63-31-89-33h-7zm2 4c6 0 31 1 56 14 9 5 33 17 30 19-13 11-22-3-86-5l-2-28h2zm-14 0h4l-1 28-55-3c-2-2 8-16 20-21 10-3 25-4 32-4zm126 37h3c2 1 11 4 17 8l9 9c-7 2-32-14-31-16l2-1zm-25 7h10l-3 2h-4l-3-2zm17 13a23 23 0 1 0 0 46 23 23 0 0 0 0-46zm-173 1a23 23 0 1 0 0 46 23 23 0 0 0 0-46zm173 9c3 0 7 2 9 4s4 6 4 9-2 7-4 9-6 4-9 4-7-2-9-4-4-6-4-9 2-7 4-9 6-4 9-4zm-173 1c3 0 6 2 9 4 2 2 3 6 3 9s-1 7-3 9c-3 2-6 4-9 4-4 0-7-2-9-4-3-2-4-6-4-9s1-7 4-9c2-2 5-4 9-4z"/></svg>\n`,l=({id:t,name:e,color:n,isEngineStarted:a})=>`\n<div class='car-block'>\n  <div class='car-settings'>\n    <button class="button select-button fa-solid fa-check" id="select-car-${t}"><i class="fa-solid fa-check"></i></button>\n    <button class="button remove-button" id="remove-car-${t}"><i class="fa-solid fa-xmark"></i></button>\n    <button class="button start-button" id="start-engine-car-${t}" ${a?"disabled":""}><i class="fa-solid fa-play"></i></button>\n    <button class="button stop-button" id="stop-engine-car-${t}" ${a?"":"disabled"}><i class="fa-solid fa-arrow-rotate-left"></i></button>\n    <span class='car-name'>${e}</span>\n  </div>\n  <div class='road'>\n    <div class='car' id='car-${t}'>\n      ${d(n)}\n    </div>\n    <div class='flag' id='flag-${t}'>🏁</div>\n  </div> \n</div>\n`,u=async()=>{const{items:t,count:e}=await(0,r.Rn)(i.Z.carsPage);i.Z.cars=t,i.Z.carsCount=e};function g(){window.addEventListener("hashchange",(()=>{const t=window.location.hash.slice(1);s.Z.hiddenPage(t)}))}const m={renderGarage:()=>`\n  <ul class='garage-list'>\n    ${i.Z.cars.map((t=>`\n    <li>${l(t)}</li>\n    `)).join("")}\n  </ul>\n`,startDriving:async t=>{const e=document.getElementById(`start-engine-car-${t}`);e instanceof HTMLButtonElement&&(e.disabled=!0);const{velocity:n,distance:a}=await(0,r.p6)(t),s=Math.round(a/n);e instanceof HTMLButtonElement&&(e.disabled=!0),document.getElementById(`stop-engine-car-${t}`).disabled=!1;const c=document.getElementById(`car-${t}`),d=document.getElementById(`flag-${t}`),l=Math.floor((0,o.hG)(c,d))+70;i.Z.animation[t]=(0,o.oQ)(c,l,s);const{success:u}=await(0,r.Ag)(t);return u||window.cancelAnimationFrame(i.Z.animation[t].id),{success:u,id:t,time:s}},stopDriving:async t=>{const e=document.getElementById(`stop-engine-car-${t}`);e instanceof HTMLButtonElement&&(e.disabled=!0),await(0,r.yQ)(t),document.getElementById(`start-engine-car-${t}`).disabled=!1;const n=document.getElementById(`car-${t}`);n&&(n.style.transform="translateX(0)"),i.Z.animation[t]&&window.cancelAnimationFrame(i.Z.animation[t].id)},renderCarImage:d,updateStateWinners:async()=>{const{items:t,count:e}=await(0,r.ix)({page:i.Z.winnersPage,sort:i.Z.sortBy,order:i.Z.sortOrder});i.Z.winners=t,i.Z.winnersCount=e},enableRouteChange:g};a()}catch(h){a(h)}}))},437:(t,e,n)=>{n.d(e,{AV:()=>w,Ag:()=>h,BS:()=>b,Bo:()=>u,DT:()=>d,Rn:()=>o,ix:()=>p,p6:()=>g,tD:()=>l,yQ:()=>m});const a="http://localhost:3000",s=`${a}/garage`,r=`${a}/engine`,i=`${a}/winners`;async function o(t,e=7){const n=await fetch(`${s}?_page=${t}&_limit=${e}`);return{items:await n.json(),count:n.headers.get("X-Total-count")}}const c=async t=>(await fetch(`${s}/${t}`)).json(),d=async t=>(await fetch(s,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})).json(),l=async t=>(await fetch(`${s}/${t}`,{method:"DELETE"})).json(),u=async(t,e)=>(await fetch(`${s}/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json(),g=async t=>(await fetch(`${r}?id=${t}&status=started`,{method:"PATCH"})).json(),m=async t=>(await fetch(`${r}?id=${t}&status=stopped`,{method:"PATCH"})).json(),h=async t=>{const e=await fetch(`${r}?id=${t}&status=drive`,{method:"PATCH"}).catch();return 200!==e.status?{success:!1}:Object.assign({},await e.json())},p=async({page:t,limit:e=10,sort:n,order:a})=>{const s=await fetch(`${i}?_page=${t}&_limit=${e}${((t,e)=>t&&e?`&_sort=${t}&_order=${e}`:"")(n,a)}`),r=await s.json();return{items:await Promise.all(r.map((async t=>Object.assign(Object.assign({},t),{car:await c(t.id)})))),count:s.headers.get("X-Total-count")}},b=async t=>(await fetch(`${i}/${t}`,{method:"DELETE"})).json(),w=async({id:t,time:e})=>{const n=await(async t=>(await fetch(`${i}/${t}`)).status)(t);if(404===n)await(async t=>(await fetch(`${i}`,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})).json())({id:t,wins:1,time:e});else{const n=await(async t=>(await fetch(`${i}/${t}`)).json())(t);await(async(t,e)=>(await fetch(`${i}/${t}`,{method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json())(t,{id:t,wins:n.wins+1,time:e<n.time?e:n.time})}}},248:(t,e,n)=>{n.a(t,(async(t,a)=>{try{n.d(e,{Z:()=>c});var s=n(437);const{items:t,count:r}=await(0,s.Rn)(1),{items:i,count:o}=await(0,s.ix)({page:1,limit:10,sort:null,order:null}),c={carsPage:1,cars:t,carsCount:r,animation:{},winnersPage:1,winners:i,winnersCount:o,sortBy:"id",sortOrder:"DESC",view:"garage"};a()}catch(t){a(t)}}),1)},272:(t,e,n)=>{n.a(t,(async(t,a)=>{try{n.d(e,{S3:()=>p,cj:()=>m,hG:()=>o,oQ:()=>c,r$:()=>b});var s=n(248),r=t([s]);function i(t){const{top:e,left:n,width:a,height:s}=t.getBoundingClientRect();return{x:n+a/2,y:e+s/2}}function o(t,e){const n=i(t),a=i(e);return Math.hypot(n.x-a.x,n.y-a.y)}function c(t,e,n){let a=0;const s={};return s.id=window.requestAnimationFrame((function r(i){a||(a=i);const o=i-a,c=Math.round(o*(e/n));t.style.transform=`translateX(${Math.min(c,e)}px)`,c<e&&(s.id=window.requestAnimationFrame(r))})),s}s=(r.then?(await r)():r)[0];const d=["Audi","BMW","Ford","Honda","Hyundai","Kia","Lada","Mazda","Toyota","Subaru"],l=["A6","Cabriolet","Sport","TT","Caprice","Daster","Matiz","Tornado","Volt","EV8"],u=()=>`${d[Math.floor(Math.random()*d.length)]} ${l[Math.floor(Math.random()*d.length)]}`,g=()=>{let t="#";for(let e=0;e<6;e+=1)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return t},m=(t=100)=>new Array(t).fill(1).map((()=>({name:u(),color:g()}))),h=async(t,e)=>{const{success:n,id:a,time:r}=await Promise.race(t);if(!n){const n=e.findIndex((t=>t===a)),s=[...t.slice(0,n),...t.slice(n+1,t.length)],r=[...e.slice(0,n),...e.slice(n+1,e.length)];return h(s,r)}return Object.assign(Object.assign({},s.Z.cars.find((t=>t.id===a))),{time:+(r/1e3).toFixed(2)})},p=async t=>{const e=s.Z.cars.map((({id:e})=>t(e)));return await h(e,s.Z.cars.map((t=>t.id)))};function b(t){return s.Z.sortBy===t?"DESC"===s.Z.sortOrder?"▼":"▲":""}a()}catch(w){a(w)}}))},606:(t,e,n)=>{t.exports=n.p+"assets/favicon.ico"}},r={};function i(t){var e=r[t];if(void 0!==e)return e.exports;var n=r[t]={exports:{}};return s[t](n,n.exports,i),n.exports}i.m=s,t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",n="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",a=t=>{t&&!t.d&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},i.a=(s,r,i)=>{var o;i&&((o=[]).d=1);var c,d,l,u=new Set,g=s.exports,m=new Promise(((t,e)=>{l=e,d=t}));m[e]=g,m[t]=t=>(o&&t(o),u.forEach(t),m.catch((t=>{}))),s.exports=m,r((s=>{var r;c=(s=>s.map((s=>{if(null!==s&&"object"==typeof s){if(s[t])return s;if(s.then){var r=[];r.d=0,s.then((t=>{i[e]=t,a(r)}),(t=>{i[n]=t,a(r)}));var i={};return i[t]=t=>t(r),i}}var o={};return o[t]=t=>{},o[e]=s,o})))(s);var i=()=>c.map((t=>{if(t[n])throw t[n];return t[e]})),d=new Promise((e=>{(r=()=>e(i)).r=0;var n=t=>t!==o&&!u.has(t)&&(u.add(t),t&&!t.d&&(r.r++,t.push(r)));c.map((e=>e[t](n)))}));return r.r?d:i()}),(t=>(t?l(m[n]=t):d(g),a(o)))),o&&(o.d=0)},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),i.b=document.baseURI||self.location.href,i(253)})();
//# sourceMappingURL=main.js.map