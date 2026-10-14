(function(){
  var root=document.documentElement;
  var FR=window.CV_I18N.FR,T=window.CV_I18N.T;
  var EN={},ENA={};
  var txt=document.querySelectorAll('[data-i18n]'),aria=document.querySelectorAll('[data-i18n-aria]');
  txt.forEach(function(e){var k=e.dataset.i18n;if(!(k in EN))EN[k]=e.innerHTML});
  aria.forEach(function(e){var k=e.dataset.i18nAria;if(!(k in ENA))ENA[k]=e.getAttribute('aria-label')});
  var meta=function(s){return document.querySelector(s)};
  function store(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  var live=document.getElementById('live');
  function announce(msg){live.textContent='';setTimeout(function(){live.textContent=msg},50)}

  var langBtn=document.getElementById('langBtn'),themeBtn=document.getElementById('themeBtn');
  function setLang(l,save){
    var fr=l==='fr',D=fr?FR:EN,A=fr?FR:ENA,t=T[l];
    root.lang=l;
    txt.forEach(function(e){e.innerHTML=D[e.dataset.i18n]});
    aria.forEach(function(e){e.setAttribute('aria-label',A[e.dataset.i18nAria])});
    document.title=t.title;
    meta('meta[name=description]').content=t.desc;
    meta('meta[property="og:title"]').content=t.title;
    meta('meta[property="og:description"]').content=t.ogdesc;
    document.getElementById('langLabel').textContent=t.langLabel;
    langBtn.setAttribute('aria-label',t.langAria);
    langBtn.lang=fr?'en':'fr';
    setTheme(root.dataset.theme,false);
    if(save){store('lang',l);announce(t.annLang)}
  }
  function setTheme(th,save){
    root.dataset.theme=th;
    var t=T[root.lang==='fr'?'fr':'en'];
    themeBtn.setAttribute('aria-label',th==='light'?t.toDark:t.toLight);
    meta('meta[name=theme-color]').content=th==='light'?'#F6F5F2':'#0E0E0F';
    if(save){store('theme',th);announce(th==='light'?t.annLight:t.annDark)}
  }
  langBtn.addEventListener('click',function(){setLang(root.lang==='fr'?'en':'fr',true)});
  themeBtn.addEventListener('click',function(){setTheme(root.dataset.theme==='light'?'dark':'light',true)});
  var sl=null;try{sl=localStorage.getItem('lang')}catch(e){}
  if(sl==='fr')setLang('fr',false);else setTheme(root.dataset.theme,false);

  var nav=document.getElementById('nav'),hero=document.getElementById('top'),
      burger=document.getElementById('burger'),menu=document.getElementById('menu');
  document.getElementById('year').textContent=new Date().getFullYear();
  function onScroll(){nav.classList.toggle('scrolled',window.scrollY>hero.offsetHeight-120)}
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o);
  });
  menu.addEventListener('click',function(e){
    if(e.target.closest('a')){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}
  });
  addEventListener('keydown',function(e){
    if(e.key==='Escape'&&menu.classList.contains('open')){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.focus()}
  });
  document.addEventListener('click',function(e){
    if(menu.classList.contains('open')&&!e.target.closest('.menu,.burger')){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}
  });

  var links=[].slice.call(document.querySelectorAll('.menu a.link'));
  var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  var spy=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){a.classList.remove('active');a.removeAttribute('aria-current')});
        var a=map[e.target.id];if(a){a.classList.add('active');a.setAttribute('aria-current','true')}
      }
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  document.querySelectorAll('main section[id]').forEach(function(s){spy.observe(s)});

  var items=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){
    items.forEach(function(i){i.classList.add('in')});return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  items.forEach(function(i){io.observe(i)});
})();
