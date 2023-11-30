## Tentang Soal
Sebuah perusahaan tambang nikel berlokasi di beberapa daerah (region), satu kantor
pusat, satu kantor cabang dan memiliki enam tambang dengan lokasi yang berbeda. Perusahaan
tersebut mempunyai banyak kendaraan dengan jenis kendaraan angkutan orang dan angkutan
barang. Selain kendaraan milik perusahaan, ada juga kendaraan yang disewa dari perusahaan
persewaan.

Perusahaan tersebut membutuhkan sebuah web aplikasi untuk dapat memonitoring
kendaraan yang dimiliki. Mulai dari konsumsi BBM, jadwal service dan riwayat pemakaian
kendaraan. Untuk dapat memakai kendaraan, pegawai diwajibkan untuk melakukan pemesanan
terlebih dahulu ke pool atau bagian pengelola kendaraan dan pemakaian kendaraan harus
diketahui atau disetujui oleh masing - masing atasan.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Dibangun menggunakan

![React][React.js]
![Laravel][Laravel.com]
![MySql][MySql]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Langkah - langkah memulai program

1. Download code dari github dan extract di local.
2. Masuk ke folder yang sudah di extract tadi lalu jalankan terminal dan masuk ke folder backend.
3. Update Composer
    ```sh
    composer update
    ```
4. Setting env (copy paste dan nama databe di cocokan)
5. Update key
    ```sh
    php artisan jwt:secret
    ```
6. Jalankan XAMPP , mysql
7. Kembali ke terminal tadi, masukan perintah dibawah ini untuk migrate dan seed database
    ```sh
    php artisan migrate:fresh --seed
    ```
8. Lalu jalankan backend
    ```sh
    php artisan serve
    ```
9. Buka terminal di folder frontend dan jalankan perintah
    ```sh
    npm install
    ```
10. Setelah itu jalankan di terminal
    ```sh
    npm run dev
    ```
11. buka browser dan jalankan http://localhost:5173

## Cara menggunakan
1. login sebagai admin 
    - username : admin
    - password : admin
2. login sebagai user/pihak menyetujui (user_1)
    - username : user_1
    - password : user_1
3. login sebagai user/pihak menyetujui (user_2)
    - username : user_2
    - password : user_2
     

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Informasi Tambahan
1. PHP versi 8
2. Laravel versi 9



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[MySql]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white