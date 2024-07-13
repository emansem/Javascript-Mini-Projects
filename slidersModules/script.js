
const slider = document.querySelector('.sliders, .slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.addEventListener('click', function(e){
    e.preventDefault();
    slider.appendChild(slider.firstElementChild);
})