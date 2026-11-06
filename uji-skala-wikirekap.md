# Uji skala Wikirekap (target: sekitar 320.000 suntingan)

> Bahasa Indonesia di bawah. [English version below](#english).

Dokumen kerja untuk uji manual. Tidak ada perubahan kode. Isi kolom hasil sambil menguji.

## Persiapan

- Browser: Chrome. Buka Chrome Task Manager (Shift+Esc) untuk memantau memori tab, dan DevTools tab Network (filter `rest_v1` dan `api.php`).
- Akun uji: `NamaAkun` (ganti). Catat jumlah suntingan resmi dari Special:CentralAuth atau Special:Contributions.
- Proyek uji: `PROYEK` (mis. `id.wikipedia.org`). Untuk akun multi-proyek, pakai `global`.
- Mulai dari tab baru tanpa tab berat lain. Tutup DevTools Performance saat tidak dipakai.
- Tanggal hari uji: ______   Akun: ______   Proyek: ______   Jumlah suntingan resmi: ______

Dasar URL (otomatis menjalankan analisis bila `user` dan `project` ada):

```
https://affandymurad.github.io/wikirekap/?user=NamaAkun&project=PROYEK&period=...
```

Untuk uji lokal, ganti awalannya dengan `http://localhost:8090/wikirekap/`.

## Tahapan

### T1. Baseline (akun kecil, 30 hari)

```
/wikirekap/?user=NamaAkun&project=PROYEK&period=30
```

Periksa:
- Total suntingan, byte, dan artikel cocok dengan Special:Contributions pada rentang yang sama.
- Pageviews halaman pertama terisi.

### T2. Batas batch (sekitar 30.000 suntingan)

Pilih rentang tanggal yang menghasilkan 30.000 sampai 60.000 suntingan.

```
/wikirekap/?user=NamaAkun&project=PROYEK&from=YYYY-MM-DD&to=YYYY-MM-DD
```

Periksa:
- Peringatan batch muncul. Catat jumlah yang benar-benar dimuat dan bandingkan dengan angka di teks peringatan (25.000). Bila akun punya hak `apihighlimits`, jumlahnya bisa jauh lebih besar.
- "Muat berikutnya" melanjutkan tanpa duplikat. Total setelah "Muat semua" sama dengan jumlah di sumber.

### T3. Sekitar 100.000 suntingan, hanya namespace utama

```
/wikirekap/?user=NamaAkun&project=PROYEK&from=YYYY-MM-DD&to=YYYY-MM-DD&main=1
```

Periksa: puncak memori, kecepatan tabel dan kolom pencarian (ketik cepat), waktu total.

### T4. Seluruh 320.000 suntingan, tanpa memuat pageviews

```
/wikirekap/?user=NamaAkun&project=PROYEK&period=all
```

Lalu klik "Muat semua" pada peringatan batch. Jangan klik pemuatan pageviews.

Periksa:
- Waktu total dan jumlah request `api.php`.
- Puncak memori tab. Catat bila lebih dari 1 GB atau tab macet.
- Uji Batal di tengah (misalnya setelah 5 batch), lalu lanjutkan. Total akhir harus tetap sama dan tanpa duplikat.
- Total suntingan, byte, dan artikel cocok dengan sumber.

### T5. Pageviews malas (satu halaman tabel)

Dari T4, ubah jumlah per halaman ke 50, lalu 500, dan lihat pageviews terisi untuk halaman yang tampil.

Periksa: waktu per halaman, jumlah respons 429, dan apakah baris yang gagal bisa dituntaskan dengan "Coba lagi".

### T6. Pageviews penuh / urut menurut pageviews

Dari T4, urutkan menurut pageviews atau klik "Muat semua" data pelengkap. Hentikan dengan Batal setelah 10 sampai 15 menit.

Periksa:
- ETA yang ditampilkan vs kecepatan nyata (hitung baris selesai per menit).
- Throttle turun dan naik (lihat jumlah request paralel di Network).
- Setelah Batal, hasil sebagian tersimpan dan UI tetap responsif.

### T7. Ekspor

Dari T4 atau T6:
- Ekspor PDF: dialog batas 5.000 baris muncul dan PDF terbentuk.
- Ekspor JSON: catat ukuran file, waktu, dan memori puncak.

## Tabel hasil

| Tahap | Suntingan dimuat | Artikel unik | Waktu total | Memori puncak | Request api.php | Request pageviews | 429 | Hasil / catatan |
|---|---|---|---|---|---|---|---|---|
| T1 | | | | | | | | |
| T2 | | | | | | | | |
| T3 | | | | | | | | |
| T4 | | | | | | | | |
| T5 | | | | | | | | |
| T6 | | | | | | | | |
| T7 | | | | | | | | |

## Pemeriksaan keselarasan data

- [ ] Total suntingan Wikirekap = jumlah di sumber (selisih 0)
- [ ] Total byte masuk akal terhadap sumber lain (mis. XTools)
- [ ] Jumlah baris tabel = jumlah artikel unik
- [ ] Tidak ada duplikat setelah "Muat berikutnya" atau lanjut setelah Batal
- [ ] Teks peringatan batch sesuai jumlah nyata per batch
- [ ] Pageviews: periode di tabel sama dengan rentang tanggal yang dipilih
- [ ] "Semua waktu" memberi catatan mulai 1 Juli 2015

## Temuan

| # | Tahap | Gejala | Dugaan | Prioritas |
|---|---|---|---|---|
| 1 | | | | |


---

<a id="english"></a>

# Wikirekap scale test (English)

Working document for manual testing. No code changes. Fill in the result columns as you test. Target: an account with about 320,000 edits.

## Preparation

- Browser: Chrome. Open Chrome Task Manager (Shift+Esc) to watch tab memory, and the DevTools Network tab (filter `rest_v1` and `api.php`).
- Test account: `AccountName` (replace). Record the official edit count from Special:CentralAuth or Special:Contributions.
- Test project: `PROJECT` (e.g. `id.wikipedia.org`). For multi-project accounts use `global`.
- Start in a fresh tab with no other heavy tabs. Close DevTools Performance when not in use.
- Test date: ______   Account: ______   Project: ______   Official edit count: ______

Base URL (the analysis runs automatically when `user` and `project` are present):

```
https://affandymurad.github.io/wikirekap/?user=AccountName&project=PROJECT&period=...
```

For a local test, replace the prefix with `http://localhost:8090/wikirekap/`.

## Stages

### T1. Baseline (small account, 30 days)

```
/wikirekap/?user=AccountName&project=PROJECT&period=30
```

Check:
- Total edits, bytes, and pages match Special:Contributions for the same range.
- Pageviews on the first page are filled in.

### T2. Batch limit (about 30,000 edits)

Choose a date range that yields 30,000 to 60,000 edits.

```
/wikirekap/?user=AccountName&project=PROJECT&from=YYYY-MM-DD&to=YYYY-MM-DD
```

Check:
- The batch warning appears. Record how many edits actually loaded and compare with the number in the warning text (25,000). If the account has the `apihighlimits` right, the number may be much higher.
- "Load next" continues without duplicates. The total after "Load all" equals the source count.

### T3. About 100,000 edits, main namespace only

```
/wikirekap/?user=AccountName&project=PROJECT&from=YYYY-MM-DD&to=YYYY-MM-DD&main=1
```

Check: peak memory, table and search box speed (type quickly), total time.

### T4. All 320,000 edits, without loading pageviews

```
/wikirekap/?user=AccountName&project=PROJECT&period=all
```

Then click "Load all" on the batch warning. Do not trigger pageviews loading.

Check:
- Total time and number of `api.php` requests.
- Peak tab memory. Note if it exceeds 1 GB or the tab freezes.
- Test Cancel midway (for example after 5 batches), then resume. The final total must still match, with no duplicates.
- Total edits, bytes, and pages match the source.

### T5. Lazy pageviews (one table page)

From T4, set rows per page to 50, then 500, and watch pageviews fill in for the visible page.

Check: time per page, number of 429 responses, and whether failed rows can be finished with "Retry".

### T6. Full pageviews / sort by pageviews

From T4, sort by pageviews or click "Load all" for the supplementary data. Stop with Cancel after 10 to 15 minutes.

Check:
- The displayed ETA vs real speed (count rows finished per minute).
- Throttle going down and up (watch the number of parallel requests in Network).
- After Cancel, partial results are kept and the UI stays responsive.

### T7. Export

From T4 or T6:
- PDF export: the 5,000-row limit dialog appears and the PDF is produced.
- JSON export: record file size, time, and peak memory.

## Results table

| Stage | Edits loaded | Unique pages | Total time | Peak memory | api.php requests | Pageviews requests | 429s | Result / notes |
|---|---|---|---|---|---|---|---|---|
| T1 | | | | | | | | |
| T2 | | | | | | | | |
| T3 | | | | | | | | |
| T4 | | | | | | | | |
| T5 | | | | | | | | |
| T6 | | | | | | | | |
| T7 | | | | | | | | |

## Data consistency checks

- [ ] Wikirekap total edits = count at the source (difference 0)
- [ ] Total bytes plausible against another source (e.g. XTools)
- [ ] Table row count = number of unique pages
- [ ] No duplicates after "Load next" or resuming after Cancel
- [ ] Batch warning text matches the actual number per batch
- [ ] Pageviews: the period in the table equals the selected date range
- [ ] "All time" shows the note about starting on 1 July 2015

## Findings

| # | Stage | Symptom | Suspected cause | Priority |
|---|---|---|---|---|
| 1 | | | | |
