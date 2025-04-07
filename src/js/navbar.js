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
                    ? `<button type="button" class="btn btn-danger" id="disconnectButton">Déconnexion</button>`
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
  if (document.querySelector("button[type=submit]") != null) {
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
  } else if (document.querySelector("#disconnectButton") != null) {
    document
      .querySelector("#disconnectButton")
      .addEventListener("click", async (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.reload();
      });
  }
}
createNavbar();
