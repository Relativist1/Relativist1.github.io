(()=>{'use strict';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,coarse=matchMedia('(pointer: coarse)').matches;
const $=id=>document.getElementById(id),wrap=$('scene'),readout=$('fov');
const main=document.querySelector('main'),fixedStop=main&&main.dataset.stop!==undefined?+main.dataset.stop:null;
const stops=[...document.querySelectorAll('[data-stop]')],dives=[...document.querySelectorAll('[data-dive]')];
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x)),lerp=(a,b,f)=>a+(b-a)*f;
let vw=innerWidth,vh=innerHeight,T=fixedStop||0,Ts=T;

/* Camera journey, one keyframe per home-page section. r in M (GM/c\u00b2), th = inclination from the spin axis, ph = azimuth,
   look = yaw away from the hole (180 = facing outward), at/atM = where the hole sits on screen, fov = tan(half vertical angle). */
const KEY=[
 {r:120,th:80,ph:-25,fov:.30,roll:-14,look:0,at:[.95,.4],atM:[.5,.2],dim:.95},   // far view
 {r:42,th:17,ph:20,fov:.36,roll:0,look:0,at:[.8,.5],atM:[.5,.28],dim:.42},      // as seen from Earth, i \u2248 17\u00b0
 {r:30,th:80,ph:80,fov:.5,roll:4,look:0,at:[.72,.42],atM:[.5,.3],dim:.85},      // open stage: the visitor takes the camera
 {r:13,th:86,ph:110,fov:.6,roll:6,look:0,at:[.74,.42],atM:[.5,.28],dim:.36},    // skimming the disk
 {r:6,th:76,ph:135,fov:.78,roll:10,look:0,at:[.8,.5],atM:[.72,.3],dim:.32},     // at the photon ring
 {r:4.4,th:73,ph:150,fov:.84,roll:5,look:0,at:[.82,.5],atM:[.6,.4],dim:.32},    // close to the ring, looking past it
 {r:3.4,th:70,ph:165,fov:.9,roll:0,look:0,at:[.5,.5],atM:[.5,.5],dim:.42},      // the shadow fills the view
 {r:2.7,th:77,ph:190,fov:.95,roll:0,look:180,at:[.5,.44],atM:[.5,.36],dim:.8}]; // just outside the hole, facing out across the disk // just outside the hole, facing out across the disk
const pageDim=fixedStop===null?1:.5;
const user={th:null,r:null};
function camAt(t){const small=vw<760,i=clamp(Math.floor(t),0,KEY.length-2),f0=clamp(t-i,0,1),f=f0*f0*f0*(f0*(6*f0-15)+10),A=KEY[i],B=KEY[i+1],k=small?'atM':'at',d=lerp(A.dim,B.dim,f);
  const c={r:Math.exp(lerp(Math.log(A.r),Math.log(B.r),f)),th:lerp(A.th,B.th,f),ph:lerp(A.ph,B.ph,f),fov:lerp(A.fov,B.fov,f),roll:lerp(A.roll,B.roll,f),look:lerp(A.look,B.look,f),
    ax:lerp(A[k][0],B[k][0],f),ay:lerp(A[k][1],B[k][1],f),dim:(d+.55*Math.sin(Math.PI*f)*(1-d))*pageDim};
  const w=clamp(1-Math.abs(t-2)*1.6,0,1);if(user.th!==null)c.th=lerp(c.th,user.th,w);if(user.r!==null)c.r=Math.exp(lerp(Math.log(c.r),Math.log(user.r),w));return c}

/* renderer: the Kerr engine where WebGL2 float targets exist, otherwise (or after a GPU reset) the lighter WebGL1 tracer */
let engine=null,view=$('view'),mode='live Kerr';
function freshCanvas(){const c=document.createElement('canvas');c.id='view';view.replaceWith(c);view=c;return c}
function showPoster(){engine=null;mode='still image';wrap.classList.add('poster','ready');view.hidden=true}
function startFallback(){try{engine=new BH.FallbackRenderer(freshCanvas());engine.resize(vw,vh);mode='live, light';return true}catch(e){console.warn('No WebGL renderer available, showing a still image',e);showPoster();return false}}
try{engine=new BH.BlackHoleEngine(view,{spin:.9,diskOuter:22,pixelRatio:Math.min(devicePixelRatio||1,1),liveScale:coarse?.28:.38});engine.resize(vw,vh)}
catch(e){console.warn('Kerr renderer unavailable, using fallback',e);startFallback()}

const navLinks=[...document.querySelectorAll('#nav a[href^="#"]')];
navLinks.forEach(a=>{const el=document.querySelector(a.getAttribute('href'));a.dataset.idx=el?stops.indexOf(el.closest('section')):-1});
function measure(){if(fixedStop!==null)return;let t=0;const y=scrollY;for(const d of dives)t+=clamp((y+.55*vh-d.offsetTop)/d.offsetHeight,0,1);
  T=t;const here=Math.round(t);navLinks.forEach(a=>a.classList.toggle('here',a.dataset.idx==here))}
addEventListener('resize',()=>{if(innerWidth===vw&&Math.abs(innerHeight-vh)<120)return;vw=innerWidth;vh=innerHeight;if(engine)engine.resize(vw,vh);measure()});
addEventListener('scroll',measure,{passive:true});
measure();Ts=T;
let last=0,shown=false,glide=null;
/* a menu jump: blend the camera straight from where it was to the new section's view */
const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function blendCam(a,b,f){const o={};for(const k in b)o[k]=k==='r'?Math.exp(lerp(Math.log(a.r),Math.log(b.r),f)):lerp(a[k],b[k],f);return o}
(function loop(now){requestAnimationFrame(loop);if(document.hidden)return;const dt=last?Math.min(now-last,100):16;last=now;
  if(reduce)Ts=T;else{Ts+=(T-Ts)*(1-Math.exp(-dt/320));if(Math.abs(T-Ts)<.0004)Ts=T}
  let c=camAt(Ts);if(glide){const f=clamp((now-glide.t0)/glide.dur,0,1);c=blendCam(glide.from,c,ease(f));c.dim=Math.min(c.dim,lerp(glide.from.dim,camAt(Ts).dim,ease(f))+.25*Math.sin(Math.PI*f));if(f>=1)glide=null}
  if(readout)readout.textContent=`r = ${c.r<10?c.r.toFixed(1):Math.round(c.r)} M \u00b7 i = ${Math.round(c.th)}\u00b0 \u00b7 ${mode}`;
  if(!engine)return;
  try{engine.frame(now,c,!reduce)}catch(e){console.warn(e);engine.lost=true}
  if(engine.lost){const wasKerr=engine instanceof BH.BlackHoleEngine;engine=null;if(!(wasKerr&&startFallback()))return}
  if(!shown){shown=true;wrap.classList.add('ready')}})(0);

/* camera sliders (home page, Simulations section) */
const incl=$('incl'),dist=$('dist');
if(incl&&dist){const io=$('incl-out'),dout=$('dist-out'),distR=v=>8*Math.pow(200/8,v/100),dist0=Math.round(100*Math.log(30/8)/Math.log(25));
  const show=()=>{io.textContent=incl.value+'\u00b0';const r=distR(+dist.value);dout.textContent=(r<10?r.toFixed(1):Math.round(r))+' M'};
  incl.addEventListener('input',()=>{user.th=+incl.value;show()});dist.addEventListener('input',()=>{user.r=distR(+dist.value);show()});
  $('reset').addEventListener('click',()=>{user.th=user.r=null;incl.value=80;dist.value=dist0;show()});dist.value=dist0;show()}

/* fit the home portrait (3:4) to the height of the intro text beside it */
const hero=document.querySelector('.hero'),heroText=document.querySelector('.hero-text');
function fitPortrait(){if(!hero)return;if(innerWidth<=900){hero.style.removeProperty('--pw');return}
  let w=300;for(let i=0;i<6;i++){hero.style.setProperty('--pw',w+'px');const nw=clamp(heroText.offsetHeight*.95,280,hero.clientWidth*.42);if(Math.abs(nw-w)<1)break;w=w+.6*(nw-w)}
  hero.style.setProperty('--pw',Math.round(w)+'px')}
fitPortrait();addEventListener('resize',fitPortrait);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitPortrait);

/* section links: the text dissolves and reappears at the new section while the black hole glides directly to its new view */
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.getAttribute('href').slice(1),el=id&&document.getElementById(id);if(!el)return;
  e.preventDefault();const from=camAt(Ts);
  const go=()=>{scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'});measure();Ts=T;try{history.replaceState(null,'','#'+id)}catch(_){}};
  if(reduce){go();return}
  main.classList.add('swap');setTimeout(()=>{go();glide={from,t0:performance.now(),dur:1500};requestAnimationFrame(()=>requestAnimationFrame(()=>main.classList.remove('swap')))},260)});
if(location.hash&&fixedStop===null){const el=document.getElementById(location.hash.slice(1));if(el){scrollTo(0,el.getBoundingClientRect().top+scrollY);measure();Ts=T}}

/* Simulations drop-down: hover on desktop, tap to open */
document.querySelectorAll('.dd').forEach(dd=>{const b=dd.querySelector('.dd-btn');b.addEventListener('click',()=>{const o=dd.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  document.addEventListener('click',e=>{if(!dd.contains(e.target)){dd.classList.remove('open');b.setAttribute('aria-expanded','false')}})});

const mb=$('menu-btn'),nav=$('nav');mb.addEventListener('click',()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.closest('.dd-btn'))return;nav.classList.remove('open');mb.setAttribute('aria-expanded','false')});
})();
