function kanaToHira(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}
const pokemon_obj = window.Data["ポケモン"];
let pokemon_kana_array = new Array();
for (let pokemon of Object.keys(pokemon_obj)) {
    pokemon_kana_array.push([pokemon, kanaToHira(pokemon)]);
}
console.log(pokemon_kana_array);