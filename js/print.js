// Print Webpage
function promptPrintPage() {
    // Create a new document for the simplified content
    const doc = document.implementation.createHTMLDocument('Affandy Murad - Resume');

    // Add header
    const header = doc.createElement('header');
    header.innerHTML = `
        <h1>${document.querySelector('h1').textContent}</h1>
    `;
    doc.body.appendChild(header);

    // Add main content
    const main = doc.createElement('main');
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        const sectionContent = doc.createElement('section');
        sectionContent.innerHTML = section.innerHTML;
        // Remove social icons from the "Tentang" section
        if (section.id === 'tentang') {
            const socialIcons = sectionContent.querySelector('.social-icons');
            if (socialIcons) {
                socialIcons.remove();
            }
        }
        // Remove all img elements
        const images = sectionContent.querySelectorAll('img');
        images.forEach(img => img.remove());
        main.appendChild(sectionContent);
    });
    doc.body.appendChild(main);

    // Add basic styling
    const style = doc.createElement('style');
    style.textContent = `
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                h1, h2, h3 {
                    color: #2c3e50;
                }
                header {
                    text-align: center;
                    margin-bottom: 20px;
                }
                section {
                    margin-bottom: 30px;
                } `;
    doc.head.appendChild(style);

    // Open a new window with the simplified content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(doc.documentElement.outerHTML);
    printWindow.document.close();

    // Trigger the print dialog
    printWindow.print();

    // Close the print window after a short delay
    setTimeout(() => {
        printWindow.close();
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    const savePageBtn = document.getElementById('printPageBtn');
    savePageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        promptPrintPage();
    });
});