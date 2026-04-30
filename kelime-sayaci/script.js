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

// --- KELİME SAYACI SİSTEMİ ---
const textInput = document.getElementById('textInput');
const wordCountDisplay = document.getElementById('wordCount');
const charCountDisplay = document.getElementById('charCount');
const readingTimeDisplay = document.getElementById('readingTime');
const sentenceCountDisplay = document.getElementById('sentenceCount');
const densityContainer = document.getElementById('keywordDensity');

function analyzeText() {
    const text = textInput.value.trim();
    
    // 1. Karakter Sayısı
    charCountDisplay.innerText = text.length;

    // 2. Kelime Sayısı
    const words = text ? text.split(/\s+/).filter(word => word.length > 0) : [];
    wordCountDisplay.innerText = words.length;

    // 3. Cümle Sayısı (Noktalama işaretlerine göre)
    const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
    sentenceCountDisplay.innerText = sentences.length;

    // 4. Okuma Süresi (Dakikada ortalama 200 kelime baz alınmıştır)
    const minutes = Math.ceil(words.length / 200);
    readingTimeDisplay.innerText = words.length > 0 ? `${minutes} dk` : "0 dk";

    // 5. Kelime Yoğunluğu
    updateDensity(words);
}

function updateDensity(words) {
    if (words.length === 0) {
        densityContainer.innerHTML = '<span class="text-gray-400 italic">Henüz yeterli veri yok...</span>';
        return;
    }

    const freqMap = {};
    words.forEach(w => {
        let cleanWord = w.toLowerCase().replace(/[.,!?;:()]/g, '');
        if (cleanWord.length > 3) { // 3 harften kısa kelimeleri (ve, ya, ki vb.) görmezden gel
            freqMap[cleanWord] = (freqMap[cleanWord] || 0) + 1;
        }
    });

    const sortedWords = Object.entries(freqMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8); // En popüler 8 kelime

    densityContainer.innerHTML = sortedWords.map(([word, count]) => `
        <span class="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-bold">
            ${word}: ${count}
        </span>
    `).join('');
}

function clearText() {
    textInput.value = '';
    analyzeText();
}

// Event Listeners
textInput.addEventListener('input', analyzeText);