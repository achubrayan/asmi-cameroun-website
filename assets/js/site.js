/* ASMI-Cameroun V6 — shared behaviour */
(()=>{
const D=document,$=s=>D.querySelector(s),$$=s=>[...D.querySelectorAll(s)],FR=D.documentElement.lang==='fr',RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
D.documentElement.classList.add('js');
/* chrome */
const sb=D.createElement('div');sb.className='scroll-bar';D.body.prepend(sb);
const gl=D.createElement('div');gl.className='glow';D.body.append(gl);
const tt=D.createElement('button');tt.className='to-top';tt.setAttribute('aria-label',FR?'Haut de page':'Back to top');tt.textContent='↑';tt.onclick=()=>scrollTo({top:0});D.body.append(tt);
const hd=$('.site-header'),nav=$('[data-main-nav]'),mb=$('[data-menu-button]'),pars=$$('[data-par]');
addEventListener('scroll',()=>{const y=scrollY,h=D.body.scrollHeight-innerHeight;sb.style.width=(h>0?y/h*100:0)+'%';hd&&hd.classList.toggle('scrolled',y>30);tt.classList.toggle('on',y>700);
pars.forEach(p=>{const r=p.parentElement.getBoundingClientRect();p.style.transform=`translateY(${(r.top-innerHeight/2)*-.05}px)`})},{passive:true});
addEventListener('pointermove',e=>{gl.style.left=e.clientX+'px';gl.style.top=e.clientY+'px'},{passive:true});
mb&&nav&&mb.addEventListener('click',()=>{const o=nav.classList.toggle('open');mb.classList.toggle('active',o);mb.setAttribute('aria-expanded',o)});
$$('[data-dropdown-toggle]').forEach(b=>b.addEventListener('click',e=>{if(matchMedia('(max-width:1080px)').matches){e.preventDefault();const it=b.closest('.nav-item'),w=!it.classList.contains('open');$$('.nav-item.open').forEach(x=>x!==it&&x.classList.remove('open'));it.classList.toggle('open',w);b.setAttribute('aria-expanded',w)}}));
$$('[data-lang-choice]').forEach(l=>l.addEventListener('click',()=>{if(getC()==='accepted'){try{localStorage.setItem('asmiLanguage',l.dataset.langChoice)}catch(_){}}}));
$$('[data-current-year]').forEach(n=>n.textContent=new Date().getFullYear());

/* privacy consent: shown once per browser, on any page */
const CK='asmiConsent';let memC=null;
function getC(){try{return localStorage.getItem(CK)}catch(_){return memC}}
function setC(v){memC=v;try{localStorage.setItem(CK,v)}catch(_){}}
function loadFonts(){if(D.getElementById('asmi-fonts'))return;const l=D.createElement('link');l.id='asmi-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;600;800&display=swap';D.head.append(l)}
function applyC(v){if(v==='accepted')loadFonts();else{try{localStorage.removeItem('asmiLanguage')}catch(_){}}}
const CT=FR?{t:'Vos choix de confidentialité',p:'Nous n’utilisons aucun cookie publicitaire, d’analyse ou de suivi. Si vous acceptez, nous mémorisons votre langue et chargeons nos polices depuis Google Fonts. Si vous refusez, nous utilisons les polices par défaut de votre navigateur et ne mémorisons que ce choix.',a:'Accepter',d:'Refuser',m:'En savoir plus',u:'confidentialite-donnees-ethique.html#storage'}:{t:'Your privacy choices',p:'We use no advertising, analytics or tracking cookies. If you accept, we remember your language and load our fonts from Google Fonts. If you decline, we use your browser’s default fonts and remember nothing except this choice.',a:'Accept',d:'Decline',m:'Learn more',u:'privacy-data-ethics.html#storage'};
function showConsent(){if(D.getElementById('asmi-consent'))return;const b=D.createElement('div');b.id='asmi-consent';b.className='consent';b.setAttribute('role','dialog');b.setAttribute('aria-labelledby','cs-t');b.setAttribute('aria-describedby','cs-p');
b.innerHTML=`<div class="cs-ico"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg></div><div class="cs-body"><strong id="cs-t">${CT.t}</strong><p id="cs-p">${CT.p} <a href="${CT.u}">${CT.m}</a></p></div><div class="cs-act"><button type="button" class="btn btn-primary btn-small" data-cs="accepted">${CT.a}</button><button type="button" class="btn btn-dark-outline btn-small" data-cs="declined">${CT.d}</button></div>`;
D.body.append(b);requestAnimationFrame(()=>b.classList.add('show'));
b.querySelectorAll('[data-cs]').forEach(x=>x.addEventListener('click',()=>{const v=x.dataset.cs;setC(v);applyC(v);b.classList.remove('show');setTimeout(()=>b.remove(),500)}));}
const c0=getC();if(c0){applyC(c0)}else{setTimeout(showConsent,700)}
$$('[data-consent-open]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();try{localStorage.removeItem(CK)}catch(_){}memC=null;showConsent()}));

$$('a[href^="#"]').forEach(l=>l.addEventListener('click',()=>{nav&&nav.classList.remove('open');mb&&mb.classList.remove('active')}));
/* reveal */
const sel='.card,.pillar-card,.process-step,.news-card,.contact-card,.section-head,.center-head,.callout,.progress-card,.image-frame,.table-wrap,.trust-item,.data-node,.content-stack,.legal-banner,.cta-band,.quote-panel,.portrait,.check-list li,.tag,form,.tp,.gc,.pc,.chk,.dash,.pipe,.fin,.ph,.campaign,.trust,.tr-item,.nws';
$$(sel).forEach((e,i)=>{if(!e.closest('.hero')){e.classList.add('rv');const sib=[...e.parentElement.children].filter(c=>c.classList.contains('rv')||c.matches(sel));e.style.transitionDelay=Math.min(sib.indexOf(e),6)*.09+'s'}});
/* progress fill + count-up */
const cnt=(el,to,dec,dur=2200,suf='')=>{const t0=performance.now(),f=t=>{const k=Math.min((t-t0)/dur,1),v=to*(1-Math.pow(1-k,3));el.textContent=(FR?v.toFixed(dec).replace('.',','):v.toFixed(dec))+suf;k<1&&requestAnimationFrame(f)};requestAnimationFrame(f)};
const ring=$('#rg'),road=$('#road');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');
if(t.id==='road')road.style.setProperty('--p','100%');
const pf=t.querySelector('.progress-fill');if(pf){pf.style.width='15.3%';const s=t.querySelector('.progress-meta strong');s&&(RM?0:cnt(s,15.3,1,2200,FR?' %':'%'))}
if(ring&&(t===ring.closest('.ring'))){ring.style.transition='stroke-dashoffset 2.2s cubic-bezier(.2,.8,.2,1)';ring.style.strokeDashoffset=327*(1-.153);cnt($('#pc'),15.3,1)}
$$('#bud i').forEach(i=>t.id==='bud'&&(i.style.width=i.dataset.w+'%'));
io.unobserve(t)}),{threshold:.15});
$$('.rv,#road').forEach(e=>io.observe(e));
if(RM)$$('.progress-fill').forEach(p=>p.style.width='15.3%');
/* tilt */
$$('.card,.pillar-card,.pc,.tp,.gc').forEach(c=>{c.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-6px)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
/* network canvas: homepage hero (#cv) + inner page heroes */
const net=(cv,big)=>{const x=cv.getContext('2d'),d=Math.min(devicePixelRatio||1,2);let W,H,pts,hubs,mx=-9e3,my=-9e3;
const rs=()=>{W=cv.width=cv.offsetWidth*d;H=cv.height=cv.offsetHeight*d;pts=Array.from({length:Math.min(big?90:50,W/(big?18:26)|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3*d,vy:(Math.random()-.5)*.3*d}));
hubs=big?[[.58,.78,'Moungo'],[.68,.58,'Littoral'],[.8,.38,FR?'National':'National'],[.92,.16,FR?'Transfrontalier':'Cross-border']].map(h=>({x:h[0]*W,y:h[1]*H,n:h[2]})):[]};
rs();addEventListener('resize',rs);cv.parentElement.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect(),k=W/r.width;mx=(e.clientX-r.left)*k;my=(e.clientY-r.top)*k});
const draw=t=>{x.clearRect(0,0,W,H);
for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;if(Math.hypot(p.x-mx,p.y-my)<160*d){p.x+=(p.x-mx)*.012;p.y+=(p.y-my)*.012}
x.fillStyle='rgba(180,230,200,.55)';x.beginPath();x.arc(p.x,p.y,1.4*d,0,7);x.fill();
for(const q of pts){const s=Math.hypot(p.x-q.x,p.y-q.y);if(s<110*d){x.strokeStyle=`rgba(123,228,149,${.14*(1-s/(110*d))})`;x.lineWidth=d*.6;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}}
for(let i=0;i<hubs.length-1;i++){const a=hubs[i],b=hubs[i+1],cx=(a.x+b.x)/2-60*d,cy=(a.y+b.y)/2-30*d;x.strokeStyle='rgba(242,183,5,.5)';x.setLineDash([6*d,8*d]);x.lineDashOffset=-t/40*d;x.lineWidth=1.6*d;x.beginPath();x.moveTo(a.x,a.y);x.quadraticCurveTo(cx,cy,b.x,b.y);x.stroke();x.setLineDash([]);
const u=((t/2600)+i*.3)%1,px=(1-u)*(1-u)*a.x+2*(1-u)*u*cx+u*u*b.x,py=(1-u)*(1-u)*a.y+2*(1-u)*u*cy+u*u*b.y;x.fillStyle='#fff';x.shadowColor='#f2b705';x.shadowBlur=14*d;x.beginPath();x.arc(px,py,3*d,0,7);x.fill();x.shadowBlur=0}
hubs.forEach((h,i)=>{const r=(8+Math.sin(t/500+i)*3)*d,g=x.createRadialGradient(h.x,h.y,0,h.x,h.y,r*4);g.addColorStop(0,'rgba(242,183,5,.5)');g.addColorStop(1,'transparent');x.fillStyle=g;x.beginPath();x.arc(h.x,h.y,r*4,0,7);x.fill();x.fillStyle='#f2b705';x.beginPath();x.arc(h.x,h.y,4.5*d,0,7);x.fill();if(W>700*d){x.fillStyle='rgba(255,255,255,.8)';x.font=`700 ${11*d}px Manrope,sans-serif`;x.fillText(h.n.toUpperCase(),h.x+12*d,h.y+4*d)}});
RM||requestAnimationFrame(draw)};requestAnimationFrame(draw)};
const hc=$('#cv');if(hc)net(hc,true);
$$('.page-hero').forEach(h=>{const c=D.createElement('canvas');c.setAttribute('aria-hidden','true');h.prepend(c);net(c,false)});
/* survey embed + copy */
const sv=$('#svframe');if(sv){const close=()=>{sv.hidden=true;sv.querySelector('.sv-wrap').textContent=''};
$$('[data-embed]').forEach(b=>b.addEventListener('click',()=>{sv.hidden=false;sv.querySelector('h3').textContent=b.dataset.title;const w=sv.querySelector('.sv-wrap');w.textContent='';const f=D.createElement('iframe');f.src=b.dataset.embed;f.title=b.dataset.title;w.append(f);sv.querySelector('[data-open]').href=b.dataset.embed;sv.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}));
sv.querySelector('[data-close]').addEventListener('click',close)}
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const t=b.textContent;try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent=b.dataset.ok;setTimeout(()=>b.textContent=t,2200)}catch(_){prompt('',b.dataset.copy)}}));
/* homepage widgets */
const I=window.ASMI_I18N;
if(I){const P=$('#pipe');if(P){P.innerHTML=I.s.map((s,i)=>`<button class="st${i?'':' on'}" data-i="${i}"><i>0${i+1}</i><b>${s[0]}</b><small>${s[1]}</small></button>`).join('');
const sel2=i=>{[...P.children].forEach((c,j)=>c.classList.toggle('on',i==j));$('#dtx').textContent=I.s[i][2]};sel2(0);
P.onclick=e=>{const b=e.target.closest('.st');b&&sel2(+b.dataset.i)};let k=0;RM||setInterval(()=>{P.matches(':hover')||sel2(k=(k+1)%4)},4200)}
const rf=$('#rfs');if(rf){rf.innerHTML=I.f.map(f=>`<button class="rf" aria-pressed="false"><i>✓</i>${f}</button>`).join('');
const C=['#1f8a3b','#1f8a3b','#f2b705','#d9483b'];
rf.onclick=e=>{const b=e.target.closest('.rf');if(!b)return;b.classList.toggle('on');b.setAttribute('aria-pressed',b.classList.contains('on'));const n=rf.querySelectorAll('.on').length,j=n==0?0:n<2?1:n<4?2:3;
$('#arc').style.strokeDashoffset=251*(1-n/I.f.length);$('#arc').style.stroke=C[j];$('#gt').textContent=I.l[j][0];$('#gp').textContent=I.l[j][1]}}}
/* live campaign */
const nf=new Intl.NumberFormat(FR?'fr-FR':'en-US');
const T=FR?{ago:'Mis à jour',pl:'promesse',conf:'confirmé',pend:'en attente',demo:'Mode aperçu : le serveur n’est pas connecté, le compteur ne bouge que pour vous et rien n’est enregistré.',ok:'Merci ! Votre promesse est enregistrée. Notre trésorier vous contactera avec les coordonnées officielles de paiement.',err:'Veuillez vérifier les champs.',busy:'Envoi…',fail:'Envoi impossible pour le moment. Écrivez-nous sur WhatsApp.',sup:'Ils se sont engagés :'}:{ago:'Updated',pl:'pledge',conf:'confirmed',pend:'awaiting payment',demo:'Preview mode: the server isn’t connected, so the counter only moves for you and nothing is saved.',ok:'Thank you! Your pledge is recorded. Our treasurer will contact you with the official payment details.',err:'Please check the fields.',busy:'Sending…',fail:'Could not send right now. Please write to us on WhatsApp.',sup:'Recent supporters:'};
const roots=$$('[data-campaign]');
if(roots.length){let demo=false,st={confirmed:107000,pledged:0,pledgeCount:0,target:2880000,updated:'2026-09-20',supporters:[]},live=false,shown={};
const anim=(el,to)=>{const from=shown[el.dataset.c]??to;shown[el.dataset.c]=to;if(RM||from===to){el.textContent=nf.format(to);return}const t0=performance.now(),f=t=>{const k=Math.min((t-t0)/1200,1);el.textContent=nf.format(Math.round(from+(to-from)*(1-Math.pow(1-k,3))));k<1&&requestAnimationFrame(f)};requestAnimationFrame(f)};
const paint=()=>{const pc=Math.min(st.confirmed/st.target*100,100),pp=Math.min((st.confirmed+st.pledged)/st.target*100,100);
roots.forEach(r=>{r.querySelectorAll('[data-c]').forEach(e=>{const k=e.dataset.c;
if(k==='confirmed'||k==='pledged'||k==='remaining'||k==='count'){anim(e,k==='remaining'?Math.max(st.target-st.confirmed,0):k==='count'?st.pledgeCount:st[k])}
else if(k==='percent')e.textContent=(FR?pc.toFixed(1).replace('.',','):pc.toFixed(1));
else if(k==='updated'){const d=new Date(st.updated);e.textContent=isNaN(d)?'':T.ago+' '+d.toLocaleDateString(FR?'fr-FR':'en-GB',{day:'numeric',month:'long',year:'numeric'})}
else if(k==='supporters')e.innerHTML=st.supporters.length?'<b>'+T.sup+'</b> '+st.supporters.map(s=>`${s.name.replace(/[<>&]/g,'')} <em>(${s.status==='confirmed'?T.conf:T.pend})</em>`).join(' · '):''});
const a=r.querySelector('.cf-confirmed'),b=r.querySelector('.cf-pledged');if(a){a.style.width=pc+'%'}if(b){b.style.left=pc+'%';b.style.width=Math.max(pp-pc,0)+'%'}})};
const pull=async()=>{try{const r=await fetch('/api/campaign',{cache:'no-store'});if(!r.ok||!(r.headers.get('content-type')||'').includes('json'))throw 0;st=await r.json();live=true}catch(_){if(!live&&!demo){try{const r=await fetch(roots[0].dataset.fallback,{cache:'no-store'});st=await r.json()}catch(_){}}}paint()};
const start=()=>{pull();setInterval(()=>{!D.hidden&&live&&pull()},25000)};
const cio=new IntersectionObserver(es=>es.some(e=>e.isIntersecting)&&(cio.disconnect(),start()),{threshold:.1});roots.forEach(r=>cio.observe(r));
const form=$('[data-pledge]');if(form){const msg=form.querySelector('[data-msg]'),amt=form.elements.amount;
form.querySelectorAll('[data-amt]').forEach(b=>b.onclick=()=>{amt.value=b.dataset.amt;amt.focus()});
form.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(form));d.public=form.elements.public.checked;d.amount=Number(d.amount);
if(!(d.amount>=500)||d.name.trim().length<2||d.contact.trim().length<5){msg.className='pl-msg bad';msg.textContent=T.err;return}
const btn=form.querySelector('button[type=submit]');btn.disabled=true;const lbl=btn.textContent;btn.textContent=T.busy;
try{const r=await fetch('/api/campaign',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(d)});if(!r.ok||!(r.headers.get('content-type')||'').includes('json'))throw 0;
const j=await r.json();if(j.error)throw 1;if(j.confirmed){st=j;live=true}msg.className='pl-msg ok';msg.textContent=T.ok;form.reset()}
catch(x){if(x===0){demo=true;st.pledged+=d.amount;st.pledgeCount++;if(d.public)st.supporters=[{name:d.name.split(/\s+/)[0],status:'pending'},...st.supporters].slice(0,6);msg.className='pl-msg ok';msg.innerHTML=T.demo;form.reset()}else{msg.className='pl-msg bad';msg.textContent=T.fail}}
btn.disabled=false;btn.textContent=lbl;paint();roots[0].scrollIntoView({behavior:'smooth',block:'center'})}}}
})();
