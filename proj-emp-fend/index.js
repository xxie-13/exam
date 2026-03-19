const tbody = document.querySelector("#tbody");
const submit = document.querySelector("#add");
const updateBtn = document.querySelector("#update");

// POST
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let id = document.querySelector("#ID").value;
  let item = document.querySelector("#item").value;
  let quantity = document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;
  let formData = { id, item, quantity, price };

  fetch("https://semifinexam.onrender.com/api/item", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      alert("Item Added Successfully");
      location.reload();
    })
    .catch((error) => console.log(error));
});

// LOAD
window.addEventListener("load", () => {
  getItems();
});

// GET
function getItems() {
  fetch("https://semifinexam.onrender.com/api/item", { mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      if (!data.length) return;

      let rows = "";
      data.forEach((element) => {
        rows += `
          <tr>
            <td><span class="td-id">${element.id}</span></td>
            <td class="td-name">${element.item}</td>
            <td>${element.quantity}</td>
            <td class="td-price">₱${element.price}</td>
            <td>
              <div class="td-actions">
                <a href="javascript:void(0)" class="btn-update" onclick="updateItem(${element.id})">Update</a>
                <a href="javascript:void(0)" class="btn-delete" onclick="deleteItem(${element.id})">Delete</a>
              </div>
            </td>
          </tr>`;
      });

      tbody.innerHTML = rows;
      document.querySelector("#count").textContent = `${data.length} item${data.length !== 1 ? "s" : ""}`;
    })
    .catch((error) => console.log(error));
}

// DELETE
function deleteItem(id) {
  if (confirm("Confirm deletion?")) {
    fetch("https://semifinexam.onrender.com/api/item", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then(() => location.reload())
      .catch((error) => console.log(error));
  }
}

// UPDATE (fill form)
function updateItem(id) {
  fetch(`https://semifinexam.onrender.com/api/item/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#item").value = data[0].item;
      document.querySelector("#quantity").value = data[0].quantity;
      document.querySelector("#price").value = data[0].price;
      document.querySelector("#ID").value = data[0].id;
    })
    .catch((error) => console.log(error));
}

// PUT
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let id = document.querySelector("#ID").value;
  let item = document.querySelector("#item").value;
  let quantity = document.querySelector("#quantity").value;
  let price = document.querySelector("#price").value;
  let formData = { id, item, quantity, price };

  fetch("https://semifinexam.onrender.com/api/item", {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then(() => {
      alert("Item Updated Successfully");
      location.reload();
    })
    .catch((error) => console.log(error));
});
