const family = {
  dad: {
    emoji: "🚛",
    accent: "#71f6e2",
    name: "Dadam — Farrux",
    description: `Dadam 39 yoshda. U fura haydaydi va Xitoydan O'zbekistonga mashinalar tashiydi.

Dadam oilamiz uchun mehnat qiladi. Men uning mehnati, sabri va harakatidan o'rnak olaman. Kelajakda dadamni xursand qilishni xohlayman. ❤️`
  },
  mom: {
    emoji: "🌷",
    accent: "#ff8cc9",
    name: "Ayam — mehribon onam",
    description: `Ayam 36 yoshda. U bozorda kiyim-kechak sotadi va uy bekasi.

Ayam oilamizning mehribon va qadrli insoni. Uning mehri va qo'llab-quvvatlashi men uchun juda muhim. Men ayamni juda yaxshi ko'raman! ❤️`
  },
  grandma: {
    emoji: "🤍",
    accent: "#ffd68b",
    name: "Annam — aziz buvim",
    description: `Annam 67 yoshda. U Haj safariga borib kelgan.

Annam oilamizning hurmatli insoni. Uning borligi biz uchun katta baxt. Men annamga sog'lik, uzoq umr va doimo xotirjamlik tilayman. 🤍`
  },
  brother: {
    emoji: "📚",
    accent: "#9b85ff",
    name: "Akam — bilim sari",
    description: `Akam 11-sinfda o'qiydi. Hozirda ingliz tilidan tayyorlanyapti.

Uning oldida ko'plab imkoniyatlar va yangi maqsadlar bor. Men akamga o'qishlarida omad, sabr va katta yutuqlar tilayman.

Ishonamanki, u o'z orzulariga erishadi! 💜`
  },
  me: {
    emoji: "💻",
    accent: "#78baff",
    name: "Abdumalik — kelajak dasturchisi",
    description: `Salom! Men Abdumalik, 14 yoshdaman va maktabda o'qiyman.

Mening eng katta maqsadim — dasturlashni o'rganish. HTML, CSS va JavaScript orqali saytlar yaratishni o'rganyapman.

Kelajakda kuchli dasturchi bo'lishni, o'z loyihalarimni yaratishni va oilamni faxrlantirishni xohlayman.

Bu sayt ham mening ilk loyihalarimdan biri! 🚀`
  }
};

const cards = document.querySelectorAll(".person-card");
const profile = document.getElementById("profile");
const profileEmoji = document.getElementById("profileEmoji");
const profileName = document.getElementById("profileName");
const profileDescription = document.getElementById("profileDescription");
const closeProfile = document.getElementById("closeProfile");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const person = family[card.dataset.person];
    if (!person) return;

    profile.style.setProperty("--accent", person.accent);
    profileEmoji.textContent = person.emoji;
    profileName.textContent = person.name;
    profileDescription.textContent = person.description;
    profile.hidden = false;

    profile.style.animation = "none";
    void profile.offsetWidth;
    profile.style.animation = "";

    profile.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

closeProfile.addEventListener("click", () => {
  profile.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") profile.hidden = true;
});

// Harakatlanuvchi yulduzlar foni
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
let width = 0;
let height = 0;
let animationId;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(Math.floor((width * height) / 9000), 110);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.3 + 0.08,
    alpha: Math.random() * 0.55 + 0.2,
    phase: Math.random() * Math.PI * 2
  }));

  drawStars(0);
}

function drawStars(time) {
  ctx.clearRect(0, 0, width, height);

  stars.forEach((star) => {
    const pulse = reduceMotion ? 1 : 0.65 + Math.sin(time * 0.001 + star.phase) * 0.35;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 220, 255, ${star.alpha * pulse})`;
    ctx.fill();

    if (!reduceMotion) {
      star.y -= star.speed;
      if (star.y < -3) {
        star.y = height + 3;
        star.x = Math.random() * width;
      }
    }
  });

  if (!reduceMotion) animationId = requestAnimationFrame(drawStars);
}

window.addEventListener("resize", () => {
  cancelAnimationFrame(animationId);
  resizeCanvas();
});

resizeCanvas();
console.log("Abdumalikning oilaviy sayti ishga tushdi! ❤️");
