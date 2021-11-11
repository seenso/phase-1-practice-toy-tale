let addToy = false;
const url = "http://localhost:3000/toys";
const toyContainer = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //GET request
  fetch(url)
  .then(res => res.json())
  .then(toysArray => { //data = arr of objs with keys: id, image, likes, name
    toysArray.forEach(toy => {
      toyContainer.innerHTML += `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" id="${toy.id}">Like <3</button>
        </div>
      `;
    });

  });

  //POST request
  // fetch(url)
  // .then(res => res.json())
  // .then();


  //PATCH request
  // fetch(url)
  // .then(res => res.json())
  // .then();







});






/*


//MINE
const submitData = (userName, userEmail) => {
  //TEST 1 - Send Data
  return fetch(“http://localhost:3000/users”, {
    method: “POST”,
    headers: {
      ‘Content-Type’: “application/json”,
      Accept: “application/json”
    },
    body: JSON.stringify({
      name: userName,
      email: userEmail
    })
  })
  //TEST 2 - Handle the Response
  .then(response => response.json())
  .then(data => {
    // data = { id: 132, name: ‘Sam’, email: ‘sam@sam.com’ }
    //append id to DOM
    document.body.append(data.id);
  })
  //TEST 3 - Handle Errors
  .catch((err) => {
    document.body.append(err.message);
  });
};


//NOAs
function submitData(userName, userEmail) {
  const userNameAndEmail = { name: userName, email: userEmail };
  const configurationObject = {
    method: “POST”,
    headers: {
      “Content-Type”: “application/json”,
      Accept: “application/json”,
    },
    body: JSON.stringify(userNameAndEmail),
  };

   fetch(“http://localhost:3000/users”, configurationObject)
    .then(resp => resp.json())
    .then((userNameAndEmail) => document.body.append(userNameAndEmail.id))
    .catch(error => document.body.append(error.message));

}




*/