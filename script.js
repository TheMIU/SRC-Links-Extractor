$(document).ready(function () {
    $('#copyBtn').prop('disabled', true); // Initially disable the copy button

    $('#extractBtn').on('click', function () {
        const htmlCode = $('#htmlCode').val();
        const tempDiv = $('<div></div>').html(htmlCode);

        const iframes = tempDiv.find('iframe');
        const allLinks = $('#allLinks');
        allLinks.empty(); // Clear previous links
        if (iframes.length > 0) {
            let count = 1;
            iframes.each(function () {
                const src = $(this).attr('src');
                if (src) {
                    const linkContainer = $('<div></div>');
                    const numberElement = $('<span></span>').text(count + '. ');
                    linkContainer.append(numberElement);

                    const aElement = $('<a></a>').text(src).css({
                        'display': 'block',
                        'overflow': 'hidden',
                        'text-overflow': 'ellipsis',
                        'white-space': 'nowrap',
                        'width': '100%',
                        'max-width': '100%'
                    });
                    aElement.attr('href', src);
                    aElement.attr('target', '_blank');
                    linkContainer.append(aElement);

                    allLinks.append(linkContainer);
                    allLinks.append('<br>');
                    count++;
                }
            });
            $('#copyBtn').prop('disabled', false); // Enable the copy button if valid content is present
        } else {
            allLinks.text('No iframe elements with src found.');
            $('#copyBtn').prop('disabled', true); // Disable the copy button if no valid content
        }
    });

    $('#copyBtn').on('click', function () {
        const linkContainers = $('#allLinks').find('div');
        let textToCopy = '';

        linkContainers.each(function (index) {
            const linkText = $(this).find('a').text();
            textToCopy += (index + 1) + '. ' + linkText + '\n'; // Adding count before each link
        });

        if (textToCopy.trim() !== '') {
            const textArea = $('<textarea></textarea>');
            textArea.val(textToCopy.trim()); // Trim extra whitespace
            $('body').append(textArea);
            textArea.select();
            document.execCommand('copy');
            textArea.remove();

            alert('Text copied to clipboard');
        }
    });

    // Click event for the Clear Text button
    $('#clearBtn').on('click', function () {
        $('#allLinks').empty();
        $('#htmlCode').val('');
        $('#copyBtn').prop('disabled', true); // Disable the copy button on clear
    });
});