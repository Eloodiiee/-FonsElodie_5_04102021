//------Initialisation du panier----

let cart  = JSON.parse(localStorage.getItem("cartItems"));
const cartContent = document.querySelector("#cart__items");   //----Sélectionne la div "cart__items"----

if(cart === null || cart == 0 ){    //----Boucle if , qui va tester si ce panier existe dans le localstorage OU s'il existe mais qu'il est vide----
  //-----Déclaration de la constante d'un panier vide et met sur la page que le panier est vide en y ajoutant du style dessus----
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

  cartContent.innerHTML = emptyCart;      //------Placement sur la page du code HTML et CSS ci-dessus , sur la DIV "cart_items"------
  //------Met la quantité et le prix total à zéro----
  document.getElementById('totalQuantity').innerHTML = 0;
  document.getElementById('totalPrice').innerHTML = 0;
}
else{

let fullCart = [];
for (let i = 0; i < cart.length; i++) {               //--------Placement des Items du panier sur la page----
    fullCart += ` 
    <article class="cart__item" data-id="${cart[i].productId}">
    <div class="cart__item__img">
    <img src=${cart[i].imageUrl} alt=${cart[i].altTxt}">
  </div>
  <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${cart[i].name}</h2>
                    <p>${cart[i].price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantityProduct}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
  </article>
  `

  let totalItems = 0;
  let totalPriceCart = 0;
  for (let o = 0; o < cart.length; o++) {  //----------Sert a calculer le nombre total d'items dans le panier, ainsi que le prix total de tout les items----     
    totalItems += parseInt(cart[o].quantityProduct)
    totalPriceCart += cart[o].totalPrice
  }

}
//-------Sert a afficher le contenu du panier , le prix total des items, mais aussi le nombre total----
  document.getElementById("cart__items").innerHTML = fullCart;
  document.getElementById('totalQuantity').innerHTML = totalItems;
  document.getElementById('totalPrice').innerHTML = totalPriceCart;
  }


//----------------------------Gestion de la quantité des articles--------------------------------------------

let quantityField = document.querySelectorAll(".itemQuantity");   //------Sélectionne l'input de quantité----

for (let q = 0; q < quantityField.length; q++){
  quantityField[q].addEventListener("focusout", (event) =>{   //------Déclenche le code ci-dessous quand on ne focus plus l'input----
    event.preventDefault();
    let quantityArticles = quantityField[q].value;           //------Déplace la valeur de l'input désormais à jour dans une nouvelle variable-------
    cart[q].quantityProduct = quantityArticles;     //------On utilise cette variable pour changer la quantité de canapé dans l'objet qui a été généré par product----
    console.log(cart);
    cart[q].totalPrice = cart[q].price * cart[q].quantityProduct;  //----Recalcul du prix total avec la nouvelle quantité----
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart)      //----Va mettre à jour le cart (panier)----
  );
  window.location.href = "cart.html"; //----Rafrîchis la page----
  });
}


//----------------------------Gestion du boutton supprimer de l'article--------------------------------------------
//---------------Sélection des références de tous les boutons suprimer------------------
let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);
for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", (event) => {
    event.preventDefault();

//---- L'id de suppression du produit qui va être supprimé en cliquant sur le bouton ----
let id_cart__item__content__settings__delete = cart[l].idDeletion;
console.log("cart__item__content__settings__delete");
console.log(id_cart__item__content__settings__delete);


//Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le bouton supprimer a été cliqué----
cart = cart.filter(el => el.idDeletion !== id_cart__item__content__settings__delete
);
console.log(cart);



//--------On envoie la variable dans le localstorage------
//--------La transformation en format JSON et l'envoyer dans la key "cartItems" du localstorage------
localStorage.setItem(
    "cartItems",
    JSON.stringify(cart)
);

//----Alerte pour avertir que le produit a été supprimé et rechargement de la page------
alert("Ce produit à bien été supprimé du panier");
window.location.href = "cart.html";

});
}