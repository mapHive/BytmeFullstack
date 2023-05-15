let relatedItems = [];

function displayRelatedItems()
{
//fetch data from database using the REST API endpoint from Spring Boot
       fetch(displayAPI)
           .then((resp) => resp.json())
           .then(function(data) {
               console.log("2. receive data")
               console.log(data);
               data.forEach(function (product) {

                   const productObj = {
                       productId: product.productId,
                       productName: product.productName,
                       productPrice: product.productPrice,
                       productQuantity: product.productQuantity,
                       productCategory: product.productCategory,
                       productDescription: product.productDescription,
                       productOptions: product.productOptions,
                       productImages: product.productImages
                  };

                  // This array consists of 12 objects
                   relatedItems.push(productObj);
             });

            // Display all the objects from the productController array
             renderRelatedItems();

           })
           .catch(function(error) {
               console.log(error);
           });
}

function renderRelatedItems() {

    let display = "";
    const maxItems= 4;
    const itemCount = Math.min(relatedItems.length, maxItems);

    for (let i = 0; i < itemCount; i++) {

        display += `
              <div class="col my-5">
                    <a href="/product">
                    <div class="card" style="width: 18rem;">
                        <img src=${relatedItems[i].productImages} class="card-img-top py-3" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${relatedItems[i].productName}</h5>
                            <p class="card-text py-3">${relatedItems[i].productDescription}</p>
                        </div>
                    </div>
                    </a>
              </div>
            `
    }

    document.querySelector("#relrow").innerHTML = display;

}

displayRelatedItems();