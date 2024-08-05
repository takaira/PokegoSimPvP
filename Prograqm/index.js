// 定数を定義
// 表示するポケモン数
const pokemon1_name_input_elm = document.getElementById("pokemon1_name");
const pokemon2_name_input_elm = document.getElementById("pokemon2_name");
const select_league_elm = document.getElementById("select_league");
const check_pokemon1_name_button_elm = document.getElementById("check_pokemon1_name");
const check_pokemon2_name_button_elm = document.getElementById("check_pokemon2_name");
const select_pokemon1_skil1_elm = document.getElementById("select_pokemon1_skil1");
const select_pokemon1_skil2_elm = document.getElementById("select_pokemon1_skil2");
const select_pokemon1_skil3_elm = document.getElementById("select_pokemon1_skil3");
const select_pokemon2_skil1_elm = document.getElementById("select_pokemon2_skil1");
const select_pokemon2_skil2_elm = document.getElementById("select_pokemon2_skil2");
const select_pokemon2_skil3_elm = document.getElementById("select_pokemon2_skil3");
const button_pokemon1_skil1_elm = document.getElementById("button_pokemon1_skil1");
const pokemon1_hp_elm = document.getElementById("pokemon1_hp");
const pokemon2_hp_elm = document.getElementById("pokemon2_hp");
const pokemon_count = 1010;
const pokemon_type_en_list = ["normal","fire","water","grass","electric","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"];
const pokemon_type_ja_list = ["ノーマル","ほのお","みず","くさ","でんき","こおり","かくとう","どく","じめん","ひこう","エスパー","むし","いわ","ゴースト","ドラゴン","あく","はがね","フェアリー"]
const pokemon_type_to_ja_obj = {
    "normal" : "ノーマル",
    "fire" : "ほのお",
    "water" : "みず",
    "grass" : "くさ",
    "electric" : "でんき",
    "ice" : "こおり",
    "fighting" : "かくとう",
    "poison" : "どく",
    "ground" : "じめん",
    "flying" : "ひこう",
    "psychic" : "エスパー",
    "bug" : "むし",
    "rock" : "いわ",
    "ghost" : "ゴースト",
    "dragon" : "ドラゴン",
    "dark" : "あく",
    "steel" : "はがね",
    "fairy" : "フェアリー"
}
const pokemon_type_compatibility_obj = window.Data["タイプ相性"];
const pokemon_obj = window.Data["ポケモン"];
const cpm_obj = window.Data["CPM"];
const pokemon_normal_skil_obj = window.Data["通常技"];
const pokemon_gauge_skil_obj = window.Data["ゲージ技"];
let pokemon1_stats;
let pokemon1_real_stats_obj = {};
let sorted_pokemon1_real_stats;
let pokemon1_normal_skil_obj;
let pokemon1_hp;
let pokemon2_stats;
let pokemon2_real_stats_obj = {};
let sorted_pokemon2_real_stats;
let pokemon2_hp;
let max_cp = 1500;
let left_shadow_flag = false;
const left_pokemon1_obj = {
    "name" : "",
    "types" : [],
    "stats" : [],
    "buff" : [],
    "real_stats" : [],
}
const pokemon_normal_skil_keys = Object.keys(pokemon_normal_skil_obj);
for (let pokemon_normal_skil_name of pokemon_normal_skil_keys) {
    const option = document.createElement("option");
    option.text = pokemon_normal_skil_name;
    option.value = pokemon_normal_skil_name;
    const option_clone = option.cloneNode(true);
    select_pokemon1_skil1_elm.appendChild(option);
    select_pokemon2_skil1_elm.appendChild(option_clone);
}
const pokemon_gauge_skil_keys = Object.keys(pokemon_gauge_skil_obj);
for (let pokemon_gauge_skil_name of pokemon_gauge_skil_keys) {
    const option = document.createElement("option");
    option.text = pokemon_gauge_skil_name;
    option.value = pokemon_gauge_skil_name;
    const option_clone = option.cloneNode(true);
    const option_clone2 = option.cloneNode(true);
    const option_clone3 = option.cloneNode(true);
    select_pokemon1_skil2_elm.appendChild(option);
    select_pokemon1_skil3_elm.appendChild(option_clone);
    select_pokemon2_skil2_elm.appendChild(option_clone2);
    select_pokemon2_skil3_elm.appendChild(option_clone3);
}
function damage_calculation(from_left) {
    const select_skill = pokemon_normal_skil_obj[button_pokemon1_skil1_elm.textContent];
    if (from_left) {
        return (sorted_pokemon1_real_stats[0][0] / sorted_pokemon2_real_stats[0][1]) * select_skill["power"] * (left_shadow_flag ? 1.3 : 1) * (pokemon_obj[pokemon1_name_input_elm.textContent]["types"].includes(select_skill["type"]) ? 1.2 : 1) * (pokemon_type_compatibility_obj[select_skill["type"]][pokemon])
    }
}
function update_pokemon1_real_stats_obj() {
    for (let individual_atack = 0; individual_atack < 16; individual_atack++) {
        for (let individual_diffence = 0; individual_diffence < 16; individual_diffence++) {
            for (let individual_hp = 0; individual_hp < 16; individual_hp++) {
                let pl = 51;
                let cp = Math.floor((pokemon1_stats[0] + individual_atack) * Math.sqrt(pokemon1_stats[1] + individual_diffence) * Math.sqrt(pokemon1_stats[2] + individual_hp) * (cpm_obj["" + pl] ** 2) / 10);
                while(cp > max_cp) {
                    pl -= 0.5;
                    cp = Math.floor((pokemon1_stats[0] + individual_atack) * Math.sqrt(pokemon1_stats[1] + individual_diffence) * Math.sqrt(pokemon1_stats[2] + individual_hp) * (cpm_obj["" + pl] ** 2) / 10);
                }
                const atack = (pokemon1_stats[0] + individual_atack) * cpm_obj[""+pl];
                const diffence = (pokemon1_stats[1] + individual_diffence) * cpm_obj[""+pl];
                const hp = Math.floor((pokemon1_stats[2] + individual_hp) * cpm_obj[""+pl]);
                const scp = Math.floor(Math.pow((atack * diffence * hp), 2 / 3) / 10);
                pokemon1_real_stats_obj[individual_atack.toString(16) + individual_diffence.toString(16) + individual_hp.toString(16)] = {
                    "individual_stats" : [individual_atack, individual_diffence, individual_hp],
                    "real_stats" : [atack, diffence, hp],
                    "cp" : cp,
                    "scp" : scp
                }
            }
        }
    }
    //①要素を変数保持
    sorted_pokemon1_real_stats = Object.keys(pokemon1_real_stats_obj).map(function(key) {
        return pokemon1_real_stats_obj[key];
        //②scpでソート
        }).sort(function(a, b) {
            return (a.scp < b.scp) ? 1 : -1;  //オブジェクトの昇順ソート
        });
    // console.log(sorted_pokemon1_real_stats);
    pokemon1_hp = sorted_pokemon1_real_stats[0]["real_stats"][2];
    pokemon1_hp_elm.textContent = pokemon1_hp + "/" + sorted_pokemon1_real_stats[0]["real_stats"][2];
}
function update_pokemon2_real_stats_obj() {
    for (let individual_atack = 0; individual_atack < 16; individual_atack++) {
        for (let individual_diffence = 0; individual_diffence < 16; individual_diffence++) {
            for (let individual_hp = 0; individual_hp < 16; individual_hp++) {
                let pl = 51;
                let cp = Math.floor((pokemon2_stats[0] + individual_atack) * Math.sqrt(pokemon2_stats[1] + individual_diffence) * Math.sqrt(pokemon2_stats[2] + individual_hp) * (cpm_obj["" + pl] ** 2) / 10);
                while(cp > max_cp) {
                    pl -= 0.5;
                    cp = Math.floor((pokemon2_stats[0] + individual_atack) * Math.sqrt(pokemon2_stats[1] + individual_diffence) * Math.sqrt(pokemon2_stats[2] + individual_hp) * (cpm_obj["" + pl] ** 2) / 10);
                }
                const atack = (pokemon2_stats[0] + individual_atack) * cpm_obj[""+pl];
                const diffence = (pokemon2_stats[1] + individual_diffence) * cpm_obj[""+pl];
                const hp = Math.floor((pokemon2_stats[2] + individual_hp) * cpm_obj[""+pl]);
                const scp = Math.floor(Math.pow((atack * diffence * hp), 2 / 3) / 10);
                pokemon2_real_stats_obj[individual_atack.toString(16) + individual_diffence.toString(16) + individual_hp.toString(16)] = {
                    "individual_stats" : [individual_atack, individual_diffence, individual_hp],
                    "real_stats" : [atack, diffence, hp],
                    "cp" : cp,
                    "scp" : scp
                }
            }
        }
    }
    //①要素を変数保持
    sorted_pokemon2_real_stats = Object.keys(pokemon2_real_stats_obj).map(function(key) {
        return pokemon2_real_stats_obj[key];
        //②scpでソート
        }).sort(function(a, b) {
            return (a.scp < b.scp) ? 1 : -1;  //オブジェクトの昇順ソート
        });
    // console.log(sorted_pokemon2_real_stats);
    pokemon2_hp = sorted_pokemon2_real_stats[0]["real_stats"][2];
    pokemon2_hp_elm.textContent = pokemon2_hp + "/" + sorted_pokemon2_real_stats[0]["real_stats"][2];
}
select_league_elm.addEventListener("change", function() {
    let result = select_league_elm.value;
    if (result == "local") max_cp = 500;
    else if (result == "super") max_cp = 1500;
    else if (result == "hyper") max_cp = 2500;
    if (pokemon1_name_input_elm.value != "") {
        const pokemon1_name = pokemon1_name_input_elm.value;
        if (Object.keys(pokemon_obj).includes(pokemon1_name)) {
            pokemon1_stats = pokemon_obj[pokemon1_name]["stats"];
            update_pokemon1_real_stats_obj();
        }
        else {
            window.alert("(ポケモン1)ポケモン名が正しくありません。");
        }
    }
    if (pokemon2_name_input_elm.value != "") {
        const pokemon2_name = pokemon2_name_input_elm.value;
        if (Object.keys(pokemon_obj).includes(pokemon2_name)) {
            pokemon2_stats = pokemon_obj[pokemon2_name]["stats"];
            update_pokemon2_real_stats_obj();
        }
        else {
            window.alert("(ポケモン2)ポケモン名が正しくありません。");
        }
    }
})
select_pokemon1_skil1_elm.addEventListener("change", function() {
    button_pokemon1_skil1_elm.textContent = select_pokemon1_skil1_elm.value;
})
check_pokemon1_name_button_elm.addEventListener("click", function() {
    let result = pokemon1_name_input_elm.value;
    if (Object.keys(pokemon_obj).includes(result)) {
        pokemon1_stats = pokemon_obj[result]["stats"];
        update_pokemon1_real_stats_obj();
    }
    else {
        window.alert("ポケモン名が正しくありません。");
    }
})
check_pokemon2_name_button_elm.addEventListener("click", function() {
    let result = pokemon2_name_input_elm.value;
    if (Object.keys(pokemon_obj).includes(result)) {
        pokemon2_stats = pokemon_obj[result]["stats"];
        update_pokemon2_real_stats_obj();
    }
    else {
        window.alert("ポケモン名が正しくありません。");
    }
})
button_pokemon1_skil1_elm.addEventListener("click", function() {
    pokeom1_normal_skil_obj = pokemon_normal_skil_obj[button_pokemon1_skil1_elm.textContent];
    pokemon2_hp -= damage_calculation(true);
})