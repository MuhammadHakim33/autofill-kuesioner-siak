# Autofill Kuesioner Siak
Autofill kuesioner untuk siak universitas.

## Tech Stack
1. NodeJs
2. Puppeteer

## Instalasi
1. Instal nodejs
2. Jalankan ```npm i``` untuk menginstal 
3. Clone atau download repo ini dependencies
4. Buat file ```.env``` dengan menggunakan template dari ```.env.sample```
    - ```SIAK_USERNAME``` adalah username akun siak
    - ```SIAK_PASSWORD``` adalah password akun siak
    - ```SIAK_KUESIONER_LINK``` adalah link halaman list kuesioner
    - ```SIAK_KUESIONER_OPTION``` adalah pilihan jawaban untuk setiap kuesioner. isi ```A``` atau ```B``` atau ```C``` atau ```D``` 
5. Jalankan program dengan ```npm start```
    