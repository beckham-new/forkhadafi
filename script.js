/* =====================
   ELEMENTS
===================== */

const passInput  = document.getElementById("passInput");
const passScreen = document.getElementById("passScreen");

const intro   = document.getElementById("intro");
const gallery = document.getElementById("gallery");

const envelope = document.getElementById("envelope");
const paper    = document.getElementById("paper");
const backBtn  = document.getElementById("backBtn");

const typeText = document.getElementById("typeText");
const hearts   = document.getElementById("hearts");


/* =====================
   AUDIO
===================== */

function sound(src, vol=1, loop=false){
  const a = new Audio(src);
  a.volume = vol;
  a.loop = loop;
  return a;
}

const bgm   = sound("audio/music.mp3", 0.6, true);
const openS = sound("audio/open.mp3", .7);
const typeS = sound("audio/typing.mp3", .15);

function play(a){
  a.currentTime = 0;
  a.play().catch(()=>{}); // prevent blocked error
}


/* =====================
   PASSWORD
===================== */

const PASSWORD = "ily";

function checkPass(){

  if(passInput.value === PASSWORD){

    passScreen.style.display = "none";

    // show everything AFTER password
    intro.classList.remove("hidden");
    gallery.classList.remove("hidden");

    // music MUST start here (user interaction)
    bgm.play();
  }
}


/* =====================
   ENVELOPE
===================== */

envelope.onclick = () => {

  envelope.classList.add("open");
  document.body.classList.add("blur-bg");

  play(openS);

  setTimeout(()=>{
    paper.classList.add("show");
    startTyping();
  }, 500);
};


backBtn.onclick = () => {

  paper.classList.remove("show");
  envelope.classList.remove("open");
  document.body.classList.remove("blur-bg");

  typeText.textContent = "";
  stopTyping();
};


/* =====================
   TYPEWRITER (FIXED)
===================== */

const msg = `Hi you, Khadafi Leigh

So… I was thinking about us today,
and I realized something.
You’re kinda my favorite person.
Like… my number one.
My favorite hello,
my hardest goodbye,
my comfort place after a long day.
Life is just better when you’re around.
Stay with me, okay?
Let’s make more memories, more laughs, and more late night talks together.

I like you. A lot.❤️`;

let typingInterval = null;

function startTyping(){

  stopTyping(); // prevent double interval
  typeText.textContent = "";

  let i = 0;

  typingInterval = setInterval(()=>{

    typeText.textContent += msg[i];

    if(msg[i] !== " ") play(typeS);

    i++;

    if(i >= msg.length){
      stopTyping();
    }

  }, 70); // ⬅️ speed (bigger = slower)
}

function stopTyping(){
  clearInterval(typingInterval);
}


/* =====================
   HEARTS
===================== */

setInterval(()=>{

  if(passScreen.style.display !== "none") return;

  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "❤";
  h.style.left = Math.random()*100 + "vw";

  hearts.appendChild(h);

  setTimeout(()=>h.remove(),10000);

}, 600);


/* =====================
   POLAROID
===================== */

// random tilt
document.querySelectorAll(".photo-card").forEach(card=>{
  const r = (Math.random()*6-3);
  card.style.transform = `rotate(${r}deg)`;
});


/* =====================
   FADE IN SCROLL
===================== */

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".fade").forEach(el=>obs.observe(el));

