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

// --- BİNANCE HESAPLAMA SİSTEMİ ---
const amountInput = document.getElementById('cryptoAmount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const resultDisplay = document.getElementById('resultDisplay');
const rateDisplay = document.getElementById('conversionRate');
const lastUpdateDisplay = document.getElementById('lastUpdate');

// Yaklaşık döviz kurları (API'den de çekilebilir, ancak statik hız sağlar)
const FIAT_RATES = {
    "USD": 1,
    "TRY": 34.50, // Güncel kur
    "EUR": 0.92
};

async function getCryptoPrice() {
    const symbol = fromSelect.value;
    const amount = parseFloat(amountInput.value) || 0;
    const targetFiat = toSelect.value;

    if (amount <= 0) {
        resultDisplay.innerText = "0.00 " + targetFiat;
        return;
    }

    try {
        // Binance API - Public Ticker Price
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const data = await response.json();
        
        if (data.price) {
            const priceInUsdt = parseFloat(data.price);
            const fiatRate = FIAT_RATES[targetFiat];
            
            const finalPrice = priceInUsdt * fiatRate;
            const totalValue = amount * finalPrice;

            // Ekran Güncelleme
            rateDisplay.innerText = `1 ${symbol.replace('USDT', '')} = ${finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ${targetFiat}`;
            
            resultDisplay.innerText = totalValue.toLocaleString('tr-TR', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
            }) + " " + targetFiat;

            // Zaman Damgası
            const now = new Date();
            lastUpdateDisplay.innerText = `Son Güncelleme: ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        }
    } catch (error) {
        console.error("Binance API Hatası:", error);
        resultDisplay.innerText = "Hata!";
        rateDisplay.innerText = "Veri bağlantısı kurulamadı.";
    }
}

// Event Listeners
[amountInput, fromSelect, toSelect].forEach(item => {
    item.addEventListener('input', getCryptoPrice);
    item.addEventListener('change', getCryptoPrice);
});

// Sayfa açıldığında başlat
getCryptoPrice();

// Her 30 saniyede bir otomatik güncelle (Canlılık hissi için)
setInterval(getCryptoPrice, 30000);