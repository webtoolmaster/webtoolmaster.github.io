// --- TEMA YÖNETİMİ ---
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// --- BOYUTLANDIRMA SİSTEMİ ---
const fileInput = document.getElementById('fileInput');
const dropZone = document.getElementById('dropZone');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const aspectRatio = document.getElementById('aspectRatio');
const resizeBtn = document.getElementById('resizeBtn');
const canvas = document.getElementById('canvas');
const downloadBtn = document.getElementById('downloadBtn');
const previewContainer = document.getElementById('previewContainer');
const placeholder = document.getElementById('placeholder');

let originalImage = new Image();
let ratio = 1;

// Dosya Seçme Tetikleyicileri
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFile);

function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        originalImage.onload = () => {
            widthInput.value = originalImage.width;
            heightInput.value = originalImage.height;
            ratio = originalImage.width / originalImage.height;
            placeholder.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            drawToCanvas(originalImage.width, originalImage.height);
        };
        originalImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// En/Boy Oranı Kilidi
widthInput.addEventListener('input', () => {
    if (aspectRatio.checked) {
        heightInput.value = Math.round(widthInput.value / ratio);
    }
});

heightInput.addEventListener('input', () => {
    if (aspectRatio.checked) {
        widthInput.value = Math.round(heightInput.value * ratio);
    }
});

function drawToCanvas(w, h) {
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(originalImage, 0, 0, w, h);
}

resizeBtn.addEventListener('click', () => {
    const w = parseInt(widthInput.value);
    const h = parseInt(heightInput.value);
    
    if (isNaN(w) || isNaN(h)) return;

    drawToCanvas(w, h);
    
    // İndirme linkini güncelle
    downloadBtn.href = canvas.toDataURL('image/png');
    downloadBtn.download = `webtoolmaster-${w}x${h}.png`;
});