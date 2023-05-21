let searchAPI = "http://localhost:8080/product/search?keyword="

document.getElementById('search-input').addEventListener('input', function() {
    let searchQuery = this.value;
    let results = document.getElementById('results');
    if(searchQuery.length > 2) {
        fetch(`${searchAPI}${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                results.innerHTML = '';  // Clear old results
                data.forEach(function(product) {
                    // Append new results
                    let resultItem = document.createElement('a');
                    resultItem.className = "dropdown-item";
                    resultItem.href = "/product/" + product.productId;
                    resultItem.textContent = product.name;
                    results.appendChild(resultItem);
                    console.log(resultItem);
                });
                // Show results if hidden
                results.style.display = 'block';
            });
    } else {
        // Hide results if no query or query length is less than 3
        results.style.display = 'none';
    }
});

