window.onload = function () {
    // Loads Cookie Data
    if (document.cookie.indexOf('cookie=') == -1) {
        var expiry_date = new Date();
        expiry_date.setMonth(expiry_date.getMonth() + 1);
        document.cookie = `cookie=item_cookie; expires=${expiry_date.toUTCString()}; path=/`;
    } else {
        var data = JSON.parse(document.cookie.split('=')[1]);
        document.getElementById('input_item_id').value = data.nbt.id;
        document.getElementById('input_item_count').value = data.nbt.count;
        document.getElementById('input_item_name').value = data.nbt.name;
        document.getElementById('input_item_lore').value = data.nbt.lore;
        // Fügt ein neues Textfeld für jeden Attribut/jede Verzauberung hinzu
        function new_object (type, content) {
            var object = document.createElement('div'), i = document.getElementsByName(`input_item_${type}`).length;
            object.innerHTML = `<textarea type = "text" id = "input_item_${type}${i}" name = "input_item_${type}">`;
            document.body.insertBefore(object, document.getElementById(`new_${type}`));
            document.getElementById(`input_item_${type}${i}`).value = content;
        }
        if (data.nbt.attributes.length) {
            var attributes = data.nbt.attributes.split('&');
            attributes.forEach(element => new_object('attribute', element));
        }
        if (data.nbt.enchantments.length) {
            var enchantments = data.nbt.enchantments.split('&');
            enchantments.forEach(element => new_object('enchantment', element));
        }
    }
}

window.onbeforeunload = function () {
    // Wandelt die NodeList Werte in einen String um
    function getValues (elements) {
        var string = '';
        elements.forEach(element => string += `${element.value}&`);
        string = string.slice(0, -1);
        return string;
    }
    // Saves Data to Cookie every 10 Seconds
    var param = document.getElementsByName('param');
    var nbt = {
        id: param[0].value, // String
        count: param[1].value, // Integer
        name: param[2].value, // String
        lore: param[3].value, // String
        attributes: getValues(document.getElementsByName('input_item_attribute')), // Object
        enchantments: getValues(document.getElementsByName('input_item_enchantment')) // Object
    };
    var expiry_date = new Date();
    expiry_date.setMonth(expiry_date.getMonth() + 1);
    document.cookie = `cookie=${JSON.stringify({
        cookie_name: 'item_cookie',
        nbt: nbt
    })}; expires=${expiry_date.toUTCString()}; path=/`;
}
