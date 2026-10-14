/* Runs before first paint: applies saved theme and flags JS so reveal animations never hide content without it. */
(function(){
  var d=document.documentElement;
  d.classList.add('js');
  try{
    d.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark';
    if(localStorage.getItem('lang')==='fr')d.lang='fr';
  }catch(e){d.dataset.theme='dark'}
})();
