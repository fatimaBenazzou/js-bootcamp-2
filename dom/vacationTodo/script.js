// 1. Sélectionnez les éléments du DOM nécessaires :
//    - Le formulaire où l'utilisateur entre les nouvelles tâches.
const submitForm = document.querySelector(".add");
//    - Le bouton pour ajouter des tâches.
const addButton = document.querySelector(".add-todo");
//    - La liste où seront affichées les tâches.
const todoList = document.querySelector(".todos");

// 2. Initialisez une variable pour garder la trace du nombre d'éléments dans la liste (par exemple `listLength`).
let listLength = 0;

// 3. Créez une fonction `generateTemplate(todo)` :
function generateTemplate(todo) {
    //    - Cette fonction doit générer un élément HTML `<li>` contenant :
    //      - Une case à cocher pour marquer la tâche comme complétée.
    //      - Une étiquette `<label>` affichant le texte de la tâche.
    //      - Deux `<span>` pour les actions :
    //        - Un pour modifier la tâche avec une classe CSS comme `raphael--pensil`.
    //        - Un pour supprimer la tâche avec une classe CSS comme `ic--baseline-delete`.
    const html = `
    <li>
        <input type="checkbox" id="todo_${listLength}" />
        <label for="todo_${listLength}">
            <span class="check"></span>${todo}
        </label>
        <div>
            <span class="raphael--pensil" ></span>
            <span class="ic--baseline-delete" ></span>
        </div>
    </li>
    `;
    //    - Ajoutez cet élément HTML à la liste des tâches.
    todoList.innerHTML += html;
}

// 4. Créez une fonction `addTodos(e)` :
function addTodos(e) {
    //    - Prévenez le comportement par défaut du formulaire (rechargement de la page).
    e.preventDefault();
    //    - Récupérez le texte entré par l'utilisateur dans le champ d'entrée, en supprimant les espaces inutiles.
    const todo = submitForm.add.value.trim();
    //    - Vérifiez que l'entrée n'est pas vide.
    if (todo.length) {
        //    - Incrémentez la variable `listLength` pour maintenir un ID unique pour chaque case à cocher.
        listLength++;
        //    - Appelez `generateTemplate(todo)` pour ajouter la nouvelle tâche à la liste.
        generateTemplate(todo);
        //    - Réinitialisez le formulaire.
        submitForm.reset();
    }
}

// 5. Créez une fonction `deleteTodos(e)` :
function deleteTodos(e) {
    //    - Vérifiez si l'élément cliqué a la classe `ic--baseline-delete`.
    if (e.target.classList.contains("ic--baseline-delete")) {
        //    - Si oui, supprimez l'élément `<li>` correspondant en remontant dans le DOM.
        e.target.parentElement.parentElement.remove();
    }
}

// 6. Créez une fonction `editTodos(e)` :
function editTodos(e) {
    //    - Vérifiez si l'élément cliqué a la classe `raphael--pensil`.
    if (e.target.classList.contains("raphael--pensil")) {
        //    - Si oui, récupérez le texte actuel de la tâche dans l'étiquette `<label>`.
        const li = e.target.parentElement.parentElement;
        const label = li.querySelector("label");
        const currentText = label.textContent.trim();
        //    - Affichez une boîte de dialogue (prompt) pour demander à l'utilisateur d'entrer le texte mis à jour.
        const newText = prompt("Modifier la tache: ", currentText);
        //    - Si un nouveau texte valide est entré, mettez à jour le contenu de l'étiquette `<label>`.
        if (newText !== null && newText.trim().length) {
            label.innerHTML = `<span class="check"></span>${newText.trim()}`;
        }
    }
}

// 7. Ajoutez des gestionnaires d'événements :
//    - L'événement "submit" sur le formulaire pour appeler la fonction `addTodos`.
submitForm.addEventListener("submit", addTodos);
//    - L'événement "click" sur le bouton d'ajout pour appeler la fonction `addTodos`.
addButton.addEventListener("click", addTodos);
//    - L'événement "click" sur la liste des tâches pour gérer les actions de suppression et de modification.
todoList.addEventListener("click", (e) => {
    deleteTodos(e);
    editTodos(e);
});

// 8. Testez votre code :
//    - Assurez-vous que vous pouvez ajouter une tâche, la modifier, et la supprimer.
