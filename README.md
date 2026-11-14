# Website Duduk Cerita

Buka `index.html` di browser, atau upload seluruh folder ini apa adanya ke hosting.

## Struktur folder

```
index.html            landing page
tentang.html          halaman Tentang (data interaktif, psikolog vs psikiater, visi misi, C.O.R.E Value)
podcast.html
blog.html
tim.html              daftar tim + carousel keseruan tim
Tim-Dicki.html        profil per orang
Tim-Fitri.html
Tim-Gibran.html
assets/
  styling/style.css   semua style (warna & font ada di bagian paling atas)
  js/site.js          semua interaksi (hamburger, tab, kartu buka-tutup, toggle, carousel)
  image/
    logo/             duduk-cerita-horizontal.webp, duduk-cerita-tumpuk.webp
    badge/            spotify.webp, youtube.webp, noice.webp
    tim/              dicki.webp, fitri.webp, gibran.webp
    dokumentasi/      taruh foto carousel di sini (dokumentasi-1.webp, dst.)
```

## Cara edit yang paling sering

- **Ganti isi teks:** cari komentar `EDIT:` di tiap file HTML.
- **Tambah foto carousel:** taruh di `assets/image/dokumentasi/`, lalu ganti isi `<div class="slide-foto"></div>` di `tim.html` dengan `<img src="assets/image/dokumentasi/dokumentasi-1.webp" alt="..." loading="lazy">`.
- **Update angka data:** `tentang.html`, section "Kenapa kami ada". Tahun sumber ada di tiap kartu.
- **Halaman baru:** salin pola nav + footer dari halaman lain, lalu pasang `assets/styling/style.css` dan `assets/js/site.js`.

## Yang berubah di rapihin terakhir

- File dipindah ke `assets/styling/`, `assets/js/`, dan `assets/image/` (dikategorikan logo, badge, tim, dokumentasi).
- Nama gambar dirapikan: `logo-nav.png` jadi `logo/duduk-cerita-horizontal.webp`, `logo-tumpuk.png` jadi `logo/duduk-cerita-tumpuk.webp`, `badge-*.png` jadi `badge/*.webp`, `foto-*.jpg` jadi `tim/*.webp`.
- Semua gambar dikonversi ke WebP dan diperkecil sesuai ukuran tampilnya (total sekitar 480 KB jadi sekitar 210 KB). File asli tetap aman di folder upload lu.
- CSS ditulis ulang: variabel `--emas` dan `--radius`, pola kotak bergaris navy digabung, aturan duplikat dan yang nggak terpakai dibuang (audit: 0 class CSS menganggur).
- JS digabung jadi satu file `site.js` (dulu `nav.js` plus dua script inline). Tab sekarang dipasang otomatis tanpa perlu id manual di HTML.
- HTML: nggak ada lagi script atau style inline, `preconnect` untuk Google Fonts, atribut `width`/`height` di gambar (cegah layout loncat), `loading="lazy"` untuk gambar di bawah layar.
- Class layout `isi` di section Tentang (index) diganti `tentang-grid`, karena bentrok dengan tombol `.btn.isi` (penyebab tombol "Kenalan lebih dalam" melebar).
