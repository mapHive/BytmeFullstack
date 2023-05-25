function setupCategoryListeners() {
    // Get all anchor elements within .product-category
    let anchors = document.querySelectorAll('.product-category a');

    // Add a click event listener to each anchor
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            // Get the category from the id attribute
            let category = event.currentTarget.id;

            // Modify the href attribute to include the category as a query parameter
            event.currentTarget.href = `/shop?category=${category}`;
        });
    });
}

window.onload = function() {
    setupCategoryListeners();
};
