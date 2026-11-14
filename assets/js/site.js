/* Semua interaksi website ada di sini. Tiap bagian cuma jalan kalau elemennya ada di halaman. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rupiah = (n, d) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ---------- Hamburger nav (HP) ---------- */
  const nav = $('.nav');
  const burger = $('.burger');
  if (nav && burger) {
    const setMenu = (buka) => {
      nav.classList.toggle('buka', buka);
      burger.setAttribute('aria-expanded', buka);
      burger.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
    };
    burger.addEventListener('click', () => setMenu(!nav.classList.contains('buka')));
    $$('.nav ul a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('buka')) { setMenu(false); burger.focus(); }
    });
    matchMedia('(min-width: 721px)').addEventListener('change', (e) => e.matches && setMenu(false));
  }

  /* ---------- Animasi isi panel: angka naik + bar melebar ---------- */
  const hitungNaik = (el) => {
    if (reduceMotion) return;
    const { count, dec = 0, pre = '', suf = '' } = el.dataset;
    const target = parseFloat(count);
    const mulai = performance.now();
    const langkah = (now) => {
      const p = Math.min((now - mulai) / 900, 1);
      el.innerHTML = pre + rupiah(target * (1 - (1 - p) ** 3), +dec) + suf;
      if (p < 1) requestAnimationFrame(langkah);
    };
    requestAnimationFrame(langkah);
  };
  const lebarkanBar = (bar) => {
    bar.style.width = '0';
    requestAnimationFrame(() => requestAnimationFrame(() => (bar.style.width = '')));
  };
  const animasikan = (panel) => {
    $$('[data-count]', panel).forEach(hitungNaik);
    $$('.bar i', panel).forEach(lebarkanBar);
  };

  /* ---------- Tab (data, psikolog vs psikiater, workflow) ----------
     Tab dan panel dipasangkan berdasarkan urutan: tab ke-1 = panel ke-1, dst. */
  $$('[role="tablist"]').forEach((list, n) => {
    const tabs = $$('[role="tab"]', list);
    const panels = $$('[role="tabpanel"]', list.parentElement);
    tabs.forEach((tab, i) => {
      tab.id = `tab-${n}-${i}`;
      tab.setAttribute('aria-controls', `panel-${n}-${i}`);
      tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
      panels[i].id = `panel-${n}-${i}`;
      panels[i].setAttribute('aria-labelledby', tab.id);
    });

    const pilih = (tab, fokus) => {
      tabs.forEach((t, i) => {
        const aktif = t === tab;
        t.setAttribute('aria-selected', aktif);
        t.tabIndex = aktif ? 0 : -1;
        panels[i].hidden = !aktif;
        if (aktif) animasikan(panels[i]);
      });
      if (fokus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => pilih(tab));
      tab.addEventListener('keydown', (e) => {
        const geser = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!geser) return;
        e.preventDefault();
        pilih(tabs[(i + geser + tabs.length) % tabs.length], true);
      });
    });

    /* panel pertama dianimasikan sekali, pas mulai kelihatan di layar */
    const pertama = panels[tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')];
    if (!('IntersectionObserver' in window)) return animasikan(pertama);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { animasikan(pertama); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(pertama);
  });

  /* ---------- Toggle masalah vs gangguan ---------- */
  $$('.interaktif').forEach((box) => {
    const tombol = $$('.seg button', box);
    tombol.forEach((b) => b.addEventListener('click', () => {
      tombol.forEach((x) => x.setAttribute('aria-pressed', x === b));
      $('.besar', box).textContent = b.dataset.n;
      $('.penjelas', box).textContent = b.dataset.t;
      $('.bar i', box).style.setProperty('--w', `${b.dataset.w}%`);
    }));
  });

  /* ---------- Akordeon: satu terbuka sekaligus (cadangan buat browser tanpa atribut name) ---------- */
  $$('details[name]').forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) $$(`details[name="${d.getAttribute('name')}"]`).forEach((o) => o !== d && (o.open = false));
  }));

  /* ---------- Carousel dokumentasi ---------- */
  $$('.carousel').forEach((c) => {
    const track = $('.carousel-track', c);
    $$('[data-geser]', c).forEach((b) => b.addEventListener('click', () => {
      track.scrollBy({ left: +b.dataset.geser * ($('.slide', track).offsetWidth + 16) });
    }));
  });
})();
