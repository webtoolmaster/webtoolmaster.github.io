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

// --- JSON İŞLEME SİSTEMİ ---
const jsonInput = document.getElementById('jsonInput');
const statusLabel = document.getElementById('statusLabel');

function showStatus(msg, type) {
    statusLabel.innerText = msg;
    statusLabel.className = `absolute bottom-4 right-6 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest ${
        type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
    }`;
    statusLabel.classList.remove('hidden');
    
    if (type === 'error') {
        jsonInput.classList.add('json-error');
    } else {
        jsonInput.classList.remove('json-error');
        setTimeout(() => statusLabel.classList.add('hidden'), 3000);
    }
}

function processJSON(action) {
    const rawValue = jsonInput.value.trim();
    if (!rawValue) return;

    try {
        const jsonObj = JSON.parse(rawValue);
        let formatted;

        if (action === 'beautify') {
            formatted = JSON.stringify(jsonObj, null, 4);
            showStatus('BAŞARIYLA FORMATLANDI', 'success');
        } else {
            formatted = JSON.stringify(jsonObj);
            showStatus('BAŞARIYLA KÜÇÜLTÜLDÜ', 'success');
        }

        jsonInput.value = formatted;
        jsonInput.classList.remove('json-error');
    } catch (e) {
        showStatus('HATA: GEÇERSİZ JSON FORMATI', 'error');
    }
}

function copyToClipboard() {
    jsonInput.select();
    document.execCommand('copy');
    const originalText = statusLabel.innerText;
    showStatus('KOPYALANDI!', 'success');
}

function clearAll() {
    jsonInput.value = '';
    jsonInput.classList.remove('json-error');
    statusLabel.classList.add('hidden');
}

// Otomatik doğrulama (Yazarken kontrol)
jsonInput.addEventListener('input', () => {
    if (jsonInput.value.trim() === "") {
        jsonInput.classList.remove('json-error');
        statusLabel.classList.add('hidden');
        return;
    }
    try {
        JSON.parse(jsonInput.value);
        jsonInput.classList.remove('json-error');
        statusLabel.classList.add('hidden');
    } catch (e) {
        // Yazarken hemen hata vermeyelim, kullanıcıyı rahatsız etmesin
    }
});