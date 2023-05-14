
// Development APIs
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';
let productDetails = [];

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
                   productDetails.push(productObj);
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

   for (let i = 0; i < productDetails.length; i++) {
           let imagesHTML = '';
           for (let j = 0; j < productDetails[i].productImages.length; j++) {
               imagesHTML += `
               <div class="carousel-item ${j === 0 ? 'active' : ''}">
                 <img src="${productDetails[i].productImages[j]}" class="d-block w-100 image-fluid" alt="..." />
               </div>`;
           }

           display += `
           <div class="col left-col my-5">

                      <div id="carouselIndicators" class="carousel slide">
                              <div class="carousel-indicators">
                                  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active"
                                  aria-current="true" aria-label="Slide 1"></button>
                                  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1"
                                  aria-label="Slide 2"></button>
                                  <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2"
                                  aria-label="Slide 3"></button>
                              </div>

                          <div class="carousel-inner">
                               ${imagesHTML}
                          </div>

                          <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                               <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                               <span class="visually-hidden">Previous</span>
                          </button>

                          <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                          </button>

                      </div>

           </div>

           <div class="col right-col my-5">
                           <div class="container-fluid product-name">
                           <!-- This is the h2 product name container -->
                           <h2 class="py-3">${productDetails[i].productName}</h2>
                           </div>

                           <div class="container-fluid product-price-options">
                                           <div class="container-fluid text-center">
                                               <div class="row">

                                                   <div class="col price my-4">
                                                       <h3>${productDetails[i].productPrice}</h3 >
                                                   </div >

                                                   <div class="container-fluid product-description">

                                                       <pre class="py-3">
                                                               ${productDetails[i].productDescription}
                                                       </pre>
                                                   </div>

                                                   <div class="container-fluid product-atc-btn mt-4">
                                                        <button type="button" class="btn">
                                                                <a href="#">Add to Cart</a>
                                                        </button>
                                                   </div>

                                               </div>
                                           </div>
                           </div>
           </div>
       `

       document.querySelector("#row").innerHTML = display;

   }
}