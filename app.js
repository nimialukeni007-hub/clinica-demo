/* CONFIG — trocar quando houver dados reais do cliente */
const CFG={nome:'Aurelle',wa:'244900000000',ph:'+244 9XX XXX XXX'};
const P=[
['Sérum Vitamina C','skin','Antioxidante · 30ml','#e8962a'],['Gel de Limpeza','skin','Micro-peeling · 200ml','#8a62c9'],
['Hidratante Facial','skin','Barreira cutânea · 50ml','#6fb3d6','jar'],['Óleo de Cabelo','hair','Brilho e maciez · 100ml','#c4691e'],
['Máscara Capilar','hair','Reparação intensa · 300g','#3b2a22','jar'],['Esfoliante de Pés','spa','Chá verde · 1000g','#7fb85a','jar'],
['Máscara de Argila','spa','Lavanda · 1000g','#8f7cc4','jar'],['Gel de Escalda-pés','spa','Rosa · 600g','#e0566b','jar']];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const art=(c,j)=>`<div class="bt ${j||''}" style="background:linear-gradient(90deg,${c},#fff6 40%,${c})"></div>`;
/* WhatsApp */
$$('[data-wa]').forEach(a=>a.href=`https://wa.me/${CFG.wa}?text=${encodeURIComponent(a.dataset.wa)}`);
$$('[data-ph]').forEach(e=>e.textContent=CFG.ph);$('#y').textContent=new Date().getFullYear();
/* produtos */
$('#pgrid').innerHTML=P.map(p=>`<article class="pc glass rv" data-c="${p[1]}"><div class="pv">${art(p[3],p[4])}</div><h4>${p[0]}</h4><p>${p[2]}</p><b class="pr">00.000 Kz</b><a class="btn sm wa" href="https://wa.me/${CFG.wa}?text=${encodeURIComponent('Olá! Quero o produto: '+p[0])}">Pedir</a></article>`).join('');
$$('.chips button').forEach(b=>b.onclick=()=>{$$('.chips button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$$('.pc').forEach(c=>c.style.display=b.dataset.f=='all'||c.dataset.c==b.dataset.f?'':'none')});
/* galeria 3D */
const ring=$('#ring'),N=P.length;
ring.innerHTML=P.map((p,i)=>`<div class="slide glass"><div class="art" style="background:radial-gradient(circle at 50% 38%,${p[3]}55,transparent 70%)">${art(p[3],p[4])}</div><h5>${p[0]}</h5><small>${p[2]}</small></div>`).join('');
const sl=$$('.slide');let ang=0,vel=0,auto=true,drag=false,lx=0;
const R=()=>Math.min(430,innerWidth*.62);
function render(){const r=R();sl.forEach((s,i)=>{s.style.transform=`rotateY(${i*360/N}deg) translateZ(${r}px)`});ring.style.transform=`translateZ(-${r}px) rotateY(${ang}deg)`;
sl.forEach((s,i)=>{const a=((i*360/N+ang)%360+360)%360,d=Math.abs(a>180?a-360:a);s.style.opacity=.35+.65*(1-d/180);s.style.filter=`blur(${d>100?1.5:0}px)`})}
function loop(){if(auto&&!drag)ang-=.12; if(!drag){ang+=vel;vel*=.95}render();requestAnimationFrame(loop)}loop();  /* .12°/frame = slow motion */
const st=$('.stage');
st.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;st.style.cursor='grabbing'});
addEventListener('pointerup',()=>{drag=false;st.style.cursor=''});
addEventListener('pointermove',e=>{if(!drag)return;const d=e.clientX-lx;lx=e.clientX;ang+=d*.3;vel=d*.05});
const step=k=>{ang+=k*360/N};$('#prev').onclick=()=>step(1);$('#next').onclick=()=>step(-1);
$('#pp').onclick=e=>{auto=!auto;e.target.textContent=auto?'❚❚':'▶'};
/* reveal + contadores + tilt */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
const obs=()=>$$('.rv').forEach(e=>io.observe(e));
$$('[data-n]').forEach(el=>{const n=+el.dataset.n;let t0;const f=t=>{t0=t0||t;const k=Math.min((t-t0)/1800,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));k<1&&requestAnimationFrame(f)};setTimeout(()=>requestAnimationFrame(f),3000)});
$$('.tilt').forEach(c=>{c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg)`});c.addEventListener('pointerleave',()=>c.style.transform='')});
/* intro */
const hide=()=>{$('#intro').classList.add('out');obs()};setTimeout(hide,3000);
