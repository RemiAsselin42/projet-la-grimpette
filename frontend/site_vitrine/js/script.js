document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('mouseover', function(event) {
        event.preventDefault();
        dropdownMenu.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function(event) {

        if (!dropdown.contains(event.relatedTarget)) {
            dropdownMenu.style.display = 'none';
        }
    });
});