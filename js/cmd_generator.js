// Bruh gemixt deutsch- und englischsprachige Kommentare
// New Text Input for NBT Object Arrays like Attributes or Enchantments or what ever the fuck you like
function new_object (type) {
    var object = document.createElement('div');
    object.innerHTML = `<textarea type = "text" id = "input_item_${type}${document.getElementsByName(`input_item_${type}`).length}" name = "input_item_${type}">`;
    document.body.insertBefore(object, document.getElementById(`new_${type}`));
    window.scrollBy(0, 512);
}

function remove_object (type) {
    var elements = document.getElementsByName(`input_item_${type}`);
    elements[elements.length - 1].remove();
}

// Das krasse Ding
// Ich sollte mehr Kommentare einbauen damit ich später diese Scheiße verstehe
function generate_command (nbt) {
    var command = '/give @s ';
    // Item ID
    command += `${nbt.id}`;
    // Item NBT (The real shit)
    var ItemName = nbt.name, ItemLore = nbt.lore;
    if (ItemName != '' || ItemLore != '' || nbt.attributes.length != 0 || nbt.enchantments.length != 0) command += '{';
    if (ItemName != '' || ItemLore != '') {
        // Item Name und Beschreibung (Oh shit das war nervig)
        command += 'display:{';
        function convert_to_raw_json (input, type) {
            function convert_line (line) {
                var converted_line = '';
                line = line.split('§');
                if (line.length == 1) converted_line += `{\\"text\\":\\"${line[0]}\\",\\"italic\\":\\"false\\"}`;
                else {
                    // [ text § formatierung § text ]
                    //    L---> formatiert       L---- nicht formatert
                    // BeispieL: hallo das ist ein§color:blue/bold§ item§color:dark_blue/underline§
                    var used_formatting = [], index = 0;
                    for (var i = 0; i < line.length; i++) {
                        if (i % 2 == 0) {
                            converted_line += `{\\"text\\":\\"${line[i]}\\"`;
                            if (i + 2 <= line.length) {
                                var formatting = line[i + 1].split('/');
                                
                                // used_formatting wird beim generieren des commands überprüft, damit nicht teile des commands unnötig wiederholt werden.
                                used_formatting[index] = {
                                    obfuscated: false,
                                    bold: false,
                                    strikethrough: false,
                                    underline: false,
                                    italic: false,
                                    color: null
                                };

                                formatting.foreach(attribute => {
                                    switch (attribute) {
                                        case 'obfuscated':
                                            used_formatting[index].obfuscated = true;
                                            continue;
                                        case 'bold':
                                            used_formatting[index].bold = true;
                                            continue;
                                        case 'strikethrough':
                                            used_formatting[index].strikethrough = true;
                                            continue;
                                        case 'underline':
                                            used_formatting[index].underline = true;
                                            continue;
                                        case 'italic':
                                            used_formatting[index].italic = true;
                                            continue;
                                    }
                                });

                                for (var j = 0; j < formatting.length; j++) if (formatting[j].includes('color')) {
                                    used_formatting[index].color = formatting[j].split(':')[1];
                                    break;
                                }

                                // generiert den text mithilfe von used_formatting
                                if (used_formatting[index].color == null) converted_line += ',\\"color\\":\\"reset\\"';
                                else if (used_formatting[index].color != used_formatting[index - 1].color) converted_line += `,\\"color\\":\\"${used_formatting[index].color}\\"`;

                                if (used_formatting[index].obfuscated && !used_formatting[index - 1].obfuscated) converted_line += ',\\"obfuscated\\":\\"true\\"';
                                else if (!used_formatting[index].obfuscated) converted_line += ',\\"obfuscated\\":\\"false\\"';

                                if (used_formatting[index].bold && !used_formatting[index - 1].bold) converted_line += ',\\"bold\\":\\"true\\"';
                                else if (!used_formatting[index].bold) converted_line += ',\\"bold\\":\\"false\\"';

                                if (used_formatting[index].strikethrough && !used_formatting[index - 1].strikethrough) converted_line += ',\\"strikethrough\\":\\"true\\"';
                                else if (!used_formatting[index].strikethrough) converted_line += ',\\"strikethrough\\":\\"false\\"';

                                if (used_formatting[index].underline && !used_formatting[index - 1].underline) converted_line += ',\\"underline\\":\\"true\\"';
                                else if (!used_formatting[index].underline) converted_line += ',\\"underline\\":\\"false\\"';

                                if (!used_formatting[index].italic && used_formatting[index - 1].italic) converted_line += ',\\"italic\\":\\"false\\"';
                                else if (used_formatting[index].italic && !used_formatting[index - 1].italic) converted_line += ',\\"italic\\":\\"true\\"';

                                index++;

                                /*
                                if (formatting.includes('obfuscated')) {
                                    used_formatting[index].obfusacted = true;
                                    if (index - 1 >= 0 && used_formatting[index - 1].obfusacted == false) {

                                    } else converted_line += '';
                                } else converted_line += ',\\"obfuscated\\":\\"false\\"';
                                


                                if (formatting.includes('obfuscated')) converted_line += ',\\"obfuscated\\":\\"true\\"';
                                else converted_line += ',\\"obfuscated\\":\\"false\\"';
                                if (formatting.includes('bold')) converted_line += ',\\"bold\\":\\"true\\"';
                                else converted_line += ',\\"bold\\":\\"false\\"';
                                if (formatting.includes('strikethrough')) converted_line += ',\\"strikethrough\\":\\"true\\"';
                                else converted_line += ',\\"strikethrough\\":\\"false\\"';
                                if (formatting.includes('underline')) converted_line += ',\\"underline\\":\\"true\\"';
                                else converted_line += ',\\"underline\\":\\"false\\"';
                                if (formatting.includes('italic')) converted_line += ',\\"italic\\":\\"true\\"';
                                else converted_line += ',\\"italic\\":\\"false\\"';
                                var has_color = false;
                                for (var j = 0; j < formatting.length; j++) {
                                    if (formatting[j].includes('color')) converted_line += `,\\"color\\":\\"${formatting[j].split(':')[1]}\\"`;
                                    has_color = true;
                                }
                                if (!has_color) converted_line += ',\\"color\\":\\"reset\\"';
                                */
                                converted_line += '}';
                            } else {
                                converted_line += `{\\"text\\":\\"${line[i]}\\",\\"color\\":\\"reset\\",\\"obfuscated\\":\\"false\\",\\"bold\\":\\"false\\",\\"strikethrough\\":\\"false\\",\\"underline\\":\\"false\\",\\"italic\\":\\"false\\"}`;
                                if (i != line.length - 2) converted_line += ',';
                            }
                        }
                    }
                }
                return converted_line;
            }
            var string = '';
            if (type == 0) string += `Name:"${convert_line(input)}"`;
            else {
                input = input.split('\n');
                string += 'Lore:["[';
                for (var i = 0; i < input.length; i++) string += convert_line(input[i]);
                string += ']"]';
            }
            return string;
        }
        if (ItemName != '') command += convert_to_raw_json(ItemName, 0);
        if (ItemName != '' && ItemLore != '') command += ',';
        if (ItemLore != '') command += convert_to_raw_json(ItemLore, 1);
        command += '}';
    }
    if (ItemName != '' || ItemLore != '') command += ',';
    if (nbt.attributes.length != 0) {
        // Attribute
        command += 'AttributeModifiers:[';
        var attributes = nbt.attributes;
        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i].value.split('\n');
            command += `{AttributeName:"${attribute[0]}", Name:"${attribute[0]}", Amount:${attribute[1]}, Operator:${attribute[3]}`;
            if (attribute[2] != '') command += `, Slot:"${attribute[2]}"`;
            if (attribute[4] == '' || attribute[4] == undefined) command += ', UUID:[I; 1, 1, 1, 1]';
            else command += `, UUID:${attribute[4]}`;
            command += '}';
            if (i < attributes.length - 1) command += ',';
        }
        command += ']';
        if (nbt.enchantments.length != 0) command += ',';
    }
    if (nbt.enchantments.length != 0) {
        // Enchantment
        command += 'Enchantments:[';
        var enchantments = nbt.enchantments;
        for (var i = 0; i < enchantments.length; i++) {
            var enchantment = enchantments[i].value.split('\n');
            command += `{id:${enchantment[0]},lvl:${enchantment[1]}}`;
            if (i < enchantments.length - 1) command += ',';
            if (enchantment[1] > 2147483647) alert(`Das Verzauberungslevel von ${enchantment[0]} ist ${enchantment[1]}, was größer als das limit von 2147483647 ist.`);
        }
        command += ']';
    }
    if (ItemName != '' || ItemLore != '' || nbt.attributes.length != 0 || nbt.enchantments.length != 0) command += '}';
    if (nbt.count != '') command += ` ${nbt.count}`;
    // Copy to Clipboard
    document.getElementById('output').value = command;
    document.getElementById('output').select();
    document.getElementById('output').setSelectionRange(0, 9999999);
    document.execCommand('copy');
    if (command.length > 32500) alert(`Dein Command ist ${command.length} Zeichen lang, ein solcher Command passt nicht in Command Blocks, verwende eine Funktion.`);
    if (nbt.id == '') alert('Du hast keine ID für das Item Angegeben');
}

// Event Listener für die Buttons weil ich fancy bin und es nicht inline in HTML mache
document.getElementById('new_attribute').addEventListener('click', function () {new_object('attribute')});
document.getElementById('new_enchantment').addEventListener('click', function () {new_object('enchantment')});
document.getElementById('remove_attribute').addEventListener('click', function () {remove_object('attribute')});
document.getElementById('remove_enchantment').addEventListener('click', function () {remove_object('enchantment')});
document.getElementById('copy_to_clipboard').addEventListener('click', function () {
    var param = document.getElementsByName('param');
    var nbt = {
        id: param[0].value,
        count: param[1].value,
        name: param[2].value,
        lore: param[3].value,
        attributes: document.getElementsByName('input_item_attribute'),
        enchantments: document.getElementsByName('input_item_enchantment')
    };
    generate_command(nbt);
});
