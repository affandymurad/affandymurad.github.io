
const translations = {
    'id': {
        'tentang': 'Tentang',
        'pengalaman': 'Pengalaman',
        'portofolio': 'Portofolio',
        'pendidikan': 'Pendidikan',
        'prestasi': 'Prestasi',
        'tentangSaya': 'Tentang Saya',
        'pengalamanKerja': 'Pengalaman Kerja',
        'jobTitle1': 'Asisten Pelayanan Nasabah - PT Bank DKI - Indonesia',
        'jobDate1': 'Oktober 2015 - Oktober 2016',
        'jobDesc1-1': 'Memenuhi permintaan nasabah seperti pengaturan ulang PIN debit/ATM, memperbarui identitas nasabah yang ada, membuka dan menutup rekening nasabah, dan meminta laporan mutasi bank tercetak',
        'jobDesc1-2': 'Run all bank programs that are aligned with Jakarta government policy, such as the Jakarta Pintar Card (KJP) for registered students and Auto Debit accounts for subsidized low-cost apartment tenants and street hawkers',
        'jobDesc1-3': 'Melakukan penjualan silang produk perbankan seperti internet banking dan mobile banking JakOne',
        // Add more translations as needed
    },
    'en': {
        'tentang': 'About',
        'pengalaman': 'Experience',
        'portofolio': 'Portfolio',
        'pendidikan': 'Education',
        'prestasi': 'Achievements',
        'tentangSaya': 'About Me',
        'pengalamanKerja': 'Work Experience',
        'jobTitle1': 'Customer Service Officer - PT Bank DKI - Indonesia',
        'jobDate1': 'October 2015 - October 2016',
        'jobDesc1-1': 'Fulfilled any customer requests such as debit/ATM PIN resets, updating existing customer identities, opening and closing customer accounts, and requesting printed bank statements',
        'jobDesc1-2': 'Run all bank programs that are aligned with Jakarta government policy, such as the Jakarta Pintar Card (KJP) for registered students and Auto Debit accounts for subsidized low-cost apartment tenants and street hawkers',
        'jobDesc1-3': 'Undertook Cross-sell banking products such as internet banking and JakOne mobile banking',

        // Add more translations as needed
    }
};

function getLanguageCode() {
    // Get the full language code (e.g., "en-US", "fr-FR", "es-ES")
    const fullCode = navigator.language || navigator.userLanguage;

    // Extract only the language part (first two characters)
    const languageCode = fullCode.split('-')[0];

    // Return "en" if the language code is not "id"
    return languageCode === "id" ? "id" : "en";
}

let currentLang = getLanguageCode();

function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            const translatedText = translations[currentLang][key];
            element.textContent = translatedText;
            element.setAttribute('aria-label', translatedText);
            element.setAttribute('lang', currentLang);
        }
    });
    document.getElementById('currentLang').textContent = currentLang.toUpperCase();
    document.documentElement.lang = currentLang;
}

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    translatePage();
    updateLanguageToggleAria();
}

function updateLanguageToggleAria() {
    const translateToggle = document.getElementById('translateToggle');
    translateToggle.setAttribute('aria-label', `Switch to ${currentLang === 'id' ? 'English' : 'Indonesian'}`);
}

document.addEventListener('DOMContentLoaded', () => {
    const translateToggle = document.getElementById('translateToggle');
    translateToggle.addEventListener('click', toggleLanguage);
    translatePage();
    updateLanguageToggleAria();
});
