/*
    Cette fonction affiche les chaises , c'est ici qu'on fait appel à la fonction createRowChaise
*/
function afficheChaise() {

    let nbr = 0

    if (screen.height > 769 ) {
        nbr = 23
    }else{
        nbr = 18
    }
    
    for (let element of afficheRowChaise) {

        let value = element.getAttribute("value");
        let value2 = element.getAttribute("valueTop");

        // appel de fonction pour créer les lignes
        createRowChaise(value, element, nbr);
        createRowChaise(value2, element, 40);
    }

    /* 
        *   création de chaise par ligne 
        *   On récupére tous les éléments qui ont l'attribut chaise  et on boucle sa valeur , 
        *   sa valer indique le nombre qui doit se trouver sur cette ligne.
    */
        const chaise = document.querySelectorAll("[chaise]");
        for (let element of chaise) {
            let value = element.getAttribute("value");

            for (let j = 0; j < value; j++) {
                let div = document.createElement("div");

                div.classList.add("seat");
                div.setAttribute("name", "seat");
                div.setAttribute("prix", element.getAttribute("prix"));

                element.appendChild(div);
            }
        }
    /* fin création de chaise par ligne */
    
}
/*
    Fin fonction qui affiche les chaises 
*/