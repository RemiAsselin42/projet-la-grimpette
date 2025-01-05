function filterByActivity() {
    const selected = document.getElementById("activity-select").value;
    let filtered = currentData.filter(
        (item) => !selected || item.cours_client === selected
    );
    renderTable(filtered);
}
