const WA_NUMBER = '6283164333096';

const MENU_LIST = [
  { id:'matcha', nama:'Matcha', emoji:'🍵', foto:'img/matcha.jpg',
    deskripsi:'Donat dengan glazed matcha Jepang yang harum dan creamy. Perpaduan rasa manis dan sedikit pahit yang menyegarkan, cocok untuk pecinta teh hijau.',
    topping:'Glazed matcha + drizzle putih' },
  { id:'coklatKacang', nama:'Coklat Kacang', emoji:'🍫', foto:'img/coklat-kacang.jpg',
    deskripsi:'Donat coklat pekat dengan taburan kacang cincang di atasnya. Rasa gurih kacang berpadu sempurna dengan coklat leleh yang kaya.',
    topping:'Glazed coklat + kacang cincang' },
  { id:'tiramisu', nama:'Tiramisu', emoji:'☕', foto:'img/tiramisu.jpg',
    deskripsi:'Terinspirasi dari dessert Italia klasik. Rasa kopi lembut dengan sentuhan krim tiramisu yang memanjakan lidah.',
    topping:'Glazed krim + drizzle coklat + bubuk kopi' },
  { id:'capucino', nama:'Capucino', emoji:'🤎', foto:'img/capucino.jpg',
    deskripsi:'Donat dengan cita rasa cappuccino yang khas. Aroma kopi yang kuat dengan tekstur glazed yang lembut dan creamy.',
    topping:'Glazed cappuccino + drizzle coklat' },
  { id:'coklatSeres', nama:'Coklat Seres', emoji:'🍩', foto:'img/coklat-seres.jpg',
    deskripsi:'Donat klasik favorit semua kalangan! Dibalut coklat pekat dan ditaburi meses coklat melimpah dari atas hingga bawah.',
    topping:'Glazed coklat pekat + meses coklat' },
  { id:'taro', nama:'Taro', emoji:'💜', foto:'img/taro.jpg',
    deskripsi:'Warna ungu cantik dengan rasa talas yang manis dan lembut. Pilihan unik yang selalu menarik perhatian dan enak dimakan!',
    topping:'Glazed taro ungu + sprinkles warna-warni' },
  { id:'bubblegum', nama:'Bubble Gum', emoji:'🩵', foto:'img/bouble-gum.jpg',
    deskripsi:'Donat biru cerah dengan rasa bubblegum yang manis dan segar. Tampilan mencolok yang paling disukai anak-anak!',
    topping:'Glazed biru bubblegum + sprinkles warna-warni' },
  { id:'coklatGaris', nama:'Coklat Garis', emoji:'🍫', foto:'img/coklat-garis.jpg',
    deskripsi:'Donat coklat premium dengan motif garis putih yang elegan. Rasa coklat yang kaya dan tampilan yang menggugah selera.',
    topping:'Glazed coklat gelap + drizzle putih' },
  { id:'orangeMangga', nama:'Orange Mangga', emoji:'🍊', foto:'img/orange-mangga.jpg',
    deskripsi:'Perpaduan segar jeruk dan mangga tropis dalam satu donat. Rasa buah yang manis dan asam bikin nagih!',
    topping:'Glazed orange-mangga + drizzle coklat' },
  { id:'stawberry', nama:'Stawberry', emoji:'🍓', foto:'img/strawberry.jpg',
    deskripsi:'Donat pink manis dengan rasa stroberi segar yang kuat. Warnanya cantik dan toppingnya melimpah, cocok untuk semua usia.',
    topping:'Glazed stroberi pink + sprinkles warna-warni' },
];

let currentPaket = { jumlah: 0, harga: '' };

// ── RENDER MENU ──
function renderMenu() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = MENU_LIST.map((m, i) => `
    <div class="menu-card" onclick="openMenuPopup(${i})">
      <div class="menu-img-inner">
        <img src="${m.foto}" alt="${m.nama}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>
        <div class="menu-emoji" style="display:none">${m.emoji}</div>
      </div>
      <div class="menu-name">${m.nama}</div>
      <div class="menu-price"></div>
    </div>
  `).join('');
}

// ── POPUP DETAIL MENU ──
function openMenuPopup(idx) {
  const m = MENU_LIST[idx];
  const img = document.getElementById('popupImg');
  img.src = m.foto;
  img.style.display = 'block';
  const fallback = document.getElementById('popupImgFallback');
  fallback.textContent = m.emoji;
  fallback.style.display = 'none';
  img.onerror = function() {
    this.style.display = 'none';
    fallback.style.display = 'flex';
  };
  document.getElementById('popupName').textContent = m.nama;
  document.getElementById('popupDesc').textContent = m.deskripsi;
  document.getElementById('popupTopping').textContent = m.topping;
  document.getElementById('menuPopupOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenuPopup() {
  document.getElementById('menuPopupOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function closeMenuPopupOutside(e) {
  if (e.target === document.getElementById('menuPopupOverlay')) closeMenuPopup();
}

// ── NAVBAR ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
  document.querySelector('.hamburger').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.querySelector('.hamburger').classList.remove('open');
  });
});

// Navbar shadow saat scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 10);
});

// Active nav link saat scroll
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ── MODAL PESAN ──
function openOrderModal(jumlah, harga) {
  currentPaket = { jumlah, harga };
  document.getElementById('modalTitle').textContent = `🍩 Paket ${jumlah} Donat`;
  document.getElementById('paketInfoBar').innerHTML =
    `<span>Paket ${jumlah} Donat</span><span class="paket-info-harga">${harga}</span>`;

  const wrap = document.getElementById('donatSlotWrap');
  wrap.innerHTML = '';
  for (let i = 1; i <= jumlah; i++) {
    const group = document.createElement('div');
    group.className = 'form-group';
    group.innerHTML = `
      <label>Donat ke-${i} *</label>
      <select id="donat_${i}">
        <option value="">— Pilih varian —</option>
        ${MENU_LIST.map(m => `<option value="${m.nama}">${m.emoji} ${m.nama}</option>`).join('')}
      </select>`;
    wrap.appendChild(group);
  }
  document.getElementById('nama').value = '';
  document.getElementById('waktu').value = '';
  document.getElementById('catatan').value = '';
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ── KIRIM WA ──
function sendToWhatsApp() {
  const nama    = document.getElementById('nama').value.trim();
  const waktu   = document.getElementById('waktu').value.trim() || '-';
  const catatan = document.getElementById('catatan').value.trim() || '-';
  if (!nama) { alert('Mohon isi nama lengkap.'); return; }

  const pilihan = [];
  for (let i = 1; i <= currentPaket.jumlah; i++) {
    const val = document.getElementById(`donat_${i}`).value;
    if (!val) { alert(`Mohon pilih varian untuk Donat ke-${i}.`); return; }
    pilihan.push(`   ${i}. ${val}`);
  }

  const msg =
`Halo Donat JOYOeN! 🍩 Saya ingin pesan:

━━━━━━━━━━━━━━━━━━━
👤 Nama      : ${nama}
📦 Paket     : ${currentPaket.jumlah} Donat (${currentPaket.harga})
🍩 Pilihan Donat:
${pilihan.join('\n')}
⏰ Waktu     : ${waktu}
📝 Catatan   : ${catatan}
━━━━━━━━━━━━━━━━━━━

Mohon konfirmasi & total harganya ya. Terima kasih! 🙏`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('#about > div, .paket-box, .sec-header, .footer-grid');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      revealObserver.unobserve(el.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });

// Stagger animasi kartu menu
const menuObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.menu-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 60);
      });
      menuObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ── INIT ──
renderMenu();
const menuGrid = document.getElementById('menuGrid');
if (menuGrid) menuObserver.observe(menuGrid);