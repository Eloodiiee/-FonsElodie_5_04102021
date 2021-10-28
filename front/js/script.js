const itemsInDocument = document.getElementById('items')
const fetchProducts = async() =>{
fetch("http://localhost:3000/api/products")
.then(response =>{return response.json()})
.then(products=>{

    itemsInDocument.innerHTML = products.map(product =>
        `
         <a href="product.html?id=${product._id}">
        <article>
          <img src=${product.imageUrl} alt=${product.altTxt}>
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>  
      </a>
          `
        )


})

}

fetchProducts()








 
 
 