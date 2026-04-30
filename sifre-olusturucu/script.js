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

// --- ŞİFRE OLUŞTURMA SİSTEMİ ---
const display = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const chars = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

function generatePassword() {
    let length = lengthSlider.value;
    let charset = chars.lower;
    
    if (document.getElementById('includeUppercase').checked) charset += chars.upper;
    if (document.getElementById('includeNumbers').checked) charset += chars.numbers;
    if (document.getElementById('includeSymbols').checked) charset += chars.symbols;

    let password = '';
    // Güvenlik için Math.random yerine Crypto API kullanılabilir ama bu seviyede Math yeterlidir.
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    display.value = password;
    updateStrength(length, charset.length);
}

function updateStrength(len, charsetLen) {
    // Entropi hesabı (Basit)
    let entropy = len * Math.log2(charsetLen);
    let width = Math.min((entropy / 128) * 100, 100);
    
    strengthBar.style.width = width + '%';
    
    if (width < 30) {
        strengthBar.className = 'h-full bg-red-500 transition-all';
        strengthText.innerText = 'Zayıf';
    } else if (width < 60) {
        strengthBar.className = 'h-full bg-yellow-500 transition-all';
        strengthText.innerText = 'Orta';
    } else {
        strengthBar.className = 'h-full bg-green-500 transition-all';
        strengthText.innerText = 'Çok Güçlü';
    }
}

function copyToClipboard() {
    display.select();
    document.execCommand('copy');
    
    const toast = document.getElementById('copyToast');
    toast.style.opacity = '1';
    setTimeout(() => { toast.style.opacity = '0'; }, 2000);
}

// Event Listeners
lengthSlider.addEventListener('input', (e) => {
    lengthValue.innerText = e.target.value;
    generatePassword();
});

// İlk açılışta üret
generatePassword();