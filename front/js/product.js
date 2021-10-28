
const currentUrl = (new URL(document.location)).searchParams ;   
const _id = currentUrl.get('id');




const fetchProductById = async() =>{
await fetch("http://localhost:3000/api/products/"+_id)
   .then(response =>{return response.json()})
    .then(product=> {
       console.log(product);
       document.getElementsByClassName('item__img')[0].innerHTML = ` <img src=${product.imageUrl} alt=${product.altTxt}></div>`
       document.getElementById('title').innerHTML = product.name
       document.getElementById('price').innerHTML = product.price
       document.getElementById('description').innerHTML = product.description
       document.getElementById('colors').innerHTML +=  
       document.getElementById('colors').innerHTML += product.colors.map(color=>`<option value="${color}">${color}</option>`)
       console.log(document.getElementById('colors'));
     } );
        };
      
  
   fetchProductById()


//------------La gestion de mon panier--------------

//-----------Fonction de récupération du nom depuis le HTML--------

function productName() {
   let prdtName = document.getElementById("title");
   return prdtName.textContent;
}

//-----------Fonction de récupération de la couleur, à partir de la couleur sélectionnée dans le Menu déroulant depuis le HTML--------

function productClr() {
   let select = document.getElementById("colors"); //-----------Récupération du Menu déroulant à partir de son ID------
   let option = select.options[select.selectedIndex]; //--------Récupération de la couleur sélectionnée dans le Menu déroulant------
   return colorprdt = option.text; //------Fin de fonction en attribuant à colorprdt le texte, dans le cas présent on aurait pu récupérer la valeur aussi car elle est identique----
}

//----------Fonction de récupération  à partir de la fonction "sélectionner" depuis le HTML---------

function Price() {
   let price = document.getElementById("price");
   return price.textContent;
}

//----------Fonction de récupération de la valeur à partir de la fonction "quantitynumber" depuis le HTML---------

function QuantityNumber() {
   let QtyNumber = document.getElementById("quantity");
   return QtyNumber.value;
}

//------Je stocke dans la constante le bouton d'ajout au panier------

const Cartbtn = document.getElementById("addToCart")

//----Au clic du bouton "Ajouter au panier",il exécute les fonctions appeler précédemment ainsi qu'une fonction de sécurité et enfin liste les détails de la commande dans un objet----
Cartbtn.addEventListener("click", (event) => {
   event.preventDefault(); //---------------------Commande qui sécurise l'exécution du code , uniquement au clic de ce Bouton------
   let QtyNumber = parseInt(QuantityNumber()); //------Convertie du texte en nombre entier------
   let prdtName = productName(); //------Execute la fonction productname pour sauvegarder le résultat de prdtname------
   let colorprdt = productClr();
   let price = parseInt(Price()); //------Convertie du texte en nombre entier------
   let totalPrice = price * QtyNumber;
   let optionsKanap = {
      Name: prdtName,
      Color: colorprdt,
      id_Product: _id,
      QuantityProduct: QtyNumber,
      Price:price,
      TotalPrice : totalPrice,
   }
   console.log(optionsKanap);
 });

 


 

