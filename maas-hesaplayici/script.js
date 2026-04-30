// --- TEMA YÖNETİMİ ---
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

if (document.documentElement.classList.contains('dark')) {
    lightIcon.classList.remove('hidden');
} else {
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', () => {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// --- MAAŞ HESAPLAMA SİSTEMİ ---
function calculateSalary() {
    const salary = parseFloat(document.getElementById('salaryInput').value);
    const type = document.getElementById('calcType').value;

    if (isNaN(salary) || salary <= 0) return;

    let brut, net, sgk, issizlik, gelir, damga;

    if (type === 'brutToNet') {
        brut = salary;
        sgk = brut * 0.14;
        issizlik = brut * 0.01;
        damga = brut * 0.00759;
        
        // Basitleştirilmiş %15 Gelir Vergisi (Vergi dilimi muafiyetleri hariç kaba hesap)
        const vergiMatrahi = brut - (sgk + issizlik);
        gelir = vergiMatrahi * 0.15;
        
        net = brut - (sgk + issizlik + gelir + damga);
    } else {
        // Netten Brüte (Katsayı ile yaklaşık hesap)
        brut = salary / 0.71; 
        sgk = brut * 0.14;
        issizlik = brut * 0.01;
        damga = brut * 0.00759;
        gelir = (brut - (sgk + issizlik)) * 0.15;
        net = salary;
    }

    // Ekranı Güncelle
    const format = (val) => val.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
    
    document.getElementById('netResult').innerText = format(net);
    document.getElementById('sgkIsci').innerText = format(sgk);
    document.getElementById('issizlik').innerText = format(issizlik);
    document.getElementById('gelirVergisi').innerText = format(gelir);
    document.getElementById('damgaVergisi').innerText = format(damga);
    document.getElementById('totalDeduction').innerText = format(sgk + issizlik + gelir + damga);
}

// İlk açılışta hesapla
calculateSalary();