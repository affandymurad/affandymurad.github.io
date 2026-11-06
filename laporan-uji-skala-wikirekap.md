# Laporan uji skala Wikirekap

> Bahasa Indonesia di bawah. [English version below](#english).

Tanggal uji: 28 Oktober 2026. Kode yang diuji: versi `master` saat itu (commit terakhir `7e4c31b`), dijalankan lewat server lokal di browser pane Claude Code Desktop (Chromium). Tidak ada kode yang diubah selama uji.

## Ringkasan

- Target: akun dengan sekitar 320.000 suntingan.
- Hasil: akun `Bennylin` (489.883 suntingan global seluruh waktu menurut CentralAuth) termuat sampai sekitar **466.000 suntingan** (95%) tanpa error dan tanpa tab macet. Target 320.000 terlampaui. Pengujian itu **belum selesai sampai akhir** karena tab berpindah halaman di tengah proses (lihat catatan 1).
- Bagian yang belum terbukti sama sekali: pageviews pada skala besar, ekspor PDF/JSON pada skala besar, dan kecocokan total dengan sumber lain.

## Hasil per uji

Semua uji memakai proyek Global (semua wiki tempat akun punya suntingan).

| # | Akun | Rentang | Suntingan termuat | Artikel unik | Wiki berisi suntingan | Selisih byte (bersih) | Halaman baru | Waktu | Memori |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Bennylin | 1 Jan – 28 Okt 2026 | 20.973 | 14.835 | 52 dari 436 | +26.478.514 | 3.236 | sekitar 2–3 menit | tidak diukur |
| 2 | Bennylin | 28 Okt 2021 – 28 Okt 2026 | 108.521 (terpotong) | 74.614 | 97 dari 436 | +57.286.354 | 16.096 | sekitar 6–7 menit | 74 MB |
| 3 | Affandy Murad | seluruh waktu | 5.714 | 3.307 | 20 dari 21 | +4.205.891 | 1.353 | kurang dari 25 detik | tidak diukur |
| 4 | Bennylin | seluruh waktu | 466.229 (belum selesai) | tidak sempat dihitung | tidak sempat dihitung | tidak sempat dihitung | tidak sempat dihitung | sekitar 12–15 menit sampai titik itu | 165 MB |

Rincian tambahan:

- Uji 1, terbanyak per wiki: jv.wiktionary 7.051, Commons 6.986, Wikidata 1.422, id.wikipedia 1.364, id.wiktionary 1.268, Meta 911, id.wikisource 590, id.wikibooks 507.
- Uji 2: Commons dan id.wikipedia masing-masing berhenti tepat di 25.000. Terbanyak berikutnya: Wikidata 11.990, jv.wiktionary 10.496, id.wiktionary 10.487, jv.wikisource 6.911, mad.wiktionary 5.181, id.wikisource 4.109.
- Uji 3, terbanyak per wiki: id.wikipedia 2.047, Commons 1.059, Wikidata 534, id.wiktionary 523, Incubator 412, bew.wiktionary 317, bew.wikipedia 219, Meta 194.
- Uji 4:
  - Batch pertama (pemuatan otomatis): 178.547 suntingan. Wiki yang masih tersisa setelah itu: Commons, id.wikipedia, id.wiktionary, dan jv.wiktionary.
  - Setelah "Muat semua": naik bertahap ke 448.729 lalu ke status 466.229, dengan tinggal satu wiki yang berjalan.
  - Memori heap naik hampir linear: sekitar 134 MB di 260 ribu, 144 MB di 335 ribu, 151 MB di 380 ribu, 165 MB di sekitar 450 ribu.

Jumlah resmi sebagai pembanding (API, 28 Okt 2026):

| Akun | Cakupan | Suntingan resmi |
|---|---|---|
| Bennylin | Global, seluruh waktu | 489.883 |
| Bennylin | id.wikipedia, seluruh waktu | 260.802 |
| Bennylin | Commons, seluruh waktu | 91.402 |
| Affandy Murad | Global, seluruh waktu | 6.139 |

## Temuan

1. **Skala kontribusi memadai.** Sekitar 466 ribu suntingan termuat dalam sekitar 12–15 menit dengan memori sekitar 165 MB, tanpa tab macet dan tanpa error di UI.
2. **Batas batch bekerja sesuai teks.** Commons dan id.wikipedia berhenti persis di 25.000 per pemuatan, sesuai pesan peringatan ("satu pemuatan maksimal 25.000 edit"). Dugaan bahwa akun dengan hak API tinggi bisa melewati 25.000 per batch **tidak terbukti** pada akun Bennylin.
3. **"Muat semua" menuntaskan wiki yang terpotong.** Pada uji 4, wiki yang berhenti di 25.000 dilanjutkan sampai jauh melewati angka itu.
4. **Pemuatan per wiki, bukan per suntingan.** Hitungan di status ("Mengambil kontribusi… (N)") kadang melompat 10.000–50.000 sekaligus karena wiki dimuat paralel (3 sekaligus) dan hasilnya digabung per putaran. Itu wajar, bukan indikasi macet.
5. **Kecocokan total belum terbukti.** Pada akun kecil (Affandy Murad), Wikirekap memuat 5.714 dari 6.139 suntingan resmi (selisih 425, sekitar 7%). Dugaan penyebabnya suntingan yang sudah dihapus tidak muncul di daftar kontribusi publik, tapi tetap tercatat di editcount. Dugaan ini belum diperiksa per wiki.

## Catatan penting

1. **Uji 4 tidak selesai.** Tab browser berpindah ke `meta.wikimedia.org` saat uji berjalan, sehingga data di halaman hilang. Saya tidak menavigasi halaman itu; penyebabnya kemungkinan klik atau tautan di sisi pengguna. Total akhir Bennylin seluruh waktu, jumlah artikel unik, dan selisih byte untuk skala 466 ribu **tidak diperoleh**.
2. **Waktu uji 4 adalah perkiraan.** Di laporan percakapan sebelumnya saya menyebut sekitar 20 menit. Setelah dihitung ulang dari jumlah interval polling (sekitar 29 detik per poll), angka yang lebih tepat adalah sekitar 12–15 menit sampai titik 466 ribu. Pencatat waktu otomatis yang saya pasang ikut hilang saat tab berpindah, jadi angka ini bukan hasil ukur langsung.
3. **Pageviews tidak diuji pada skala.** Pada semua uji, pageviews hanya terisi untuk 8 sampai 100 baris pertama (pemuatan malas). Angka "Total Views" di ringkasan hanya mewakili baris itu, bukan total sebenarnya:
   - Uji 1: 8 dari 14.835 baris (65.772 views).
   - Uji 2: 100 dari 74.614 baris (1.308.941 views).
   - Uji 3: 100 dari 3.307 baris (64.295 views).
4. **Proyeksi pageviews belum diukur.** Dengan rumus ETA di kode (2 request per artikel untuk rentang lebih dari 62 hari, 0,8 detik per request, paralel 6), pageviews untuk 74.614 artikel (uji 2) kira-kira 5–6 jam. Untuk skala 320 ribu suntingan penuh, angkanya bisa belasan jam atau lebih. Ini hasil hitung kasar, bukan hasil uji. Jumlah respons 429 tidak diukur.
5. **Ekspor tidak diuji.** PDF (dibatasi 5.000 baris) dan JSON pada data besar belum dicoba. Ukuran file JSON dan memori puncak saat ekspor tidak diketahui.
6. **Memori yang diukur hanya heap JavaScript.** Angka 74 MB dan 165 MB berasal dari `performance.memory.usedJSHeapSize` (khusus Chromium, hanya heap JS). Memori total tab (DOM, tabel, cache) bisa lebih besar dan belum diukur lewat Chrome Task Manager.
7. **Uji dijalankan di browser pane Claude Code, bukan Chrome pengguna.** Perilaku di Chrome biasa, Firefox, atau perangkat dengan RAM terbatas bisa berbeda.
8. **Throttle dan 429 tidak dicatat.** Tidak ada error yang muncul di UI, tapi jumlah retry dan respons 429 selama uji tidak dihitung.
9. **Akun uji.** `Bennylin` dan `Affandy Murad` dipakai atas permintaan pengguna. Data yang diambil adalah kontribusi publik; tidak ada data pribadi yang disimpan di luar halaman.
10. **Rentang tanggal mengunci dua hal sekaligus.** Rentang yang dipilih membatasi suntingan yang diambil dan periode pageviews. Pada "semua waktu", rentang dimulai 1 Januari 2001 untuk suntingan, tetapi pageviews hanya dihitung sejak 1 Juli 2015 (batas awal API per artikel).

## Rekomendasi langkah berikutnya

1. Ulang uji 4 sampai selesai di Chrome pengguna, dengan Chrome Task Manager terbuka, tanpa mengklik apa pun selama proses. Catat total akhir, artikel unik, dan selisih byte, lalu bandingkan dengan 489.883.
2. Ukur kecepatan pageviews secara terbatas: muat satu halaman 500 baris, catat waktu dan jumlah 429, lalu ekstrapolasi.
3. Uji ekspor JSON (ukuran, waktu, memori) dan PDF (dialog batas 5.000 baris) pada hasil uji 4.
4. Periksa selisih 425 suntingan pada Affandy Murad per wiki, untuk memastikan penjelasan "suntingan terhapus".


---

<a id="english"></a>

# Wikirekap scale test report (English)

Test date: 28 October 2026. Code tested: `master` at the time (latest commit `7e4c31b`), run through a local server in the Claude Code Desktop browser pane (Chromium). No code was changed during the test.

## Summary

- Target: an account with about 320,000 edits.
- Result: the account `Bennylin` (489,883 global edits all time per CentralAuth) loaded up to about **466,000 edits** (95%) with no errors and no frozen tab. The 320,000 target was exceeded. That test **did not run to completion** because the tab navigated away midway (see note 1).
- Not proven at all: pageviews at scale, PDF/JSON export at scale, and whether totals match other sources.

## Results per test

All tests used the Global project (every wiki where the account has edits).

| # | Account | Range | Edits loaded | Unique pages | Wikis with edits | Net byte change | New pages | Time | Memory |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Bennylin | 1 Jan – 28 Oct 2026 | 20,973 | 14,835 | 52 of 436 | +26,478,514 | 3,236 | about 2–3 min | not measured |
| 2 | Bennylin | 28 Oct 2021 – 28 Oct 2026 | 108,521 (truncated) | 74,614 | 97 of 436 | +57,286,354 | 16,096 | about 6–7 min | 74 MB |
| 3 | Affandy Murad | all time | 5,714 | 3,307 | 20 of 21 | +4,205,891 | 1,353 | under 25 s | not measured |
| 4 | Bennylin | all time | 466,229 (incomplete) | not computed | not computed | not computed | not computed | about 12–15 min to that point | 165 MB |

Extra details:

- Test 1, top wikis: jv.wiktionary 7,051, Commons 6,986, Wikidata 1,422, id.wikipedia 1,364, id.wiktionary 1,268, Meta 911, id.wikisource 590, id.wikibooks 507.
- Test 2: Commons and id.wikipedia each stopped at exactly 25,000. Next largest: Wikidata 11,990, jv.wiktionary 10,496, id.wiktionary 10,487, jv.wikisource 6,911, mad.wiktionary 5,181, id.wikisource 4,109.
- Test 3, top wikis: id.wikipedia 2,047, Commons 1,059, Wikidata 534, id.wiktionary 523, Incubator 412, bew.wiktionary 317, bew.wikipedia 219, Meta 194.
- Test 4:
  - First batch (automatic load): 178,547 edits. Wikis still remaining afterwards: Commons, id.wikipedia, id.wiktionary, and jv.wiktionary.
  - After "Load all": rose step by step to 448,729, then to a status of 466,229 with one wiki still running.
  - JS heap memory grew almost linearly: about 134 MB at 260k, 144 MB at 335k, 151 MB at 380k, 165 MB at about 450k.

Official counts for comparison (API, 28 Oct 2026):

| Account | Scope | Official edits |
|---|---|---|
| Bennylin | Global, all time | 489,883 |
| Bennylin | id.wikipedia, all time | 260,802 |
| Bennylin | Commons, all time | 91,402 |
| Affandy Murad | Global, all time | 6,139 |

## Findings

1. **Contribution scale is adequate.** About 466k edits loaded in roughly 12–15 minutes with about 165 MB of memory, no frozen tab and no UI error.
2. **The batch limit works as the text says.** Commons and id.wikipedia stopped at exactly 25,000 per load, matching the warning ("one load is at most 25,000 edits"). The guess that accounts with high API limits could exceed 25,000 per batch was **not confirmed** for Bennylin.
3. **"Load all" finishes wikis that were cut off.** In test 4, wikis that stopped at 25,000 continued well past that number.
4. **Loading is per wiki, not per edit.** The status count ("Fetching contributions… (N)") sometimes jumps by 10,000–50,000 at once because wikis load in parallel (3 at a time) and results are merged per round. That is expected, not a stall.
5. **Total match is not yet proven.** On the small account (Affandy Murad), Wikirekap loaded 5,714 of 6,139 official edits (a gap of 425, about 7%). The suspected cause is deleted edits, which do not appear in the public contributions list but remain in the edit count. This was not checked per wiki.

## Important notes

1. **Test 4 did not finish.** The browser tab navigated to `meta.wikimedia.org` while the test was running, so the data on the page was lost. I did not navigate it; the likely cause is a click or link on the user's side. The final all-time total for Bennylin, unique pages, and byte change at the 466k scale were **not obtained**.
2. **Test 4 time is an estimate.** In the earlier chat report I said about 20 minutes. Recounting from the number of polling intervals (about 29 seconds each), a better figure is about 12–15 minutes to the 466k point. The automatic timer I installed was lost when the tab navigated away, so this is not a direct measurement.
3. **Pageviews were not tested at scale.** In all tests pageviews were filled in only for the first 8 to 100 rows (lazy loading). The "Total Views" in the summary covers only those rows, not the real total:
   - Test 1: 8 of 14,835 rows (65,772 views).
   - Test 2: 100 of 74,614 rows (1,308,941 views).
   - Test 3: 100 of 3,307 rows (64,295 views).
4. **The pageviews projection was not measured.** Using the ETA formula in the code (2 requests per page for ranges over 62 days, 0.8 s per request, 6 in parallel), pageviews for 74,614 pages (test 2) would take roughly 5–6 hours. For a full 320k-edit scale it could be many hours or more. This is a rough calculation, not a test result. The number of 429 responses was not measured.
5. **Export was not tested.** PDF (capped at 5,000 rows) and JSON on large data were not tried. JSON file size and peak memory during export are unknown.
6. **The memory figures cover only the JavaScript heap.** The 74 MB and 165 MB figures come from `performance.memory.usedJSHeapSize` (Chromium only, JS heap only). Total tab memory (DOM, table, caches) may be larger and was not measured through Chrome Task Manager.
7. **The test ran in the Claude Code browser pane, not the user's Chrome.** Behavior in regular Chrome, Firefox, or on devices with limited RAM may differ.
8. **Throttle and 429 were not logged.** No error appeared in the UI, but retries and 429 responses during the test were not counted.
9. **Test accounts.** `Bennylin` and `Affandy Murad` were used at the user's request. Only public contribution data was fetched; no personal data was stored outside the page.
10. **The date range locks two things at once.** The selected range limits the edits fetched and also sets the pageviews period. For "all time", the edit range starts on 1 January 2001, but pageviews are only counted from 1 July 2015 (the start of the per-article API).

## Recommended next steps

1. Repeat test 4 to completion in the user's Chrome, with Chrome Task Manager open and no clicks during the run. Record the final total, unique pages, and byte change, then compare with 489,883.
2. Measure pageviews speed in a limited way: load one page of 500 rows, record the time and the number of 429s, then extrapolate.
3. Test JSON export (size, time, memory) and PDF export (the 5,000-row limit dialog) on the test 4 result.
4. Check the 425-edit gap on Affandy Murad per wiki to confirm the "deleted edits" explanation.
