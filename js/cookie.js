// cookies coming soon:tm: (hab ich noch nicht mal getestet)

window.onload = function () {
    // Loads Cookie Data
    if (document.cookie.indexOf('cookie=') == -1) {
        var expiry_date = new Date();
        expiry_date.setMonth(expiry_date.getMonth() + 1);
        document.cookie = `cookie=item_cookie; expires=${expiry_date.toUTCString()}; path=/`;
    } else {
        var data = document.cookie.split('; ');
        for (var i = 0; i < data.length; i++) data[i] = data[i].split('=')[1];
        var nbt = {
            id: data[1],
            count: data[2],
            name: data[3],
            lore: data[4],
            attributes: data[5],
            enchantments: data[6]
        };
        document.getElementById('input_item_id').value = nbt.id;
        document.getElementById('input_item_count').value = nbt.count;
        document.getElementById('input_item_name').value = nbt.name;
        document.getElementById('input_item_lore').value = nbt.lore;
        // Fügt ein neues Textfeld für jeden Attribut/jede Verzauberung hinzu
        function new_object (type, content) {
            var object = document.createElement('div');
            object.innerHTML = `<textarea type = "text" id = "input_item_${type}${document.getElementsByName(`input_item_${type}`).length}" name = "input_item_${type}" value = "${content}">`;
            document.body.insertBefore(object, document.getElementById(`new_${type}`));
        }
        var attributes = nbt.attributes.split('&');
        attributes.forEach(element => new_object('attribute', element));
        var enchantments = nbt.enchantments.split('&');
        enchantments.forEach(element => new_object('enchantment', element));
    }
}

window.setInterval(function () {
    // Wandelt die NodeList Werte in einen String um
    function getValues (elements) {
        var string = '';
        elements.forEach(element => string += `${element.value}&`);
        string.slice(0, -1);
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
    document.cookie = `cookie=item_cookie; id=${nbt.id}; count=${nbt.count}; name=${nbt.name}; lore=${nbt.lore}; attributes=${nbt.attributes}; enchantments=${nbt.enchantments}; expires=${expiry_date.toUTCString()}; path=/`;
}, 10000);