async function getTasks() {
  let token = JSON.parse(localStorage.user).jwt;
  let id = JSON.parse(localStorage.user).user.id;
  let response = await fetch("/tasks", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      token: token,
      id: id,
    }),
  });
  return response.json();
}

async function addTodo(event) {
  // console.log(event);
  event.preventDefault();

  var data = new FormData(event.target);

  var object = {};
  data.forEach(function (value, key) {
    object[key] = value;
  });
  object["token"] = JSON.parse(localStorage.user).jwt;
  object["id"] = JSON.stringify(JSON.parse(localStorage.user).user);
  var json = JSON.stringify(object);

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
    redirect: "follow",
  };
  let response = await fetch("/newTask", requestOptions).then((res) =>
    res.json()
  );
  console.log(response);

  if (response.data == null) {
    alert("Erreur invalides");
  } else {
    window.location.reload();
  }
}
async function initEditTodo(id) {
  let data = await getTasks();
  let task = data.find((element) => element.documentId == id);
  document.querySelector("#exampleModal2").querySelector("#titleInput").value =
    task.name;
  document
    .querySelector("#exampleModal2")
    .querySelector("#descriptionInput").value = task.description;
  document.querySelector("#exampleModal2").querySelector("#dateInput").value =
    task.date.replace("Z", "");

  document
    .querySelector("#exampleModal2")
    .querySelector("#flexSwitchCheckDefault").checked = task.done;
  document.querySelector("#exampleModal2").querySelector("#postId").value = id;
}
async function editTodo(event) {
  event.preventDefault();
  var data = new FormData(event.target);

  var object = {};
  data.forEach(function (value, key) {
    object[key] = value;
  });
  object["done"] = document
    .querySelector("#exampleModal2")
    .querySelector("#flexSwitchCheckDefault").checked;
  object["token"] = JSON.parse(localStorage.user).jwt;
  // object["id"] = JSON.stringify(JSON.parse(localStorage.user).user);
  object["id"] = document
    .querySelector("#exampleModal2")
    .querySelector("#postId").value;
  var json = JSON.stringify(object);
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
    redirect: "follow",
  };
  let response = await fetch("/editTask", requestOptions).then((res) =>
    res.json()
  );
  console.log(response);

  if (response.data == null) {
    alert("Erreur invalides");
  } else {
    window.location.reload();
  }
}
async function initValidateTodo(id) {
  let data = await getTasks();
  let task = data.find((element) => element.documentId == id);
  document.querySelector("#exampleModal3").querySelector("#postId").value = id;
  document
    .querySelector("#exampleModal3")
    .querySelector(
      ".card-header"
    ).textContent = `Valider la tâche ${task.name}`;
}
async function validateTodo(event) {
  event.preventDefault();
  let documentId = document
    .querySelector("#exampleModal3")
    .querySelector("#postId").value;
  var object = {};
  object["done"] = true;
  object["token"] = JSON.parse(localStorage.user).jwt;
  object["id"] = documentId;

  var json = JSON.stringify(object);
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
    redirect: "follow",
  };
  let response = await fetch("/editTask", requestOptions).then((res) =>
    res.json()
  );
  console.log(response);

  if (response.data == null) {
    alert("Erreur invalides");
  } else {
    window.location.reload();
  }
}
async function initDeleteTodo(id) {
  let data = await getTasks();
  let task = data.find((element) => element.documentId == id);
  document.querySelector("#exampleModal4").querySelector("#postId").value = id;
  document
    .querySelector("#exampleModal4")
    .querySelector(
      ".card-header"
    ).textContent = `Effacer la tâche ${task.name}`;
}
async function deleteTodo(event) {
  event.preventDefault();
  let documentId = document
    .querySelector("#exampleModal4")
    .querySelector("#postId").value;
  var object = {};
  object["token"] = JSON.parse(localStorage.user).jwt;
  object["id"] = documentId;

  var json = JSON.stringify(object);
  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: json,
    redirect: "follow",
  };
  let response = await fetch("/deleteTask", requestOptions).then((res) =>
    res.json()
  );
  console.log(response);

  if (response.data == null) {
    alert("Erreur invalides");
  } else {
    window.location.reload();
  }
}
