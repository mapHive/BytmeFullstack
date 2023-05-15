function setupCategoryListeners() {
    // Get all anchor elements
    let anchors = document.querySelectorAll('.list-group-item');

    // Add a click event listener to each anchor
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            // Get the category from the id attribute
            let category = event.currentTarget.id;

            // Modify the href attribute to include the category as a query parameter
            event.currentTarget.href = `shop.html?category=${category}`;
        });
    });
}

window.onload = function() {
    setupCategoryListeners();
};