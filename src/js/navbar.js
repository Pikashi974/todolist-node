async function createNavbar() {
  let data = await fetch("/navbar").then((res) => res.json());
  let isAuthenticated =
    localStorage.user != undefined &&
    JSON.parse(localStorage.user).jwt != undefined;
  let MainMenuItems = data.data.MainMenuItems;
  document.querySelector("#navbarColor02").innerHTML = `
                <ul class="navbar-nav me-auto">
                ${MainMenuItems.map((element) => {
                  switch (element.__component) {
                    case "item":
                      break;
                    default:
                      return `<li class="nav-item">
                                <a class="nav-link" href="${element.url}">${element.title}</a>
                            </li>`;
                  }
                })}
            </ul>
                ${
                  isAuthenticated
                    ? `
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body tab-content">
                              <h3 class="card-header text-center">Ajouter une tâche</h3>
                                <form id="addUserForm" action="/newTask" method="post">
                                    <fieldset>
                                        <div>
                                            <label for="titleInput" class="form-label mt-4">Titre</label>
                                            <input required="" type="text" class="form-control" id="titleInput"
                                                aria-describedby="emailHelp" placeholder="Entrez un titre"
                                                name="name" required>
                                            <small id="emailHelp" class="form-text text-muted">Préférez un nom unique</small>
                                        </div>
                                        <div>
                                            <label for="descriptionInput" class="form-label mt-4">Description</label>
                                            <textarea class="form-control" id="descriptionInput" placeholder="Décrivez votre tâche"
                                                form="addUserForm" name="description"></textarea>
                                        </div>
                                        <div>
                                            <label for="dateInput" class="form-label mt-4">A valider avant le:</label>
                                            <input required="" type="datetime-local" class="form-control" id="dateInput"
                                                aria-describedby="dateInput" placeholder="Entrez une date"
                                                name="date" required>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                          <button type="submit" class="btn btn-success">Ajouter</button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body tab-content">
                            <h3 class="card-header text-center">Editer la tâche</h3>
                            <form id="editUserForm" action="/editTask" method="post">
                                <fieldset>
                                    <div>
                                        <label for="titleInput" class="form-label mt-4">Titre</label>
                                        <input required="" type="text" class="form-control" id="titleInput"
                                            aria-describedby="emailHelp" placeholder="Entrez un titre" autocomplete="on"
                                            name="name" required>
                                        <small id="emailHelp" class="form-text text-muted">Préférez un nom unique</small>
                                    </div>
                                    <div>
                                        <label for="descriptionInput" class="form-label mt-4">Description</label>
                                        <textarea class="form-control" id="descriptionInput" placeholder="Décrivez votre tâche"
                                            form="editUserForm" name="description"></textarea>
                                    </div>
                                    <div>
                                        <label for="dateInput" class="form-label mt-4">A valider avant le:</label>
                                        <input required="" type="datetime-local" class="form-control" id="dateInput"
                                            aria-describedby="dateInput" placeholder="Entrez une date"
                                            name="date" required>
                                    </div>
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="done">
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Terminé</label>
                                    </div>
                                    <div class="d-flex justify-content-center"> 
                                        <button type="submit" class="btn btn-warning">Modifier</button>
                                    </div>
                                </fieldset>
                            </form>
                            <input type="hidden" id="postId" name="postId" value="" />
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body tab-content">
                            <h3 class="card-header text-center">Valider la tâche</h3>
                            <form id="validateUserForm" action="/editTask" method="post">
                                <fieldset>
                                    <div class="d-flex justify-content-center"> 
                                        <button type="submit" class="btn btn-success">Valider</button>
                                    </div>
                                </fieldset>
                            </form>
                            <input type="hidden" id="postId" name="postId" value="" />
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body tab-content">
                            <h3 class="card-header text-center">Effacer la tâche</h3>
                            <form id="deleteUserForm" action="/deleteTask" method="post">
                                <fieldset>
                                    <div class="d-flex justify-content-center"> 
                                        <button type="submit" class="btn btn-danger">Effacer</button>
                                    </div>
                                </fieldset>
                            </form>
                            <input type="hidden" id="postId" name="postId" value="" />
                        </div>
                    </div>
                </div>
              </div>
                <button type="button" class="btn btn-danger" id="disconnectButton">Déconnexion</button>
                    `
                    : `
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#connexion" aria-selected="true" role="tab" tabindex="-1">Connexion</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link" data-bs-toggle="tab" href="#inscription" aria-selected="false" role="tab">Inscription</a>
                                </li>
                            </ul>   
                            <div class="modal-body tab-content" >
                                <div class="tab-pane  active show" id="connexion" role="tabpanel">
                                    <form id="connectForm" action="/connect" method="post">
                                        <fieldset>
                                            <div>
                                                <label for="emailConnexion" class="form-label mt-4">Adresse Mail</label>
                                                <input required="" type="email" class="form-control" id="emailConnexion" aria-describedby="emailHelp"
                                                    placeholder="Entrez votre mail" autocomplete="on" name="identifier">
                                                <small id="emailHelp" class="form-text text-muted">Votre email est privé et ne sera pas partagé</small>
                                            </div>
                                            <div>
                                                <label for="passwordConnexion" class="form-label mt-4">Mot de passe</label>
                                                <input required="" type="password" class="form-control" id="passwordConnexion"
                                                    placeholder="Entrez votre mot de passe" autocomplete="on" name="password">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-success">Connexion</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="tab-pane fade" id="inscription" role="tabpanel">
                                    <form id="subscribeForm" action="/subscribe" method="post">
                                        <fieldset>
                                            <div>
                                                <label for="usernameInscription" class="form-label mt-4">Nom d'utilisateur</label>
                                                <input required type="text" class="form-control" id="usernameInscription"
                                                    placeholder="Entrez votre nom d'utilisateur" autocomplete="on" name="username">
                                            </div>
                                            <div>
                                                <label for="emailInscription" class="form-label mt-4">Adresse Mail</label>
                                                <input required type="email" class="form-control" id="emailInscription" aria-describedby="emailHelp"
                                                    placeholder="Entrez votre mail" autocomplete="on" name="email">
                                                <small id="emailHelp" class="form-text text-muted">Votre email est privé et ne sera pas partagé</small>
                                            </div>
                                            <div>
                                                <label for="passwordInscription1" class="form-label mt-4">Mot de passe</label>
                                                <input required type="password" class="form-control" id="passwordInscription1" placeholder="Entrez votre mot de passe"
                                                    autocomplete="on" name="password">
                                            </div>
                                            <div>
                                                <label for="passwordInscription2" class="form-label mt-4">Confirmez le mot de passe</label>
                                                <input required type="password" class="form-control" id="passwordInscription2" placeholder="Entrez votre mot de passe"
                                                    autocomplete="on" name="password2">
                                            </div>
                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-success">Inscription</button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Connexion/Inscription</button>`
                }
    `;
  // Not Authenticated
  if (document.querySelector("#disconnectButton") == null) {
    document
      .querySelector("#connectForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        var data = new FormData(event.target);

        var object = {};
        data.forEach(function (value, key) {
          object[key] = value;
        });
        var json = JSON.stringify(object);

        var requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json,
          redirect: "follow",
        };
        let response = await fetch("/connect", requestOptions).then((res) =>
          res.json()
        );
        if (response.jwt == null) {
          alert("Erreur invalides");
        } else {
          localStorage.setItem("user", JSON.stringify(response));
          window.location.reload();
        }
      });
    document
      .querySelector("#subscribeForm")
      .addEventListener("submit", async (event) => {
        // console.log(event);
        event.preventDefault();
        var data = new FormData(event.target);

        var object = {};
        data.forEach(function (value, key) {
          object[key] = value;
        });
        var json = JSON.stringify(object);

        var requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: json,
          redirect: "follow",
        };
        let response = await fetch("/subscribe", requestOptions).then((res) =>
          res.json()
        );
        if (response.jwt == null) {
          alert("Erreur invalides");
        } else {
          localStorage.setItem("user", JSON.stringify(response));
          window.location.reload();
        }
      });
  }
  // Authenticated
  else {
    document.querySelector(".card").classList.remove("d-none");
    document
      .querySelector("#disconnectButton")
      .addEventListener("click", async (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.reload();
      });
    document.querySelector(
      "#addButtonZone"
    ).innerHTML = `<button type="button" class="btn btn-success" id="addTaskButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Ajouter une tâche</button>`;
    let dataSet = await getTasks();
    new DataTable("#tableToday", {
      columns: [
        //[ "id", "documentId", "name", "date", "done", "createdAt", "updatedAt", "publishedAt", "description" ]
        { title: "Titre", data: "name" },
        { title: "Description", data: "description" },
        { title: "Créé le", data: "createdAt" },
        { title: "A finir le", data: "date" }, //false
        {
          title: "Terminé?",
          data: function (row, type, val, meta) {
            // console.log(row);
            // console.log(type);
            // console.log(val);
            // console.log(meta);
            return `${row.done ? "Oui" : "Non"}`;
          },
        },
        {
          title: "Actions",
          data: function (row, type, val, meta) {
            // console.log(row);
            // console.log(type);
            // console.log(val);
            // console.log(meta);
            return `${
              row.done
                ? ""
                : `<button type="button" class="btn btn-outline-success"  onclick="initValidateTodo('${row.documentId}')" data-bs-toggle="modal" data-bs-target="#exampleModal3">Valider</button>`
            }<button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="initEditTodo('${
              row.documentId
            }')">Modifier</button><button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal4" onclick="initDeleteTodo('${
              row.documentId
            }')">Supprimer</button>`;
          },
        },
      ],
      columnDefs: [
        {
          targets: [2, 3],
          render: DataTable.render.datetime("dd/MM/yyyy hh:mm:ss"),
        },
      ],
      data: dataSet,
    });
    //
    document
      .querySelector("#addUserForm")
      .addEventListener("submit", async (event) => addTodo(event));
    document
      .querySelector("#editUserForm")
      .addEventListener("submit", async (event) => editTodo(event));
    document
      .querySelector("#validateUserForm")
      .addEventListener("submit", async (event) => validateTodo(event));
    document
      .querySelector("#deleteUserForm")
      .addEventListener("submit", async (event) => deleteTodo(event));
  }
}
createNavbar();
