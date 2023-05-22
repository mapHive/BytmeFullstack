const longParagraph = document.querySelector('#long-paragraph');
const readMoreButton = document.querySelector('#read-more');
const readLessButton = document.querySelector('#read-less');
readMoreButton.addEventListener('click', function() {
    longParagraph.style.maxHeight = 'none';
    readMoreButton.style.display = 'none';
    readLessButton.style.display = 'block';
});
readLessButton.addEventListener('click', function() {
    longParagraph.style.maxHeight = '100px';
    readLessButton.style.display = 'none';
    readMoreButton.style.display = 'block';
});
