(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}})();document.querySelector("#app").innerHTML=`
  <div>
    <i>Click on the id to copy</i>
    <h1>Press Genarate</h1>
    <button type="button">Genarate</button>
  </div>
`;var c=document.querySelector("h1"),d=document.querySelector("button");function a(){let e="";for(let n=2;n<10;n++){let t=Math.floor(Math.random()*3),i;t===0?i=Math.floor(Math.random()*(90-65+1))+65:t===1?i=Math.floor(Math.random()*(122-97+1))+97:i=Math.floor(Math.random()*(57-48+1))+48,e+=String.fromCharCode(i)}return e}let l;function u(){let e;if(e=a(),localStorage.getItem("randos")){let t=JSON.parse(localStorage.getItem("randos"));t.includes(e)?(e=a(),t.includes(e)?(e=a(),t.includes(e)?(e=a(),t.includes(e)?alert(`DUDE YOUR LUCK IS BAD!
 reload and try again, sorry!`):(t.push(e),localStorage.setItem("randos",JSON.stringify(t)),l=e)):(t.push(e),localStorage.setItem("randos",JSON.stringify(t)),l=e)):(t.push(e),localStorage.setItem("randos",JSON.stringify(t)),l=e)):(t.push(e),localStorage.setItem("randos",JSON.stringify(t)),l=e)}else{var n=[];n.push(e),localStorage.setItem("randos",JSON.stringify(n)),l=e}}d.addEventListener("click",()=>{u(),c.textContent="Loading",setTimeout(()=>c.textContent=l,500)});c.addEventListener("click",()=>{var e=document.querySelector("h1");e.select(),e.setSelectionRange(0,99999),navigator.clipboard.writeText(e.value),alert("Copied: "+e.value)});