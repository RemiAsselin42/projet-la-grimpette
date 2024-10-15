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

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.pa-container-grp');
    const ctgs = document.querySelectorAll('.ctg');

    function resetWidths() {
        ctgs.forEach(ctg => {
            if (ctg.classList.contains('ctg-1')) {
                ctg.style.width = '60%';
            } else {
                ctg.style.width = '20%';
            }
        });
    }

    ctgs.forEach(ctg => {
        ctg.addEventListener('mouseover', function() {
            ctgs.forEach(c => c.style.width = '20%');
            ctg.style.width = '60%';
        });
    });

    container.addEventListener('mouseleave', resetWidths);

    // Initial setup
    resetWidths();
});