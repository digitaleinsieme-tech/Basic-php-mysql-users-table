import { updUser } from "./upd-users.js";
import { delUser } from "./del-users.js";

let users = [];
let table = document.querySelector("#table-users tbody");

// EVENT DELEGATION
table.addEventListener("click", (e) => {

    if (
        e.target.classList.contains("btn-edit") ||
        e.target.classList.contains("btn-save") ||
        e.target.classList.contains("btn-canc")
    ) {
        updUser(e, users, "./php/users/update_user.php");
        return;
    }

    if (e.target.classList.contains("btn-delete")) {
        delUser(e, users, "./php/users/del_user.php");
    }

});

//--------------------------------------------
// Get user and order
let counter = 0;

async function getUsers(field = "id", order = "ASC") {    

    if (counter%2 !== 0) {order = "DESC"}

    const response = await fetch("./php/users/get_users.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            field,
            order
        })
    });


    const data = await response.json();

    users.length = 0;
    users.push(...data);

    table.innerHTML = "";


    users.forEach((item) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td class="id">${item.id}</td>
            <td class="name">${item.name}</td>
            <td class="lastname">${item.lastname}</td>
            <td class="email">${item.email}</td>
            <td>
                <img class="btn-mod btn-edit" src="./img/edit.png">
                <img class="btn-mod btn-delete" src="./img/delete.png">
                <img class="btn-mod btn-save hidden" src="./img/save.png">
                <img class="btn-mod btn-canc hidden" src="./img/cancel.png">
            </td>
        `;

        table.appendChild(tr);

    });
    counter++;
    console.log(counter);

}


// load users
getUsers();


// order
document.querySelectorAll(".sort").forEach(icon => {
    icon.addEventListener("click", () => {
        getUsers(icon.dataset.field, "ASC");
    });

});