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

// --- BİRİM VERİLERİ ---
const units = {
    length: {
        'Metre': 1, 'Kilometre': 0.001, 'Santimetre': 100, 'Milimetre': 1000, 'İnç': 39.37, 'Ayak (ft)': 3.28
    },
    weight: {
        'Kilogram': 1, 'Gram': 1000, 'Miligram': 1000000, 'Ton': 0.001, 'Pound': 2.204, 'Ons': 35.27
    },
    temp: { 'Celsius': 'C', 'Fahrenheit': 'F', 'Kelvin': 'K' }
};

let currentCategory = 'length';

function setCategory(cat) {
    currentCategory = cat;
    // Buton stilleri
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${cat}`).classList.add('active');
    
    // Select seçeneklerini doldur
    const inSelect = document.getElementById('inputUnit');
    const outSelect = document.getElementById('outputUnit');
    inSelect.innerHTML = '';
    outSelect.innerHTML = '';

    Object.keys(units[cat]).forEach(unit => {
        inSelect.options.add(new Option(unit, unit));
        outSelect.options.add(new Option(unit, unit));
    });
    
    if(outSelect.options.length > 1) outSelect.selectedIndex = 1;
    convert();
}

function convert() {
    const val = parseFloat(document.getElementById('inputValue').value);
    const from = document.getElementById('inputUnit').value;
    const to = document.getElementById('outputUnit').value;
    const display = document.getElementById('outputValue');

    if (isNaN(val)) { display.innerText = "0.00"; return; }

    if (currentCategory === 'temp') {
        display.innerText = convertTemp(val, from, to);
    } else {
        const result = val * (units[currentCategory][to] / units[currentCategory][from]);
        display.innerText = result.toLocaleString('tr-TR', { maximumFractionDigits: 4 });
    }
}

function convertTemp(val, from, to) {
    let celsius;
    if (from === 'Celsius') celsius = val;
    else if (from === 'Fahrenheit') celsius = (val - 32) * 5/9;
    else celsius = val - 273.15;

    let res;
    if (to === 'Celsius') res = celsius;
    else if (to === 'Fahrenheit') res = (celsius * 9/5) + 32;
    else res = celsius + 273.15;

    return res.toFixed(2);
}

// Event Listeners
document.getElementById('inputValue').addEventListener('input', convert);
document.getElementById('inputUnit').addEventListener('change', convert);
document.getElementById('outputUnit').addEventListener('change', convert);

// Başlat
setCategory('length');