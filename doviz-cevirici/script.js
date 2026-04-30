// --- TEMA VE NAVİGASYON ---
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

// --- DÖVİZ HESAPLAMA SİSTEMİ ---
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const resultDisplay = document.getElementById('resultDisplay');
const rateDisplay = document.getElementById('baseRate');

async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromSelect.value;
    const to = toSelect.value;

    if (amount === "" || amount <= 0) {
        resultDisplay.innerText = "Miktar Girin";
        return;
    }

    try {
        // ExchangeRate-API (Ücretsiz ve hızlı)
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.rates[to];
            const total = (amount * rate).toLocaleString('tr-TR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            });
            
            rateDisplay.innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
            resultDisplay.innerText = `${total} ${to}`;
        } else {
            throw new Error("Veri alınamadı");
        }
    } catch (error) {
        console.error("Hata:", error);
        resultDisplay.innerText = "Hata!";
        rateDisplay.innerText = "Bağlantı kontrol ediliyor...";
    }
}

// Dinamik Güncelleme
[amountInput, fromSelect, toSelect].forEach(element => {
    element.addEventListener('input', convertCurrency);
    element.addEventListener('change', convertCurrency);
});

// Başlangıç tetiklemesi
convertCurrency();