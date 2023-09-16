document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi variabel untuk menyimpan data pendaftar
  const pendaftar = [];

  // Handle submit form Registrasi
  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Ambil data dari form
    const nama = document.getElementById("nama").value;
    const umur = parseInt(document.getElementById("umur").value);
    const uangsangu = parseInt(document.getElementById("uangsangu").value);

    // Validasi data
    if (
      nama.length < 10 ||
      umur < 25 ||
      uangsangu < 100000 ||
      uangsangu > 1000000
    ) {
      alert(
        "Waduh. Sayang sekali!! Datamu tidak memenuhi kriteria. Coba periksa ulang!."
      );
      return;
    }

    // Tambahkan data ke array pendaftar
    pendaftar.push({ nama, umur, uangsangu });

    // Reset form
    registrationForm.reset();

    // Refresh tabel List Pendaftar
    refreshListPendaftar();
  });

  // Fungsi untuk menghitung rata-rata umur dan uang saku
  function hitungRataRata() {
    let totalUmur = 0;
    let totalUangSaku = 0;

    for (const p of pendaftar) {
      totalUmur += p.umur;
      totalUangSaku += p.uangsangu;
    }

    const avgUmur = totalUmur / pendaftar.length;
    const avgUangSaku = totalUangSaku / pendaftar.length;

    return { avgUmur, avgUangSaku };
  }

  // Fungsi untuk mengisi ulang tabel List Pendaftar
  function refreshListPendaftar() {
    const listPendaftar = document.getElementById("listPendaftar");
    const avgData = hitungRataRata();

    listPendaftar.innerHTML = "";

    for (const p of pendaftar) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${p.nama}</td>
                <td>${p.umur}</td>
                <td>${p.uangsangu}</td>
            `;
      listPendaftar.appendChild(row);
    }

    // Tampilkan rata-rata di bawah tabel
    const avgUmurElement = document.getElementById("avgUmur");
    const avgUangSakuElement = document.getElementById("avgUangSaku");

    avgUmurElement.textContent = avgData.avgUmur.toFixed(2);
    avgUangSakuElement.textContent = avgData.avgUangSaku.toFixed(2);
  }

  // Panggil fungsi untuk mengisi ulang tabel saat halaman dimuat
  refreshListPendaftar();
});
