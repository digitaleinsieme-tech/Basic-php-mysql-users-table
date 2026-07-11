export function delUser(e, users, url) {

    const tr = e.target.closest("tr");
    const id = tr.querySelector(".id").textContent;

    if (!confirm("Vuoi eliminare questo utente?")) {
        return;
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(data => {

        if (!data.success) {
            alert("Errore durante l'eliminazione.");
            return;
        }

        // Rimuove la riga dalla tabella
        tr.remove();

        // Aggiorna l'array users
        const index = users.findIndex(user => user.id == id);

        if (index !== -1) {
            users.splice(index, 1);
        }

        console.log("Utente eliminato");
    })
    .catch(err => console.error(err));
}