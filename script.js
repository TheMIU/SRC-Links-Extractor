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
                const linkContainer = document.createElement('div');
                const numberElement = document.createElement('span');
                numberElement.textContent = count + '. ';
                linkContainer.appendChild(numberElement);

                const aElement = document.createElement('a');
                aElement.textContent = src;
                aElement.href = src;
                aElement.target = "_blank"; // Open link in a new tab
                linkContainer.appendChild(aElement);

                allLinks.appendChild(linkContainer);
                allLinks.appendChild(document.createElement('br'));
                count++;
            }
        });
    } else {
        allLinks.textContent = 'No iframe elements with src found.';
    }
}

function copyText() {
    const allLinks = document.getElementById('allLinks');
    const linkContainers = allLinks.querySelectorAll('div');

    let textToCopy = '';

    // Loop through each link container and build the list with counts
    linkContainers.forEach(function(linkContainer, index) {
        const linkText = linkContainer.querySelector('a').textContent;
        textToCopy += (index + 1) + '. ' + linkText + '\n'; // Adding count before each link
    });

    // Create a textarea to copy text
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy.trim(); // Trim extra whitespace
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Text copied to clipboard');
}

