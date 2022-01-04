const itemsInDocument = document.getElementById('items')//---- Sélectionne la section item dans mon html ---
//------Récupère  les items depuis leur array, et les affiches sur la page------
fetch("http://localhost:3000/api/products")//------- sorti le fetch de sa fonction****
.then(response =>{return response.json()})
.then(products=>{
  for (let a =0; a < products.length; a++){

  let link = document.createElement('a');   //------ créé le lien qui va contenir les cartes des produits-----**
  link.href = "product.html?id=" + products[a]._id;//---- attribue un lien a la balise "a"----

  let article = document.createElement('article');

  let productsImg = document.createElement('img');//------ créé la balise "img"----
  productsImg.setAttribute('src', products[a].imageUrl);//------ ajoute le lien de l'image source----
  productsImg.setAttribute('alt', products[a].altTxt);//---- ajoute l'altTxt----

  let productsName = document.createElement('h3');//---- créé la balise "h3"----
  productsName.classList.add('productsName');//------ ajoute une classe au h3----
  productsName.textContent = products[a].name;//------ ajoute le nom du produit----


  let productsDescription = document.createElement('p');//---- créé une balise "p"----
  productsDescription.classList.add('productDescription');//---- ajoute une classe à mon "p"-----
  productsDescription.textContent = products[a].description;//------ ajoute la description du produit------
    
          

  article.appendChild(productsImg);//---- j'assigne l'enfant a son parent (productsImg (enfant) , article(parent))----

  article.appendChild(productsName);//---- le nom du produit est l'enfant , l'article est le parent-----

  article.appendChild(productsDescription);//---- la description du produit est l'enfant , l'article est le parent----

  link.appendChild(article);//---- l'article cest l'enfant la balise "a" c'est le parent ----

  itemsInDocument.appendChild(link);//---- j'assigne les liens des articles (les enfants),au parent qui est la section "item" dans lesquels ils sont rangés  ------**
    
}})