//const { response } = require("express");

const content = document.querySelector("#content");
const submit = document.querySelector("#add");
const update = document.querySelector("#update");

//POST API
submit.addEventListener("click", () => {
  let item = document.querySelector("#item").value;
  let quantity = document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;
  let formData = { item, quantity, price };

  fetch("https://semifinexam.onrender.com/api/item", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  alert("Item Added Successfully");
  location.reload();
});

window.addEventListener("load", () => {
  getItems();
});

function getItems() {
  let html = "";
  //FETCH API
  fetch("https://semifinexam.onrender.com/api/item", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        html += `<li> ${element.item} ${element.quantity} <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a></li>`;
        html += `<li> ${element.item} ${element.quantity} <a href="javascript:void(0)" onClick="updateMember(${element.id})">Update</a></li>`;
      });

      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

//DELETE
function deleteItem(id) {
  fetch("https://semifinexam.onrender.com/api/item", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });
  if (confirm("Confirm deletion?")) {
    location.reload();
  }
}

//UPDATE
function updateItem(id) {
  fetch(`https://semifinexam.onrender.com/api/item${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#item").value = data[0].item;
      document.querySelector("#quantity").value = data[0].quantity;
      document.querySelector("#price").value = data[0].price;
      document.querySelector("#ID").value = data[0].id;
    })
    .catch((error) => {
      console.log(error);
    });
}

update.addEventListener("click", () => {
  let item = document.querySelector("#item").value;
  let quantity = document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;

  let id = document.querySelector("#ID").value;

  let formData = { item, quantity, price, id };
  fetch(`https://semifinexam.onrender.com/api/item`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  alert("Item Updated Successfully");
  location.reload();
});
