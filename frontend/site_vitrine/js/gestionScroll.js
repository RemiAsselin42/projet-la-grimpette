
const slideRight = document.getElementById('slideRight');
const slidesContainer = document.querySelector('.slides-container');

slideRight.addEventListener('click', function (defilement) {
    defilement.preventDefault();
    slidesContainer.style.transform = 'translateX(-100vw)';
    slidesContainer.style.overflowY = 'auto';
    slideRight.style.height = 'auto';
});