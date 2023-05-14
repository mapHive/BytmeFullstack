
// Development APIs
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';
let featuredItems = [];

function displayProduct()
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
                   featuredItems.push(productObj);
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

    for (let i = 0; i < featuredItems.length; i++) {

        display += `
           <div class="col my-5">
                <a th:href="@{product}">
                  <div class="card" style="width: 18rem;">
                   <img src=${featuredItems[i].productImages} class="card-img-top py-3" alt="...">
                  <div class="card-body">
                   <h5 class="card-title">${featuredItems[i].productName}</h5>
                   <p class="card-text py-3">${featuredItems[i].productDescription}</p>
                </div>
              </div>
              </a>
              </div>
            `
    }

    document.querySelector("#row").innerHTML = display;

}


//function addProduct(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImages) {
//
//  const featureditems = {
//    productName: productName,
//    productPrice: productPrice,
//    productQuantity: productQuantity,
//    productCategory: productCategory,
//    productDescription: productDescription,
//    productOptions: productOptions,
//    productImages: productImages
//  }
//
//  featuredItems.push(featureditems);
//
//}
