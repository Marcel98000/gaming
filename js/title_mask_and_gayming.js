window.onload = function () {
    // Cooler Titel
    var title_images = [
        'img/title1.png',
        'img/title2.png',
        'img/title3.png',
        'img/title4.png'
    ];
    document.querySelector('.mask_title').style.backgroundImage = `url(${title_images[Math.floor(Math.random() * title_images.length)]})`;
    // Gaymer Month
    let month = new Date().getMonth();
    if (month == 5) {
        document.title = 'Die Gayming Zone';
        document.getElementById('title').textContent = 'Die Gayming Zone';
    }
}