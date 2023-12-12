function extractSrc() {
    const htmlCode = document.getElementById('htmlCode').value;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlCode;

    const iframes = tempDiv.querySelectorAll('iframe');
    const allLinks = document.getElementById('allLinks');
    allLinks.innerHTML = ''; // Clear previous links

    if (iframes.length > 0) {
        let count = 1;
        iframes.forEach(function(iframe) {
            const src = iframe.getAttribute('src');
            if (src) {
                const srcElement = document.createElement('span');
                srcElement.textContent = count + '. ' + src + '<br>';
                allLinks.appendChild(srcElement);
                count++;
            }
        });
    } else {
        allLinks.textContent = 'No iframe elements with src found.';
    }
}
