/*
    * Cette fonction créee les lignes qui doivent contenir les chaises
    * On lui donne en paramétre le nombre de ligne=>params , l'emplacement=>element et le nombre de ligne=>nbr
*/
    function createRowChaise(params, element, nbr) {

        for (let j = 0; j < params; j++) {
            let div = document.createElement("div");
            div.setAttribute("chaise", "");

            if (nbr < 40) {
                div.setAttribute("value", nbr - j);
                div.classList.add("row", `row${j}`);
                let prix = 10000;
                div.setAttribute("prix", prix + (2000 * j));
            } else {
                div.setAttribute("value", nbr - (j * 4));
                div.classList.add("row-top", `row-top${j + 1}`);
                let prix = 3000;
                div.setAttribute("prix", prix + (1000 * j));
            }
            element.appendChild(div);
        }
    }
/*
    * Fin de la fonction qui créee les lignes
*/