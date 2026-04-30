// --- TEMA YÖNETİMİ ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

if (document.documentElement.classList.contains('dark')) {
    lightIcon.classList.remove('hidden');
} else {
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function() {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
});

// --- QR KOD SİSTEMİ ---
let qrcode = null;

function generateQR() {
    const text = document.getElementById('qrInput').value;
    const size = document.getElementById('qrSize').value;
    const color = document.getElementById('qrColor').value;
    const qrContainer = document.getElementById('qrcode');
    const placeholder = document.getElementById('qrPlaceholder');
    const downloadBtn = document.getElementById('downloadBtnContainer');

    if (!text.trim()) {
        alert("Lütfen bir metin veya link girin.");
        return;
    }

    // Temizlik
    qrContainer.innerHTML = "";
    placeholder.classList.add('hidden');
    downloadBtn.classList.remove('hidden');

    // Yeni QR oluşturma
    qrcode = new QRCode(qrContainer, {
        text: text,
        width: parseInt(size),
        height: parseInt(size),
        colorDark : color,
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function downloadQR() {
    const img = document.querySelector('#qrcode img');
    if (img) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'webtoolmaster-qr.png';
        link.click();
    } else {
        // Kütüphane bazen canvas kullanır
        const canvas = document.querySelector('#qrcode canvas');
        const link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = 'webtoolmaster-qr.png';
        link.click();
    }
}