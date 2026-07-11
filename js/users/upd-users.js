export const updUser = async (e, users, urlPost) => {

            const row = e.target.closest("tr");
            const nameTd = row.querySelector(".name");
            const lastnameTd = row.querySelector(".lastname");
            const emailTd = row.querySelector(".email");

        // =========================
        // EDIT MODE
        // =========================
        if (e.target.classList.contains("btn-edit")) {           

            // Salvo i valori originali (utile per un eventuale Annulla)
            nameTd.dataset.original = nameTd.textContent;
            lastnameTd.dataset.original = lastnameTd.textContent;
            emailTd.dataset.original = emailTd.textContent;

            // Trasformo le celle in input
            nameTd.innerHTML = `
                <input
                    type="text"
                    class="inp-name"
                    value="${nameTd.dataset.original}"
                >
            `;

            lastnameTd.innerHTML = `
                <input
                    type="text"
                    class="inp-lastname"
                    value="${lastnameTd.dataset.original}"
                >
            `;

            emailTd.innerHTML = `
                <input
                    type="email"
                    class="inp-email"
                    value="${emailTd.dataset.original}"
                >
            `;

            row.querySelector(".btn-edit").style.display = "none";
            row.querySelector(".btn-delete").style.display = "none"; 
            row.querySelector(".btn-save").style.display = "inline-block";
            row.querySelector(".btn-canc").style.display = "inline-block";                     
        }

        // =========================
// CANCEL MODE
// =========================
else if (e.target.classList.contains("btn-canc")) {

    // Ripristina i valori originali
    nameTd.textContent = nameTd.dataset.original;
    lastnameTd.textContent = lastnameTd.dataset.original;
    emailTd.textContent = emailTd.dataset.original;

    // Ripristina i pulsanti
    row.querySelector(".btn-edit").style.display = "inline-block";
    row.querySelector(".btn-save").style.display = "none";
    row.querySelector(".btn-canc").style.display = "none";
    row.querySelector(".btn-delete").style.display = "inline-block";
}

        // =========================
        // SAVE MODE
        // =========================
        else if (e.target.classList.contains("btn-save")) {       
        
            const id = Number(row.querySelector(".id").textContent.trim());
            const user = users.find(u => Number(u.id) === id);
            console.log(id);

            if (!user) {
                console.error("Utente non trovato.", id);
                return;
            }

            const nameInput = row.querySelector(".inp-name");
            const lastnameInput = row.querySelector(".inp-lastname");
            const emailInput = row.querySelector(".inp-email");

            if (!nameInput || !lastnameInput || !emailInput) {
                console.error("Input non trovati.");
                return;
            }

            const updatedUser = {
                id,
                name: nameInput.value.trim(),
                lastname: lastnameInput.value.trim(),
                email: emailInput.value.trim()
            };

            const btnSave = row.querySelector(".btn-save");
            btnSave.disabled = true;

            try {
                const response = await fetch(urlPost, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedUser)
                });

                if (!response.ok) {
                    throw new Error(`Errore HTTP ${response.status}`);
                }

                const data = await response.json();

                if (!data.success) {
                    console.error(data.message);
                    return;
                }

                // update local array
                Object.assign(user, updatedUser);

                // Aggiorno la tabella
                row.querySelector(".name").textContent = updatedUser.name;
                row.querySelector(".lastname").textContent = updatedUser.lastname;
                row.querySelector(".email").textContent = updatedUser.email;

                // Ripristino i pulsanti
                row.querySelector(".btn-edit").style.display = "inline-block";
                row.querySelector(".btn-save").style.display = "none";
                row.querySelector(".btn-canc").style.display = "none";
                row.querySelector(".btn-delete").style.display = "inline-block";

            } catch (error) {

                console.error("Errore durante il salvataggio:", error);

            } finally {

                btnSave.disabled = false;

            }

        }

  

};