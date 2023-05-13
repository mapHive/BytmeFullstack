/*
Product controller will perform action to the products to be displayed

(1) Display all products to be retrieved from the back-end.
(2) Add product to the product list (send the new product to the back-end)
---edit an existing product details
---remove an existing products
*/

// Development APIs
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';
let productController = [];

function displayProduct()
{
//fetch data from database using the REST API endpoint from Spring Boot
       fetch(displayAPI)
           .then((resp) => resp.json())
           .then(function(data) {
               console.log("2. receive data")
               console.log(data);
               data.forEach(function (item) {

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
                   productController.push(productObj);
             });

            // Display all the objects from the productController array
             renderProductPage();

           })
           .catch(function(error) {
               console.log(error);
           });
}

function renderProductPage() {

    let display = "";

    for (let i = 0; i < productController.length; i++) {

        display += `
            <div class="col-lg-3">
                  <div class="card">
                      <img src=${productController[i].productImages} class="card-img-top py-3"
                          alt="image" >
                      <div class="card-body">
                          <h5 class="card-title">${productController[i].productName}</h5>
                          <h5 class="price">$${productController[i].productPrice}</h5>
                          <p class="card-text py-3">${productController[i].productDescription}</p>
                          <a th:href="@{product}" class="btn btn-primary">View Product</a>
                      </div>
                  </div>
            </div>
            `
    }

    document.querySelector("#row").innerHTML = display;

}

//addProduct(name, description, imageUrl, style, price, storeImage);
function addProduct(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImages, imageObject)
{
   const formData = new FormData();
   formData.append('productName', productName);
   formData.append('productPrice', productPrice);
   formData.append('productQuantity', productQuantity);
   formData.append('productCategory', productCategory);
   formData.append('productDescription', productDescription);
   formData.append('productOptions',productOptions);
   formData.append('productImages',productImages);
   formData.append('imagefile',imageObject);

  fetch(addAPI, {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status - 200 ok, 500, 404
            if (response.ok) {
                alert("Successfully Added Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to Product")
        });
}
