let totalItems = 0;
let totalPriceCart = 0;
const sectionCart = document.getElementById('cart__items')
//----Permet de raccourcir le lien au test de la page----
const currentUrl = window.location.pathname ; //-- pathname garde que le chemin de dossier de la page, alors que href garde une adresse plus longue avec l'ip locale.
let cutUrl = currentUrl.slice(12)    //------ on recupere la donnée d'avant qu'on converti en coupant le texte avant le 12ème caractères.
//----Test pour savoir si on est sur la bonne page, pour qu'il s'exécute sinon il est ignoré----
if(cutUrl == "cart.html"){
let cart  = JSON.parse(localStorage.getItem("cartItems"))||[];
const cartContent = document.querySelector("#cart__items");
//--------------Si le panier est vide afficher "le panier est vide"--------
if(cart === null || cart == 0 ){
  const emptyCart = `
  <style type="text/css">
.emptyCart {
  border-top: 1px solid white;
  font-size: 1.5em;
  text-align:center;
  padding:5rem 0rem;
}
</style>
    <div class="emptyCart">Le panier est vide</div>
  `;
  cartContent.innerHTML = emptyCart;
  document.getElementById('totalQuantity').innerHTML = 0;
  document.getElementById('totalPrice').innerHTML = 0;
}
//------Sinon remplir le panier------
else{

const products = cart.map(async(item) => {  //----------Fetch des produits pour récupérer les prix, les imgs et les noms----
  item.product = await fetch("http://localhost:3000/api/products/"+item.productId)
    .then((response) => response.json());
    return item;
});

const allProductInfo = Promise.all(products)
  allProductInfo.then(itemsInCart => {
    for (let i = 0; i < cart.length; i++){      //----------Création du panier à partir des éléments récupérés du fetch et du localstorage-----
      let article = document.createElement('article'); 
        article.classList.add('cart__item');
        article.setAttribute('data-id', cart[i].productId);
        
        let divImg = document.createElement('div');
        divImg.classList.add('cart__item__img');
        
        let productImg = document.createElement('img');
        productImg.setAttribute('src', itemsInCart[i].product.imageUrl);
        productImg.setAttribute('alt', itemsInCart[i].product.altTxt);
        
        let divContent = document.createElement('div');
        divContent.classList.add('cart__item__content');

        let divContentTitlePrice = document.createElement('div');
        divContentTitlePrice.classList.add('cart__item__content__titlePrice');

        let productTitle = document.createElement('h2');
        productTitle.textContent = itemsInCart[i].product.name;

        let productColor = document.createElement('p');
        productColor.textContent = cart[i].color;

        let productPrice = document.createElement('p');
        productPrice.classList.add('priceCalc');
        productPrice.textContent = itemsInCart[i].product.price + "€";

        let divContentSettings = document.createElement('div');
        divContentSettings.classList.add('cart__item__content__settings');

        let divContentSettingsQuantity = document.createElement('div');
        divContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');

        let productQuantity = document.createElement('p');
        productQuantity.textContent = "Qté : ";


        let quantityInput = document.createElement('INPUT');//----------Création de l'INPUT de quantité----****
        quantityInput.classList.add('itemQuantity');
        quantityInput.setAttribute('type', 'number');
        quantityInput.setAttribute('name', 'itemQuantity');
        quantityInput.setAttribute('min', '1');
        quantityInput.setAttribute('max', '100');
        quantityInput.setAttribute('value', cart[i].quantityProduct);

        let divDeleteButton = document.createElement('div');//----------Création du Bouton supprimé ----****
        divDeleteButton.classList.add('cart__item__content__settings__delete');
        let deleteButton = document.createElement('p');
        deleteButton.classList.add('deleteItem');
        deleteButton.textContent = "Supprimer";
        //---------------------------
        sectionCart.appendChild(article);
          article.appendChild(divImg);
            divImg.appendChild(productImg);
          article.appendChild(divContent);
            divContent.appendChild(divContentTitlePrice);
                divContentTitlePrice.appendChild(productTitle);
                divContentTitlePrice.appendChild(productColor);
                divContentTitlePrice.appendChild(productPrice);
            divContent.appendChild(divContentSettings);
              divContentSettings.appendChild(divContentSettingsQuantity);
                divContentSettingsQuantity.appendChild(productQuantity);
                divContentSettingsQuantity.appendChild(quantityInput);
              divContentSettings.appendChild(divDeleteButton);
                divDeleteButton.appendChild(deleteButton);
                
      totalItems+= parseInt(cart[i].quantityProduct);//----------Mise à jour de la quantité des produits et du prix total------**** 
      totalPriceCart+=itemsInCart[i].product.price*cart[i].quantityProduct;
      document.getElementById('totalQuantity').innerHTML = totalItems;//----------Affichage de la quantité totale ----****
      document.getElementById('totalPrice').innerHTML = totalPriceCart;//----------Affichage du prix total ----****
    }

    
//----------------------------Gestion du changement de quantité des articles et mise à jour du prix--------------------------------------------

let quantityField = document.querySelectorAll(".itemQuantity"); //------Je sélectionne l'input de quantité ----
for (let q = 0; q < quantityField.length; q++){ //------Pour chaque input de quantité on vérifie s'il y a un changement de valeur----
  quantityField[q].addEventListener("input", (event) =>{
    event.preventDefault();
    let quantityArticles = quantityField[q].value; //-------Attibution de la valeur de l'input dans "quantityArticles"----
    cart[q].quantityProduct = quantityArticles;//------Mise à jour de la quantité dans le cart.quantityProduct----
    localStorage.setItem( //------Réenregistrement du panier --
      "cartItems",
    JSON.stringify(cart)
);

if(cart[q].quantityProduct.length === 0){ //----Vérifie s'il n'y a aucuns caractères dans l'input et le met a zéro si c'est le cas----
  cart[q].quantityProduct= 0;
}
totalItems = 0; //----- Réinitialisation des valeurs----*****
totalPriceCart = 0;   //----- Réinitialisation des valeurs----*****
for(let u = 0; u < cart.length; u++){ //--- boucle qui recalcule la quantité totale et le prix total*****
  totalItems+= parseInt(cart[u].quantityProduct);//------ Recalcul de la quantité totale----****
  totalPriceCart+=parseInt(itemsInCart[u].product.price)*parseInt(cart[u].quantityProduct); //-----Recalcul du prix total******
}
document.getElementById('totalQuantity').innerHTML = totalItems;//------Mise à jour de la quantité totale *****
document.getElementById('totalPrice').innerHTML = totalPriceCart;//------Mise à jour du prix total*****
});
}

//----------------------------Gestion du boutton supprimer de l'article--------------------------------------------
//---------------Sélection des références de tous les boutons suprimer------------------
let deleteItem = document.querySelectorAll(".deleteItem");  
for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", (event) => {
    event.preventDefault();
//---- L'id du produit va être supprimé en cliquant sur le bouton 
let id_cart__item__content__settings__delete = cart[l].idDeletion;
//avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le bouton supprimer a été cliqué----
cart = cart.filter(el => el.idDeletion !== id_cart__item__content__settings__delete
);
//--------On envoie la variable dans le localstorage
//--------La transformation en format JSON et l'envoyer dans la key "cartItems" du localstorage
localStorage.setItem(
    "cartItems",
    JSON.stringify(cart)
);
//alert pour avertir que le produit a été supprimé et rechargement de la page
alert("Ce produit à bien été supprimé du panier");
window.location.href = "cart.html";
});
}
  })

}



  
const btnSendFormular = document.getElementById("order")

//----Déclaration des variables et constantes regex--------**sorti de leurs fonctions sinon il aurait fallu créer d'autres constante pour les ADDEVENTLISTENER**
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
//--------------------------------------------------***sorti de leurs fonctions
let firstNameErrorMess = document.getElementById('firstNameErrorMsg');
let lastNameErrorMess = document.getElementById('lastNameErrorMsg');
let addressErrorMess = document.getElementById('addressErrorMsg');
let cityErrorMess = document.getElementById('cityErrorMsg');
let emailErrorMess = document.getElementById('emailErrorMsg');
//----Test de validité du Prénom avec la methode regex------
  function firstNameCheck()   {
    const firstNameT = firstNameInput.value;
  if (/^[A-Za-zÀ-ÖØ-öø-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÖØ-öø-ÿ])+))*$/.test(firstNameT)) {
    firstNameErrorMess.textContent = ("");
    return true;
    } else{
      firstNameErrorMess.textContent = (`Le champs "Prénom" renseigné n'est pas correct !`);
      return false;
  };
};  
//----Test de validité du Nom avec la methode regex------
function lastNameCheck()   {
  const lastNameT = lastNameInput.value;
  if (/^[A-Za-zÀ-ÖØ-öø-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÖØ-öø-ÿ])+))*$/.test(lastNameT)) {
    lastNameErrorMess.textContent = ("");
    return true;
    } else{
      lastNameErrorMess.textContent = (`Le champs "Nom" renseigné n'est pas correct !`);
      return false;
  };
};  
//----Test de validité du Adresse avec la methode regex------
function addressCheck()   {
  const addressT = addressInput.value;
  if(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9-,\s]{5,50}$/.test(addressT)) {
     addressErrorMess.textContent = ("");
    return true;
  } else{
      addressErrorMess.textContent = (`Le champs "Adresse" renseigné n'est pas correct !`);
      return false;
  };
}; 
//----Test de validité du Ville avec la methode regex------
 function cityCheck()   {
  const cityT = cityInput.value;
  if(/^[A-Za-zÀ-ÖØ-öø-ÿ- ]{3,20}$/.test(cityT)) { 
   cityErrorMess.textContent = ("");
    return true;
    } else{
      cityErrorMess.textContent = (`Le champs "Ville" renseigné n'est pas correct !`);
      return false;
  };
}; 
//----Test de validité de l'email avec la methode regex------
function emailCheck()   {
  const emailT = emailInput.value;
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailT)) { 
    emailErrorMess.textContent = ("");
    return true;

    } else{
      emailErrorMess.textContent = (`Le champs "Email" renseigné n'est pas correct !`);
      return false;
  };
}; 
//----Déclenchement des test regex lors de la saisie des informations------------------**
//----Déclenchement des test regex du prénom------------------
firstNameInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  firstNameCheck();
})
//----Déclenchement des test regex du nom------------------
lastNameInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  lastNameCheck();
})
//----Déclenchement des test regex de l'adresse------------------
addressInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  addressCheck();
})
//----Déclenchement des test regex de la ville------------------
cityInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  cityCheck();
})
//----Déclenchement des test regex de l'email------------------
emailInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  emailCheck();
})
//--------------Au clic du bouton "commander", enregistre les informations du formulaire, tout en testant si les données sont correctes--------------
  btnSendFormular.addEventListener("click", (eventSecure) =>{
    eventSecure.preventDefault();
    //----Formulaire client----
  
  const order = {
  contact: {
  
  firstName: firstNameInput.value,
  lastName: lastNameInput.value,
  address: addressInput.value,
  city: cityInput.value,
  email: emailInput.value

},
products: cart.map(item=>item.productId)

  }
   
//--------Vérifie que toutes les données du formulaire sont correctes et si oui confirme la commande------
 if (firstNameCheck() && lastNameCheck() && addressCheck() && emailCheck() && cityCheck() ){
  fetch("http://localhost:3000/api/products/order",{method:"POST",body:JSON.stringify(order), headers: { "Content-Type": "application/json" }})
  .then(response=>response.json())
  .then(data=>{
    localStorage.removeItem("cartItems");//**** a la place du clear qui est dangereux(peut supprimer des données qui étaient dans le local storage mais qui n'a rien avoir avec le site), j'ai mis un remove pour supprimer uniquement le panier**
    window.location.href = `confirmation.html?id=${data.orderId}`;//**** Génère une url avec l'id de commande et redirige sur la page**
  })
  .catch(error=>console.log(error))
    return true;
  //-------Sinon demande de vérifier le formulaire pour y corriger les fautes------ 
  }else {
    alert("Merci de vérifier le formulaire");
    return false;

  };

  })}
  //------Vérifie qu'on est sur la bonne page pour exécuter le code , sinon il est ignoré----
  //------Affiche l'ID de commande sur la page de confirmation------
  if(cutUrl == "confirmation.html"){
    const spanId  = document.getElementById("orderId")
    const currentUrl = (new URL(document.location)).searchParams ;//**** Récupère l'URL **
    const ID = currentUrl.get('id');//**et y extrait l'ID de commande**
    spanId.innerHTML = ID;//**Affiche l'ID sur la page **
  }