function fetchAndUpdateTable() {
    console.log("Fetching JSON data...");
    const url = `./json/inscriptions_valides.json?cache_bust=${new Date().getTime()}`;
    fetch(url, {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Inscriptions mises à jour:", data);
            updateTable(data); // Mettre à jour le tableau avec les nouvelles données
        })
        .catch((err) => {
            console.error("Erreur lors de la récupération des inscriptions:", err);
        });
}

function updateTable(data) {
    originalData = data;
    currentData = data;

    const activities = [...new Set(data.map((d) => d.cours_client))];
    const select = document.getElementById("activity-select");
    select.innerHTML = '<option value="">Liste des activités</option>'; // Réinitialiser les options
    activities.forEach((act) => {
        let opt = document.createElement("option");
        opt.value = act;
        opt.text = act;
        select.appendChild(opt);
    });

    renderTable(data);
}
