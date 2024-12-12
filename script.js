const textarea = document.querySelector('.input');
const iframe = document.querySelector('.output');
const fileInput = document.getElementById('file-input');

// New
document.getElementById('new').addEventListener('click', () => {
    textarea.value = ''; // Clears the textarea
});

// Save
document.getElementById('save').addEventListener('click', () => {
    const blob = new Blob([textarea.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.txt'; // Default filename
    a.click();
    URL.revokeObjectURL(url);
});

// Export
document.getElementById('export').addEventListener('click', () => {
    const newTab = window.open();
    newTab.document.write(`<html><body>${textarea.value}</body></html>`);
    newTab.document.close();
});

// Import
document.getElementById('import').addEventListener('click', () => {
    fileInput.click(); // Simulate file input click
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            textarea.value = e.target.result; // Set the content to the editor
        };
        reader.readAsText(file);
    }
});

// Open
document.getElementById('open').addEventListener('click', () => {
    const newTab = window.open();
    newTab.document.open();
    newTab.document.write(textarea.value); // Write the code into the new tab
    newTab.document.close();
});


// Run
document.getElementById('run').addEventListener('click', () => {
    iframe.srcdoc = textarea.value; // Render the HTML content
});


// Toggle the hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});
