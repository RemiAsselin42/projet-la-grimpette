let originalData = [];
let currentData = [];

function renderTable(data) {
    let html = `
    <thead>
      <tr>
        <th>
          Nom
          <button id="sort-nom">
            <i class="fa-solid fa-sort"></i>
          </button>
        </th>
        <th>
          Prénom
          <button id="sort-prenom">
            <i class="fa-solid fa-sort"></i>
          </button>
        </th>
        <th>
          Cours
          <button id="sort-cours">
            <i class="fa-solid fa-sort"></i>
          </button>
        </th>
      </tr>
    </thead>
  `;
    html += "<tbody>";
    if (data.length === 0) {
        html += `
      <tr>
        <td colspan="3" style="text-align:center">Aucune inscription acceptée pour le moment</td>
      </tr>
    `;
    } else {
        data.forEach((item) => {
            html += `
        <tr>
          <td>${item.nom_client}</td>
          <td>${item.prenom_client}</td>
          <td>${item.cours_client}</td>
        </tr>
      `;
        });
    }
    html += "</tbody>";
    document.getElementById("inscriptions-table").innerHTML = html;

    if (data.length > 0) {
        document.getElementById("sort-nom").addEventListener("click", () => {
            currentData.sort((a, b) => a.nom_client.localeCompare(b.nom_client));
            renderTable(currentData);
        });
        document.getElementById("sort-prenom").addEventListener("click", () => {
            currentData.sort((a, b) => a.prenom_client.localeCompare(b.prenom_client));
            renderTable(currentData);
        });
        document.getElementById("sort-cours").addEventListener("click", () => {
            currentData.sort((a, b) => a.cours_client.localeCompare(b.cours_client));
            renderTable(currentData);
        });
    }
}
