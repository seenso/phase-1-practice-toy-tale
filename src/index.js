let addToy = false;
const url = "http://localhost:3000/toys";
const toyContainer = document.querySelector("#toy-collection");
const toyForm = document.querySelector("body > div.container > form");
let newToy = {};
// const likeBttn = document.querySelector("");

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

///////////////////////// HELPER FUNCTIONS BELOW /////////////////////////
function renderToyCards(toysArray) {
  toysArray.forEach(toy => {
    let toyCard = document.createElement("div");
    toyCard.className = "card"
    toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn" id="${toy.id}">Like <3</button>
    `;
    toyContainer.append(toyCard);
  });
}

//Add new Toy Card
function addToyCard() {
  console.log("addToyCard was invoked")
  // e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy => {
    console.log("SUCCESS! added", toy);
  })
  .catch(error => console.log('ERROR!', error));
}

//Update Likes
// function updateLikes(toyId) {
//   fetch(url+`/${toyId}`, {
//     Method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify(toy.likes)
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log("PATCH REQUEST", data);
//   });
// }

///////////////////////// HELPER FUNCTIONS ABOVE /////////////////////////

  //GET request
  function renderCards() {
    fetch(url)
    .then(res => res.json())
    .then(toysArray => { //toysArray = arr of objs with keys: id, image, likes, name
      renderToyCards(toysArray);
    });
  }

  //POST request
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newToy["name"] = e.target.name.value;
    newToy["image"] = e.target.image.value;
    newToy["likes"] = 0;
    addToyCard();
    renderCards();
  });


  //PATCH request
  // likeBttn.addEventListener("click", updateLikes(likeBttn.id))






//initialize functions
  renderCards()