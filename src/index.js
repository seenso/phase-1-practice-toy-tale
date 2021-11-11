let addToy = false;
const url = "http://localhost:3000/toys";
const toyContainer = document.querySelector("#toy-collection");
const toyForm = document.querySelector("body > div.container > form");
let newToy = {};

//BELOW part of original file
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
// ABOVE part of original file

function renderToyCards(toysArray) {
  toysArray.forEach(toy => {
    // console.log("TOY", toy);
    let toyCard = document.createElement("div");
      toyCard.className = "card";
    let toyName = document.createElement("h2");
      toyName.innerText = toy.name;
    let toyImg = document.createElement("img");
      toyImg.src = toy.image;
      toyImg.className = "toy-avatar";
    let toyLikes = document.createElement("p");
      toyLikes.innerText = `${toy.likes} Likes`;
    let toyBtn =  document.createElement("button");
      toyBtn.className = "like-btn";
      toyBtn.id = toy.id;
      toyBtn.innerText = "Like <3";

    toyCard.append(toyName, toyImg, toyLikes, toyBtn);
    toyContainer.append(toyCard);
    
    //add eventlistener for the like button
    toyBtn.addEventListener("click", () => {
      toy.likes++;
      toyLikes.innerText = `${toy.likes} Likes`;
      updateLikes(toy);
    });
  });
}

//Update Likes
function updateLikes(toy) {
  fetch(url+`/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(data => {
    console.log("PATCH REQUEST in updateLikes()", data);
    console.log("LIKE FOR", toy)
  });
}

//Add new Toy Card
function addToyCard() {
  console.log("addToyCard was invoked")

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
    renderCards();
  })
  .catch(error => console.log('ERROR!', error));
}


///////////////////////// HELPER FUNCTIONS ABOVE /////////////////////////

  //GET request
  function renderCards() {
    fetch(url)
    .then(res => res.json())
    .then(toysArray => { //toysArray = arr of objs with keys: id, image, likes, name
      renderToyCards(toysArray);
    });
  }

  //add Toy
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newToy["name"] = e.target.name.value;
    newToy["image"] = e.target.image.value;
    newToy["likes"] = 0;
    addToyCard();
    renderCards();
  });






//initialize functions
  renderCards()