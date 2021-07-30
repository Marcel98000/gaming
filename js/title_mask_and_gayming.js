window.onload = function () {
    // Cooler Titel
    const title_images = [
        'img/title/1.png',
        'img/title/2.png',
        //'img/title/3.png', Diese Beiden sind einfach schlecht, werde ich aber vielleicht überarbeiten
        //'img/title/4.png',
        'img/title/5.png',
        'img/title/6.png',
        'img/title/7.png'
    ];
    document.querySelector('.mask_title').style.backgroundImage = `url(${title_images[Math.floor(Math.random() * title_images.length)]})`;
    // Gaymer Month
    let month = new Date().getMonth();
    if (month == 5) {
        document.title = 'Die Gayming Zone';
        document.getElementById('title').textContent = 'Die Gayming Zone';
    }
}
