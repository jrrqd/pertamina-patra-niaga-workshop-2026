# Cursor Origin — hosting hands-on (bukan GitHub)

Workshop ini **tidak memakai GitHub**.

## Repo yang sudah dibuat

| Field | Nilai |
| --- | --- |
| fullName | `rizki/pertamina-patra-niaga-workshop-2026` |
| visibility | private |
| cloneUrl | `https://origin.cursor.com/rizki/pertamina-patra-niaga-workshop-2026.git` |

## Status push

Repo Origin sudah dibuat (kosong di remote). Commit lokal sudah siap di mesin fasilitator (`main`).  
`git push` dari agen gagal karena prompt kredensial HTTPS Origin (`could not read Username for https://origin.cursor.com`).

**Fasilitator:** dari Cursor desktop yang sudah login ke akun yang sama, buka Source Control → Push ke `origin`, atau jalankan:

```bash
cd "/Users/rizkisuluhadi/Documents/+personal projects/2026 pertamina patra niaga training"
git remote -v   # harus menunjuk origin.cursor.com/rizki/pertamina-patra-niaga-workshop-2026.git
git push -u origin main
```

Undang empat akun Cursor sub-fungsi ke Team / collaborator Origin.

## Peserta

1. Clone repo Origin di Cursor desktop.
2. Buka Live App paparan/brief → salin prompt.
3. Tempel di Agent/grokbot di workspace Origin.
4. Push hanya folder sub-fungsi Anda; pull sebelum langkah berikutnya.
