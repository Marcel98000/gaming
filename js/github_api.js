window.onload = function () {
    var lang_colors = {
        JavaScript: '#f1e05a',
        HTML: '#e34c26',
        CSS: '#563d7c'
    },
    xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xml.responseText), total = 0, text = '';
            for (var language in response) total += response[language];
            for (var language in response) {
                text += `${language} ${((response[language] / total) * 100).toFixed(1)}% `;
                var color = document.createElement('div');
                color.style.display = 'inline-block';
                color.style.height = '16px';
                color.style.width = `${((response[language] / total) * 100).toFixed(1)}%`;
                color.style.backgroundColor = lang_colors[language];
                document.getElementById('link').appendChild(color);
            }
            document.getElementById('lang').innerHTML = text;
        }
    }
    var path = window.location.pathname, page = path.split("/").slice(-1)[0];
    switch (page) {
        case 'die_gaming_zone.html':
            xml.open('GET', 'https://api.github.com/repos/marcel98000/gaming/languages', true);
            break;
        case 'marcel_bot.html':
            xml.open('GET', 'https://api.github.com/repos/marcel98000/Marcel-Bot/languages', true);
            break;
    }
    xml.send();
}
