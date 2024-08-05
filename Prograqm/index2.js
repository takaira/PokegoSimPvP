const select_league_elm = document.getElementById("select_league");
const input_names = document.querySelectorAll(".input_name");
const skil_selectors = document.querySelectorAll(".skil");
const buttle_start_btn = document.getElementById("buttle_start");
const shadow_checkboxs = document.querySelectorAll(".shadow");
const select_atack = document.getElementById("select_atack");
const select_diffence = document.getElementById("select_diffence");
const select_hp = document.getElementById("select_hp");
const stats_btns = document.querySelectorAll(".stats_btn");
for (let stats_btn of stats_btns) {
    stats_btn.disabled = true;
}
const apply_btn = document.getElementById("apply");

const pokemon_obj = window.Data["ポケモン"];
const normal_skil_obj = window.Data["通常技"];
const gauge_skil_obj = window.Data["ゲージ技"];
const cpm_obj = window.Data["CPM"];
const pokemon_type_compatibility_obj = window.Data["タイプ相性"];
const Autocomplete_list = window.Data["Autocomplete"];
let max_cp = 1500;
if (sessionStorage.getItem("max_cp")) {
    max_cp = sessionStorage.getItem("max_cp");
}
let change_stats_direction = "l";
let change_stats_pokemon = "pokemon1";
let left_pokemon_obj = {
    "pokemon1":{
        "name":"",
        "types":[],
        "skil1":"あくび",
        "skil2":"10まんばりき",
        "skil3":"10まんばりき",
        "stats":[1, 1, 1],
        "stats_obj":{},
        "atack":1,
        "diffence":1,
        "hp":1,
        "buffa":0,
        "buffb":0,
        "gauge":0,
        "shadow":false
    },
    "pokemon2":{    
        "name":"",
        "types":[],
        "skil1":"あくび",
        "skil2":"10まんばりき",
        "skil3":"10まんばりき",
        "stats":[1, 1, 1],
        "atack":1,
        "diffence":1,
        "hp":1,
        "buffa":0,
        "buffb":0,
        "gauge":0,
        "shadow":false
    },
    "pokemon3":{    
        "name":"",
        "types":[],
        "skil1":"あくび",
        "skil2":"10まんばりき",
        "skil3":"10まんばりき",
        "stats":[1, 1, 1],
        "atack":1,
        "diffence":1,
        "hp":1,
        "buffa":0,
        "buffb":0,
        "gauge":0,
        "shadow":false
    },
}
if (sessionStorage.getItem('left_pokemon_obj')) {
    left_pokemon_obj = JSON.parse(sessionStorage.getItem('left_pokemon_obj'));
    for (let i = 1; i <= 3; i++) {
        const stats = left_pokemon_obj["pokemon" + i]["stats"];
        stats_btns[i - 1].innerText = stats["individual_stats"][0] + "/" + stats["individual_stats"][1] + "/" + stats["individual_stats"][2] + " PL" + stats["pl"];
        stats_btns[i - 1].disabled = false;
    }
}
let right_pokemon_obj = {
    "pokemon1":{
        "name":"",
        "types":[],
        "skil1":"あくび",
        "skil2":"10まんばりき",
        "skil3":"10まんばりき",
        "stats":[1, 1, 1],
        "stats_obj":{},
        "atack":1,
        "diffence":1,
        "hp":1,
        "buffa":0,
        "buffb":0,
        "gauge":0
    },
    "pokemon2":{    
        "name":"",
        "types":[],
        "skil1":"あくび",
        "skil2":"10まんばりき",
        "skil3":"10まんばりき",
        "stats":[1, 1, 1],
        "atack":1,
        "diffence":1,
        "hp":1,
        "buffa":0,
        "buffb":0,
        "gauge":0
    },
    "pokemon3":{    
        "name":"",
        "types":[],
        "skil1":"あくび",
        "skil2":"10まんばりき",
        "skil3":"10まんばりき",
        "stats":[1, 1, 1],
        "atack":1,
        "diffence":1,
        "hp":1,
        "buffa":0,
        "buffb":0,
        "gauge":0
    },
};
if (sessionStorage.getItem('right_pokemon_obj')) {
    right_pokemon_obj = JSON.parse(sessionStorage.getItem('right_pokemon_obj'));
    for (let i = 1; i <= 3; i++) {
        const stats = right_pokemon_obj["pokemon" + i]["stats"];
        stats_btns[i + 3 - 1].innerText = stats["individual_stats"][0] + "/" + stats["individual_stats"][1] + "/" + stats["individual_stats"][2] + " PL" + stats["pl"];
        stats_btns[i + 3 - 1].disabled = false;
    }
}

$( function() {
    $( ".input_name" ).autocomplete({
        source: function(request, response) {
                var searchStr = request.term; /* 入力文字列取得 */
                var suggest = new Array();
                $.each(Autocomplete_list, function(index, value){
                        if ( value[0].match(searchStr)        /* カタカナで検索 */
                            || value[1].match(searchStr)      /* ひらがなで検索 */
                        ) {
                        /* カタカナを入力候補として表示させるために配列に設定 */
                        suggest.push(value[0]);
                        }
                });
                response(suggest);  /* 結果を設定 */
                }
    });
});
function check_name(name) {
    if (Object.keys(pokemon_obj).includes(name)) {
        return true;
    }
    else {
        return false;
    }
}

function check_name_and_change_html(input_name) {
    if (check_name(input_name.value)) {
        if (document.getElementById(input_name.id + "no")) document.getElementById(input_name.id + "no").remove();
    }
    else {
        const new_label = document.createElement("label");
        new_label.id = input_name.id + "no";
        new_label.classList = ["error"]
        var nextElementSibling = input_name.nextElementSibling;
        if (nextElementSibling.id != new_label.id) {
            new_label.textContent = "?";
            input_name.after(new_label);
        }
        if (input_name.id[0] == "l") {
            const left_pokemon_stats_obj = document.getElementById("left_pokemon" + input_name.id[12] + "_stats");
            left_pokemon_stats_obj.disabled = true;
        }
        else if (input_name.id[0] == "r") {
            const right_pokemon_stats_obj = document.getElementById("right_pokemon" + input_name.id[13] + "_stats");
            right_pokemon_stats_obj.disabled = true;
        }
    }
}

function update_pokemon_real_stats(direction, no, min_individual) {
    let pokemon_stats;
    if (direction == "l") {
        pokemon_stats = pokemon_obj[left_pokemon_obj["pokemon" + no]["name"]]["stats"];
    }
    else if (direction == "r") {
        pokemon_stats = pokemon_obj[right_pokemon_obj["pokemon" + no]["name"]]["stats"];
    }
    const pokemon_real_stats_obj = {};
    for (let individual_atack = min_individual; individual_atack < 16; individual_atack++) {
        for (let individual_diffence = min_individual; individual_diffence < 16; individual_diffence++) {
            for (let individual_hp = min_individual; individual_hp < 16; individual_hp++) {
                let pl = 51;
                
                let cp = Math.floor(((pokemon_stats[0] + individual_atack) * cpm_obj["" + pl]) * Math.sqrt((pokemon_stats[1] + individual_diffence) * cpm_obj["" + pl]) * Math.sqrt((pokemon_stats[2] + individual_hp) * cpm_obj["" + pl]) / 10);
                while(cp > max_cp) {
                    pl -= 0.5;
                    cp = Math.floor(((pokemon_stats[0] + individual_atack) * cpm_obj["" + pl]) * Math.sqrt((pokemon_stats[1] + individual_diffence) * cpm_obj["" + pl]) * Math.sqrt((pokemon_stats[2] + individual_hp) * cpm_obj["" + pl]) / 10);
                }
                const atack = (pokemon_stats[0] + individual_atack) * cpm_obj[""+pl];
                const diffence = (pokemon_stats[1] + individual_diffence) * cpm_obj[""+pl];
                const hp = Math.floor((pokemon_stats[2] + individual_hp) * cpm_obj[""+pl]);
                const scp = Math.pow((atack * diffence * hp), 2 / 3) / 10;
                pokemon_real_stats_obj[individual_atack.toString(16) + individual_diffence.toString(16) + individual_hp.toString(16)] = {
                    "individual_stats" : [individual_atack, individual_diffence, individual_hp],
                    "real_stats" : [atack, diffence, hp],
                    "cp" : cp,
                    "scp" : scp,
                    "pl": pl
                }
            }
        }
    }
    //①要素を変数保持
    let sorted_pokemon_real_stats = Object.keys(pokemon_real_stats_obj).map(function(key) {
        return pokemon_real_stats_obj[key];
        //②scpでソート
        }).sort(function(a, b) {
            return (a.scp < b.scp) ? 1 : -1;  //オブジェクトの降順ソート
    });
    if (direction == "l") {
        left_pokemon_obj["pokemon" + no]["stats_obj"] = pokemon_real_stats_obj;
        left_pokemon_obj["pokemon" + no]["stats"] = sorted_pokemon_real_stats[0];
        document.getElementById("left_pokemon" + no + "_stats").innerText = sorted_pokemon_real_stats[0]["individual_stats"][0] + "/" + sorted_pokemon_real_stats[0]["individual_stats"][1] + "/" + sorted_pokemon_real_stats[0]["individual_stats"][2] + " PL" + sorted_pokemon_real_stats[0]["pl"];
        left_pokemon_obj["pokemon" + no]["atack"] = sorted_pokemon_real_stats[0]["real_stats"][0];
        left_pokemon_obj["pokemon" + no]["diffence"] = sorted_pokemon_real_stats[0]["real_stats"][1];
        left_pokemon_obj["pokemon" + no]["hp"] = sorted_pokemon_real_stats[0]["real_stats"][2];
    }
    else if (direction == "r") {
        right_pokemon_obj["pokemon" + no]["stats_obj"] = pokemon_real_stats_obj;
        right_pokemon_obj["pokemon" + no]["stats"] = sorted_pokemon_real_stats[0];
        document.getElementById("right_pokemon" + no + "_stats").innerText = sorted_pokemon_real_stats[0]["individual_stats"][0] + "/" + sorted_pokemon_real_stats[0]["individual_stats"][1] + "/" + sorted_pokemon_real_stats[0]["individual_stats"][2] + " PL" + sorted_pokemon_real_stats[0]["pl"];
        right_pokemon_obj["pokemon" + no]["atack"] = sorted_pokemon_real_stats[0]["real_stats"][0];
        right_pokemon_obj["pokemon" + no]["diffence"] = sorted_pokemon_real_stats[0]["real_stats"][1];
        right_pokemon_obj["pokemon" + no]["hp"] = sorted_pokemon_real_stats[0]["real_stats"][2];
    }
    // console.log(left_pokemon_obj);
    // // console.log(sorted_pokemon1_real_stats);
    // pokemon1_hp = sorted_pokemon1_real_stats[0]["real_stats"][2];
    // pokemon1_hp_elm.textContent = pokemon1_hp + "/" + sorted_pokemon1_real_stats[0]["real_stats"][2];
}

function update_pokemon(direction, no) {
    if (direction == "l") {
        const left_pokemon_name_obj = document.getElementById("left_pokemon" + no + "_name");
        const left_pokemon_stats_obj = document.getElementById("left_pokemon" + no + "_stats");
        left_pokemon_stats_obj.disabled = false;
        left_pokemon_obj["pokemon" + no]["name"] = left_pokemon_name_obj.value;
        let min_individual = 0;
        if (Object.keys(pokemon_obj[left_pokemon_name_obj.value]).includes("min_individual")) {
            min_individual = pokemon_obj[left_pokemon_name_obj.value]["min_individual"];
        }
        update_pokemon_real_stats(direction, no, min_individual);
        left_pokemon_obj["pokemon" + no]["types"] = pokemon_obj[left_pokemon_name_obj.value]["types"];
    }
    else if (direction == "r") {
        const right_pokemon_name_obj = document.getElementById("right_pokemon" + no + "_name");
        const right_pokemon_stats_obj = document.getElementById("right_pokemon" + no + "_stats");
        right_pokemon_stats_obj.disabled = false;
        right_pokemon_obj["pokemon" + no]["name"] = right_pokemon_name_obj.value;
        let min_individual = 0;
        if (Object.keys(pokemon_obj[right_pokemon_name_obj.value]).includes("min_individual")) {
            min_individual = pokemon_obj[right_pokemon_name_obj.value]["min_individual"];
        }
        update_pokemon_real_stats(direction, no, min_individual);
        right_pokemon_obj["pokemon" + no]["types"] = pokemon_obj[right_pokemon_name_obj.value]["types"];
    }
}
for (let input_name of input_names) {
    input_name.onblur = function() {
        check_name_and_change_html(input_name);
        if (check_name(input_name.value)) {
            if (input_name.id[0] == "l") {
                update_pokemon("l", input_name.id[12]);
            }
            else if (input_name.id[0] == "r") {
                update_pokemon("r", input_name.id[13]);
            }
        }
    }
}
select_league_elm.addEventListener("change", function() {
    let result = select_league_elm.value;
    if (result == "local") max_cp = 500;
    else if (result == "super") max_cp = 1500;
    else if (result == "hyper") max_cp = 2500;
    for (let input_name of input_names) {
        if (check_name(input_name.value)) {
            if (input_name.id[0] == "l") {
                update_pokemon("l", input_name.id[12]);
            }
            else if (input_name.id[0] == "r") {
                update_pokemon("r", input_name.id[13]);
            }
        }
    }
})

function update_skil(direction, pokemon_no, skil_no, value) {
    if (direction == "l") {
        left_pokemon_obj["pokemon" + pokemon_no]["skil" + skil_no] = value;
    }
    else if (direction == "r") {
        right_pokemon_obj["pokemon" + pokemon_no]["skil" + skil_no] = value;
    }
}

function update_shadow(direction, pokemon_no, value) {
    if (direction == "l") {
        left_pokemon_obj["pokemon" + pokemon_no]["shadow"] = value;
        if (value) left_pokemon_obj["pokemon" + pokemon_no]["name"] = "S" + left_pokemon_obj["pokemon" + pokemon_no]["name"];
    }
    else if (direction == "r") {
        right_pokemon_obj["pokemon" + pokemon_no]["shadow"] = value;
        if (value) right_pokemon_obj["pokemon" + pokemon_no]["name"] = "S" + right_pokemon_obj["pokemon" + pokemon_no]["name"];
    }
}

for (let skil_selector of skil_selectors) {
    skil_selector.onchange = function() {
        if (skil_selector.id[7] == "l") {
            update_skil("l", skil_selector.id[19], skil_selector.id.slice(-1), skil_selector.value);
        }
        else if (skil_selector.id[7] == "r") {
            update_skil("r", skil_selector.id[20], skil_selector.id.slice(-1), skil_selector.value);
        }
    }
}

buttle_start_btn.addEventListener("click", function() {
    let league = select_league_elm.value;
    if (league == "local") max_cp = 500;
    else if (league == "super") max_cp = 1500;
    else if (league == "hyper") max_cp = 2500;
    let can_buttle_flag = true;
    for (let input_name of input_names) {
        check_name_and_change_html(input_name);
        can_buttle_flag &= check_name(input_name.value);
    }
    if (can_buttle_flag) {
        // for (let i = 1; i <= 3; i++) {
        //     update_pokemon("l", ""+i);
        //     update_pokemon("r", ""+i);
        // }
        // for (let skil_selector of skil_selectors) {
        //     if (skil_selector.id[7] == "l") {
        //         update_skil("l", skil_selector.id[19], skil_selector.id.slice(-1), skil_selector.value);
        //     }
        //     else if (skil_selector.id[7] == "r") {
        //         update_skil("r", skil_selector.id[20], skil_selector.id.slice(-1), skil_selector.value);
        //     }
        // }
        // for (let shadow_checkbox of shadow_checkboxs) {
        //     if (shadow_checkbox.id[0] == "l") {
        //         update_shadow("l", shadow_checkbox.id[12], shadow_checkbox.checked);
        //     }
        //     else if (shadow_checkbox.id[0] == "r") {
        //         update_shadow("r", shadow_checkbox.id[13], shadow_checkbox.checked);
        //     }
        // }
        sessionStorage.setItem('max_cp', max_cp);
        sessionStorage.setItem('left_pokemon_obj', JSON.stringify(left_pokemon_obj));
        sessionStorage.setItem('right_pokemon_obj', JSON.stringify(right_pokemon_obj));
        sessionStorage.setItem('pokemon_type_compatibility_obj', JSON.stringify(pokemon_type_compatibility_obj));
        sessionStorage.setItem('normal_skil_obj', JSON.stringify(normal_skil_obj));
        sessionStorage.setItem('gauge_skil_obj', JSON.stringify(gauge_skil_obj));
        window.location.href = "buttle.html";
    }
})
const datalist = document.getElementById("poke_datalist");
for (let pokemon_name of Object.keys(pokemon_obj)) {
    const option = document.createElement("option");
    option.value = pokemon_name;
    datalist.appendChild(option);
}

for (let stats_btn of stats_btns) {
    stats_btn.addEventListener("click", function() {
        change_stats_direction = stats_btn.id[0];
        const Modal_Label = document.getElementById("exampleModalLabel");
        const selects = stats_btn.innerText.split("/");
        select_atack.value = selects[0];
        select_diffence.value = selects[1];
        select_hp.value = selects[2].split(" ")[0];
        if (change_stats_direction == "l") {
            Modal_Label.innerText = "左のポケモン" + stats_btn.id[12];
            change_stats_pokemon = "pokemon" + stats_btn.id[12];
        }
        else if (change_stats_direction == "r") {
            Modal_Label.innerText = "右のポケモン" + stats_btn.id[13];
            change_stats_pokemon = "pokemon" + stats_btn.id[13];
        }
    })
}
apply_btn.addEventListener("click", function() {
    const atack_x = parseInt(select_atack.value).toString(16);
    const diffence_x = parseInt(select_diffence.value).toString(16);
    const hp_x = parseInt(select_hp.value).toString(16);
    if (change_stats_direction == "l") {
        if (atack_x + diffence_x + hp_x in left_pokemon_obj[change_stats_pokemon]["stats_obj"]) {
            left_pokemon_obj[change_stats_pokemon]["stats"] = left_pokemon_obj[change_stats_pokemon]["stats_obj"][atack_x + diffence_x + hp_x];
            left_pokemon_obj[change_stats_pokemon]["atack"] = left_pokemon_obj[change_stats_pokemon]["stats"]["real_stats"][0];
            left_pokemon_obj[change_stats_pokemon]["diffence"] = left_pokemon_obj[change_stats_pokemon]["stats"]["real_stats"][1];
            left_pokemon_obj[change_stats_pokemon]["hp"] = left_pokemon_obj[change_stats_pokemon]["stats"]["real_stats"][2];
            document.getElementById("left_" + change_stats_pokemon + "_stats").innerText = parseInt(atack_x, 16).toString() + "/" + parseInt(diffence_x, 16).toString() + "/" + parseInt(hp_x, 16).toString() + " PL" + left_pokemon_obj[change_stats_pokemon]["stats"]["pl"];    
        }
        else {
            alert("その個体値は存在しません");
        }
    }
    else if (change_stats_direction == "r") {
        if (atack_x + diffence_x + hp_x in right_pokemon_obj[change_stats_pokemon]["stats_obj"]) {
        right_pokemon_obj[change_stats_pokemon]["stats"] = right_pokemon_obj[change_stats_pokemon]["stats_obj"][atack_x + diffence_x + hp_x];
        right_pokemon_obj[change_stats_pokemon]["atack"] = right_pokemon_obj[change_stats_pokemon]["stats"]["real_stats"][0];
        right_pokemon_obj[change_stats_pokemon]["diffence"] = right_pokemon_obj[change_stats_pokemon]["stats"]["real_stats"][1];
        right_pokemon_obj[change_stats_pokemon]["hp"] = right_pokemon_obj[change_stats_pokemon]["stats"]["real_stats"][2];
        document.getElementById("right_" + change_stats_pokemon + "_stats").innerText = parseInt(atack_x, 16).toString() + "/" + parseInt(diffence_x, 16).toString() + "/" + parseInt(hp_x, 16).toString() + " PL" + right_pokemon_obj[change_stats_pokemon]["stats"]["pl"];
        }
        else {
            alert("その個体値は存在しません");
        }
    }
})