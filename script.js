// --- TEMA MANTIĞI ---
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

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

// --- TÜM ARAÇLARIN LİSTESİ ---
const tools = [
    { title: "Kredi Hesaplama", desc: "Aylık taksit, faiz oranı ve detaylı ödeme planı oluşturun.", icon: "💰", link: "kredi-hesaplama/index.html" },
    { title: "Kripto Çevirici", desc: "TRX, XRP, BTC ve diğer birimleri anlık kurlarla çevirin.", icon: "📉", link: "kripto-cevirici/index.html" },
    { title: "Şifre Oluşturucu", desc: "Yüksek güvenlikli, kırılamaz özel şifreler üretin.", icon: "🔐", link: "sifre-olusturucu/index.html" },
    { title: "Kelime Sayacı", desc: "Metinlerdeki karakter, kelime ve boşluk sayısını analiz edin.", icon: "📝", link: "kelime-sayaci/index.html" },
    { title: "QR Kod Üretici", desc: "Link, metin veya Wi-Fi için anında QR kod oluşturun.", icon: "📱", link: "qr-kod-uretici/index.html" },
    { title: "CSS Kod Üretici", desc: "Gölge, gradyan ve butonlar için hazır CSS kodları alın.", icon: "🎨", link: "css-kod-uretici/index.html" },
    { title: "Döviz Çevirici", desc: "Merkez Bankası verileriyle Dolar, Euro ve TL çevirisi yapın.", icon: "💵", link: "doviz-cevirici/index.html" },
    { title: "Birim Dönüştürücü", desc: "Uzunluk, ağırlık ve sıcaklık birimlerini hızlıca dönüştürün.", icon: "📏", link: "birim-donusturucu/index.html" },
    { title: "JSON Formatlayıcı", desc: "Karmaşık JSON kodlarını okunabilir ve düzenli hale getirin.", icon: "💻", link: "json-formatlayici/index.html" },
    { title: "Maaş Hesaplayıcı", desc: "Netten brüte maaş ve gelir vergisi kesintilerini görün.", icon: "🏦", link: "maas-hesaplayici/index.html" },
    { title: "Resim Boyutlandırıcı", desc: "Tarayıcı tabanlı çalışan, resmi sunucuya yüklemeden (gizlilik dostu) anında boyutlandıran bir yapı.", icon: "🖼️", link: "resim-boyutlandirici/index.html" }
];

const toolGrid = document.getElementById('toolGrid');
const searchInput = document.getElementById('toolSearch');

function displayTools(toolsToRender) {
    toolGrid.innerHTML = '';
    toolsToRender.forEach(tool => {
        const card = `
            <div class="tool-card bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between h-full">
                <div>
                    <div class="text-5xl mb-6">${tool.icon}</div>
                    <h3 class="text-2xl font-bold mb-3 dark:text-white tracking-tight">${tool.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-8">${tool.desc}</p>
                </div>
                <a href="${tool.link}" class="inline-block w-full text-center bg-gray-50 dark:bg-gray-700/50 text-blue-600 dark:text-blue-400 px-6 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300">
                    Aracı Kullan
                </a>
            </div>
        `;
        toolGrid.innerHTML += card;
    });
}

// Arama Filtreleme
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = tools.filter(tool => 
        tool.title.toLowerCase().includes(term) || 
        tool.desc.toLowerCase().includes(term)
    );
    displayTools(filtered);
});

// Sayfa ilk açıldığında tüm araçları göster
displayTools(tools);