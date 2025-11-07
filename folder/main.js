// ===== Dinamički podaci (galerija) =====
const items = [
  {
    title: "Čokoladna torta",
    text: "Sočna čokoladna torta sa kremom od kakaa.",
    img: "https://image.dnevnik.hr/media/images/868x567/Mar2023/62496885-cokoladna-mileram-torta.jpg",
  },
  {
    title: "Voćna torta",
    text: "Lagani biskvit sa šlagom i svježim voćem.",
    img: "https://storage.radiosarajevo.ba/article/528985/871x540/torta-voce-vocna-recept-slatko-13januar24-yt.jpg?v1705153774",
  },
  {
    title: "Pita sa sirom",
    text: "Tradicionalna pita, najbolja uz jogurt.",
    img: "https://recepti-api.index.hr/img/preview/large/recipe/5cf4c51a-8e1b-4aae-b571-3b793fbe74e0/IMG_20220102_100313%20(1).jpg",
  },
  {
    title: "Lazanja",
    text: "Tjestenina, meso i bešamel — klasika.",
    img: "https://images.24ur.com/media/images/1024x576/Mar2011/60643722.jpg?v=6042&fop=fp:0.46:0.57",
  },
];

// ===== Render kartica =====
const wrap = document.getElementById("cardsWrap");
function renderCards(list) {
  if (!wrap) return;
  wrap.innerHTML = list.map((it, i) => `
    <div class="col-12 col-sm-6 col-lg-3">
      <div class="card h-100 shadow-sm">
        <img src="${it.img}" class="card-img-top" alt="${it.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${it.title}</h5>
          <p class="card-text flex-grow-1">${it.text}</p>
          <button class="btn btn-outline-primary w-100" data-index="${i}" onclick="openDetails(${i})">
            Detalji
          </button>
        </div>
      </div>
    </div>
  `).join("");
}
renderCards(items);

// ===== Filter pretrage =====
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = items.filter(it =>
      it.title.toLowerCase().includes(q) || it.text.toLowerCase().includes(q)
    );
    renderCards(filtered);
  });
}

// ===== Modal – detalji =====
window.openDetails = function (i) {
  const it = items[i];
  const modalHtml = `
    <div class="modal fade" id="dynamicModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${it.title}</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <img src="${it.img}" class="img-fluid rounded mb-3" alt="${it.title}">
          ${it.text}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
        </div>
      </div></div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modalEl = document.getElementById("dynamicModal");
  modalEl.addEventListener("hidden.bs.modal", () => modalEl.remove());
  new bootstrap.Modal(modalEl).show();
};

// ===== Validacija forme + toast =====
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const toast = document.getElementById("mainToast");
  const bsToast = new bootstrap.Toast(toast);

  form.addEventListener("submit", (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      bsToast.show();
      form.reset();
      form.classList.remove("was-validated");
      return;
    }
    form.classList.add("was-validated");
  });

  // “pogrešno dugme”
  const wrong = document.getElementById("pogresnoBtn");
  wrong?.addEventListener("click", () => alert("Kliknuli ste pogrešno dugme!"));
})();
