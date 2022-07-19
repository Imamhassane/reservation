/*
    * Cette fonction créee les lignes qui doivent contenir les chaises
    * On lui donne en paramétre le nombre de ligne=>params , l'emplacement=>element et le nombre de ligne=>nbr
*/
    function createRowChaise(params, element, nbr) {

        for (let j = 0; j < params; j++) {
            let div = document.createElement("div");
            div.setAttribute("chaise", "");

            if (nbr <= 22) {
                let prix = 10000;
                div.setAttribute("prix", prix + (2000 * j));
            } else {
                let prix = 3000;
                div.setAttribute("prix", prix + (1000 * j));
            }
            div.setAttribute("value", nbr);
            div.classList.add("row", `row${j}`) ;
            element.appendChild(div);
        }
    }
/*
    * Fin de la fonction qui créee les lignes
*/