// --- TEMA KONTROLÜ (Aynısı burada da olmalı) ---
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

// --- HESAPLAMA MANTIĞI ---
function calculateLoan() {
    const amount = parseFloat(document.getElementById('amount').value);
    const interestRate = parseFloat(document.getElementById('interest').value) / 100;
    const term = parseInt(document.getElementById('term').value);

    if (!amount || !interestRate || !term) return;

    const x = Math.pow(1 + interestRate, term);
    const monthlyPayment = (amount * x * interestRate) / (x - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    // Ekranı Güncelle
    document.getElementById('monthlyPaymentDisplay').innerText = monthlyPayment.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " TL";
    document.getElementById('totalPaymentDisplay').innerText = totalPayment.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " TL";
    document.getElementById('totalInterestDisplay').innerText = totalInterest.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " TL";

    generateTable(amount, interestRate, term, monthlyPayment);
}

function generateTable(amount, interestRate, term, monthlyPayment) {
    const tableBody = document.getElementById('paymentTableBody');
    tableBody.innerHTML = "";
    let remaining = amount;

    for (let i = 1; i <= term; i++) {
        let interestPart = remaining * interestRate;
        let principalPart = monthlyPayment - interestPart;
        remaining -= principalPart;
        if (remaining < 0) remaining = 0;

        const row = `
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td class="p-5 font-black text-blue-600 dark:text-blue-400">${i}</td>
                <td class="p-5 font-bold">${monthlyPayment.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</td>
                <td class="p-5 text-green-600 dark:text-green-400">${principalPart.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</td>
                <td class="p-5 text-red-500 dark:text-red-400">${interestPart.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</td>
                <td class="p-5 font-black">${remaining.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }
}

// İlk açılışta hesapla
calculateLoan();