const { jsPDF } = window.jspdf;
const salesData = [150, 123, 180, 240, 350, 210, 190];
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const revenuePerUnit = 10; // Misalnya, pendapatan per unit produk adalah 10

// Membuat gradien untuk batang di grafik
const ctx = document.getElementById('salesChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#FFDDC1'); // Peach
gradient.addColorStop(1, '#FF677D'); // Pink

// Membuat grafik bar menggunakan Chart.js
const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: days,
        datasets: [{
            label: 'Penjualan Produk',
            data: salesData,
            backgroundColor: gradient,
            borderColor: '#FFFFFF',
            borderWidth: 1,
            hoverBackgroundColor: gradient,
            hoverBorderColor: '#FFFFFF'
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Mengisi tabel dengan data penjualan
const salesTableBody = document.getElementById('salesTableBody');
days.forEach((day, index) => {
    const row = document.createElement('tr');
    const sold = salesData[index];
    const revenue = sold * revenuePerUnit;

    row.innerHTML = `
        <td>${day}</td>
        <td>${sold}</td>
        <td>${revenue}</td>
    `;
    salesTableBody.appendChild(row);
});

// Fungsi untuk membuat PDF
function generatePDF() {
    const pdf = new jsPDF();

    // Menambahkan judul
    pdf.setFontSize(16);
    pdf.text('Laporan Penjualan Mingguan Hyundai', 10, 10);

    // Menambahkan grafik ke dalam PDF
    const chartCanvas = document.getElementById('salesChart');
    const chartDataUrl = chartCanvas.toDataURL('image/png');
    pdf.addImage(chartDataUrl, 'PNG', 10, 20, 180, 80);

    // Data untuk tabel
    const tableData = days.map((day, index) => {
        const sold = salesData[index];
        const revenue = sold * revenuePerUnit;
        return [day, sold, revenue];
    });

    // Menambahkan tabel ke dalam PDF
    pdf.autoTable({
        head: [['Hari', 'Produk Terjual', 'Pendapatan']],
        body: tableData,
        startY: 110
    });

    // Mengunduh PDF
    pdf.save('Laporan_Penjualan_Mingguan.pdf');
}
