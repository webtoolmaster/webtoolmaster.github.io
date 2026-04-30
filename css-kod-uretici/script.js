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

// --- CSS GENERATOR SİSTEMİ ---
const previewBox = document.getElementById('previewBox');
const cssOutput = document.getElementById('cssOutput');

// Inputlar
const inputs = {
    h: document.getElementById('hShadow'),
    v: document.getElementById('vShadow'),
    b: document.getElementById('blurShadow'),
    r: document.getElementById('borderRadius'),
    bc: document.getElementById('boxColor'),
    sc: document.getElementById('shadowColor')
};

// Değer Göstergeleri
const views = {
    vH: document.getElementById('vH'),
    vV: document.getElementById('vV'),
    vB: document.getElementById('vB'),
    vR: document.getElementById('vR')
};

function updateCSS() {
    const h = inputs.h.value;
    const v = inputs.v.value;
    const b = inputs.b.value;
    const r = inputs.r.value;
    const bc = inputs.bc.value;
    const sc = inputs.sc.value;

    // Görünüm değerlerini güncelle
    views.vH.innerText = h + 'px';
    views.vV.innerText = v + 'px';
    views.vB.innerText = b + 'px';
    views.vR.innerText = r + 'px';

    // Gölge rengini saydamlaştırma (RGBA desteği için basit bir ek)
    const shadowStyle = `${h}px ${v}px ${b}px ${sc}`;
    
    // Önizlemeyi güncelle
    previewBox.style.backgroundColor = bc;
    previewBox.style.boxShadow = shadowStyle;
    previewBox.style.borderRadius = r + 'px';

    // Kodu oluştur
    const generatedCode = `background-color: ${bc};<br>box-shadow: ${shadowStyle};<br>border-radius: ${r}px;`;
    cssOutput.innerHTML = generatedCode;
}

function copyCSS() {
    const textToCopy = cssOutput.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.querySelector('button[onclick="copyCSS()"]');
        const originalText = btn.innerText;
        btn.innerText = "Kopyalandı!";
        btn.classList.replace('bg-blue-600', 'bg-green-500');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.replace('bg-green-500', 'bg-blue-600');
        }, 2000);
    });
}

// Event Listeners
Object.values(inputs).forEach(input => {
    input.addEventListener('input', updateCSS);
});

// İlk çalıştırma
updateCSS();