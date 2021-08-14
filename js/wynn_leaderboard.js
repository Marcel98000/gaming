function xp_leaderboard () {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText), list = '';
            // macht eine liste der top 100 spieler
            for (var i = 0; i < 100; i++) {
                var player = response.data[i];
                list += `${i + 1}. ${player.name} [${player.guildTag == undefined ? 'No Guild' : player.guildTag}] ${player.xp} XP\n`;
            }
            document.getElementById('leaderboard').value = list;
        }
    }
    xml.open('GET', 'https://api.wynncraft.com/public_api.php?action=statsLeaderboard&type=player&timeframe=alltime', true);
    xml.send();
}

function gxp_leaderboard () {
    // liste der top 100 guilds
    var xml1 = new XMLHttpRequest();
    xml1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response1 = JSON.parse(this.responseText), gxp_list = [];
            for (var guild of response1.data) {
                var xml2 = new XMLHttpRequest();
                xml2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        // geht durch alle mitglieder dieser guilds
                        var response2 = JSON.parse(this.responseText);
                        for (var player of response2.members) {
                            gxp_list.push({
                                name: player.name,
                                guild: response2.prefix,
                                gxp: player.contributed
                            });
                        }
                    }
                }
                xml2.open('GET', `https://api.wynncraft.com/public_api.php?action=guildStats&command=${guild.name}`, true);
                xml2.send();
            }
            // sortiert die spieler nach gxp und entfernt alle unter den top 100
            gxp_list.sort((a, b) => b.gxp - a.gxp);
            gxp_list = gxp_list.slice(-100); // warum werden diese beiden nicht ausgeführt
            console.log(gxp_list);           //
            var list = '';
            for (var i = 0; i < 100; i++) {
                var player = gxp_list[i];
                list += `${i}. ${player.name} [${player.guild}] ${player.gxp} GXP (${player.gxp / 249232940}x Lvl. 106)\n`;
            }
            document.getElementById('leaderboard').innerHTML = list;
        }
    }
    xml1.open('GET', 'https://api.wynncraft.com/public_api.php?action=statsLeaderboard&type=guild&timeframe=alltime', true);
    xml1.send();
}

document.getElementById('xp').addEventListener('click', function () {xp_leaderboard()});
document.getElementById('gxp').addEventListener('click', function () {gxp_leaderboard()});
