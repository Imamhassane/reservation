const form = document.getElementById('form');
const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const email = document.getElementById('email');
const tel = document.getElementById('tel');


let isVerify = []
//Functions-------------------------------------------------------------
function showError(input, message) {//Afficher les messages d'erreur
    const formControl = input.parentElement;
    formControl.classList.add("error");
    formControl.classList.remove("success");
    isVerify.push(false)
   
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add("success");
    formControl.classList.remove("error");
    isVerify.push(true)

}

function checkLength(input, min, max) {//Tester la longueur de la valeur  d'un input
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} doit contenir au moins ${min} caractéres!`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} doit contenir au plus ${max} caractéres !`);
    }else{
        showSuccess(input);
    }
}


//

function checkRequired(inputArray) {// Tester si les champs ne sont pas vides
    inputArray.forEach(input => {
        if (input.value.trim() === '') {
            showError(input,`${getFieldName(input)} est obligatoire`);
        }else{
            showSuccess(input);
        }
    });
}

//
function getFieldName(input) {//Retour le nom de chaque input en se basant sur son id
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//


//Even listeners--------------------------------------------------------
form.addEventListener('submit',(e)=>{
    isVerify = []
    checkRequired([ nom , prenom , email , tel ]); 
    
    for (let i = 0; i < isVerify.length; i++) {
        if (isVerify[i]==false) {
            e.preventDefault();//Bloquer la soumission du formulaire
            console.log(isVerify[i]);
        }else{
            restor() 
        }
    }

});