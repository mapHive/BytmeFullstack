let relatedItems = [];

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('productId');
}

let productIdFromUrl = getProductIdFromUrl();

function displayRelatedItems() {
    //fetch data from database using the REST API endpoint from Spring Boot
    fetch(displayAPI)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log("2. receive data");
            console.log(data);

            let foundProduct = data.find(
                (product) => product.productId == productIdFromUrl
            );

            if (foundProduct) {
                let productCat = foundProduct.productCategory;

                let filteredData = data.filter(
                    (product) => product.productCategory === productCat
                );

                filteredData.forEach(function (product) {
                    const productObj = {
                        productId: product.productId,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productQuantity: product.productQuantity,
                        productCategory: product.productCategory,
                        productDescription: product.productDescription,
                        productImage1: product.productImage1,
                    };

                    relatedItems.push(productObj);
                });

                // Display all the objects from the productController array
                renderRelatedItems();
            } else {
                console.error('Product not found');
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderRelatedItems() {

    let display = "";
    const maxItems = 4;
    const itemCount = Math.min(relatedItems.length, maxItems);

    for (let i = 0; i < itemCount; i++) {

        display += `
              <div class="col my-5">
                    <a href="/product?productId=${relatedItems[i].productId}">
                    <div class="card" style="width: 18rem;">
                        <img src=${relatedItems[i].productImage1} class="card-img-top py-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${relatedItems[i].productName}</h5>
                            <h5 class="price">$${relatedItems[i].productPrice}</h5>
                        </div>
                    </div>
                    </a>
              </div>
            `;
    }

    document.querySelector("#relrow").innerHTML = display;

}

displayRelatedItems();
