// default hash that is displyed
const DEFAULT_HASH = "#home";

// change screen rotation but not too fast or often
let cancelOrient = 0;
screen.orientation.addEventListener("change", (event) => {
  clearTimeout(cancelOrient);
  cancelOrient = setTimeout(() => {
    document.body.scrollTop = 0;
  }, 300);
});

// handle page changes
let oldHash = DEFAULT_HASH;
function hashChangeEvent(event) {
  const newHash = new URL(event.newURL).hash || DEFAULT_HASH;
  document.querySelector(oldHash).classList.add('hidden');
  document.querySelector(newHash).classList.remove('hidden');
  if (newHash != DEFAULT_HASH) {
    document.querySelector('.eject').classList.remove('hidden');
  }
  methods[newHash]();
  oldHash = newHash;
}


function home() {
  document.querySelectorAll('.interface').forEach(n => n.classList.remove('hidden'));
}

function about() {
  document.querySelectorAll('.interface').forEach(n => n.classList.add('hidden'));
}

document.querySelector('.eject').addEventListener('click', function eject(event) {
  document.querySelector('.eject').classList.add('hidden');
  hashChangeEvent({newURL: window.location.origin});
});


// functions that get called when clicking on a hash
const methods = {
  '#home': home,
  '#about': about,
  '#contact': () => {},
}
if(window.location.hash !== DEFAULT_HASH) {
  hashChangeEvent({newURL: window.location.href})
}
// onload event
window.onload = function() {
  document.body.className = '';
  Splitting();
}
// prevent scrolling on tablets
window.ontouchmove = function() { return false; }
// watch for "page" changes
addEventListener("hashchange", hashChangeEvent);
