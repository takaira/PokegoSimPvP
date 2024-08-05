let left_pokemon_obj = JSON.parse(sessionStorage.getItem('left_pokemon_obj'));
let right_pokemon_obj = JSON.parse(sessionStorage.getItem('right_pokemon_obj'));
// for (let left_pokemon of Object.keys(left_pokemon_obj)) {
//     left_pokemon_obj[left_pokemon]["stiffen_time"] = 0;
// }
// for (let right_pokemon of Object.keys(right_pokemon_obj)) {
//     right_pokemon_obj[right_pokemon]["stiffen_time"] = 0;
// }
let left_stiffen_time = 0;
let right_stiffen_time = 0;
let left_change_value;
let right_change_value;
let left_change_id;
let right_change_id;
let left_dead;
let right_dead;
let left_change_timer = 0;
let right_change_timer = 0;
let left_shield_times = 2;
let right_shield_times = 2;
let left_pokemon_atack_buff = 0;
let left_pokemon_diffence_buff = 0;
let right_pokemon_atack_buff = 0;
let right_pokemon_diffence_buff = 0;
const buff_list = {
    "0": 1,
    "1": 1.25,
    "2": 1.5,
    "3": 1.75,
    "4": 2,
    "-4": 0.5,
    "-3": 0.5714286,
    "-2": 0.66666669,
    "-1": 0.8
};
const pokemon_type_compatibility_obj = JSON.parse(sessionStorage.getItem('pokemon_type_compatibility_obj'));
const normal_skil_obj = JSON.parse(sessionStorage.getItem('normal_skil_obj'));
const gauge_skil_obj = JSON.parse(sessionStorage.getItem('gauge_skil_obj'));
let left_buttle_pokemon = {"buttle_pokemon":"pokemon1"};
let right_buttle_pokemon = {"buttle_pokemon":"pokemon1"};

const back_turn = document.getElementById("back_turn");
back_turn.disabled = true;
const left_buttle_pokemon_name = document.getElementById("left_buttle_pokemon_name");
const left_skil1 = document.getElementById("left_skil1");
const left_skil2 = document.getElementById("left_skil2");
const left_skil3 = document.getElementById("left_skil3");
left_skil2.disabled = true;
left_skil3.disabled = true;
const left_buttle_pokemon_gauge = document.getElementById("left_buttle_pokemon_gauge");
const left_buttle_pokemon_hp = document.getElementById("left_buttle_pokemon_hp");
const right_buttle_pokemon_name = document.getElementById("right_buttle_pokemon_name");
const right_skil1 = document.getElementById("right_skil1");
const right_skil2 = document.getElementById("right_skil2");
const right_skil3 = document.getElementById("right_skil3");
right_skil2.disabled = true;
right_skil3.disabled = true;
const right_buttle_pokemon_gauge = document.getElementById("right_buttle_pokemon_gauge");
const right_buttle_pokemon_hp = document.getElementById("right_buttle_pokemon_hp");
const normal_skil_buttons = document.querySelectorAll(".normal_skil");
const gauge_skil_buttons = document.querySelectorAll(".gauge_skil");
const left_change_pokemons = document.querySelectorAll(".left_change_pokemon");
const left_pokemon_2_name = document.getElementById("left_pokemon_2_name");
const left_pokemon_2_gauge = document.getElementById("left_pokemon_2_gauge").getElementsByTagName("span")[0];
const left_pokemon_2_hp = document.getElementById("left_pokemon_2_hp").getElementsByTagName("span")[0];
const left_pokemon_3_name = document.getElementById("left_pokemon_3_name");
const left_pokemon_3_gauge = document.getElementById("left_pokemon_3_gauge").getElementsByTagName("span")[0];
const left_pokemon_3_hp = document.getElementById("left_pokemon_3_hp").getElementsByTagName("span")[0];
const right_change_pokemons = document.querySelectorAll(".right_change_pokemon");
const right_pokemon_2_name = document.getElementById("right_pokemon_2_name");
const right_pokemon_2_gauge = document.getElementById("right_pokemon_2_gauge").getElementsByTagName("span")[0];
const right_pokemon_2_hp = document.getElementById("right_pokemon_2_hp").getElementsByTagName("span")[0];
const right_pokemon_3_name = document.getElementById("right_pokemon_3_name");
const right_pokemon_3_gauge = document.getElementById("right_pokemon_3_gauge").getElementsByTagName("span")[0];
const right_pokemon_3_hp = document.getElementById("right_pokemon_3_hp").getElementsByTagName("span")[0];
const modal_title = document.getElementsByClassName("modal-title")[0];

console.log(left_pokemon_obj);
console.log(right_pokemon_obj);

left_buttle_pokemon_name.innerText = left_pokemon_obj["pokemon1"]["name"];
left_skil1.innerText = left_pokemon_obj["pokemon1"]["skil1"];
left_skil2.innerText = left_pokemon_obj["pokemon1"]["skil2"];
left_skil3.innerText = left_pokemon_obj["pokemon1"]["skil3"];
left_buttle_pokemon_hp.innerText = left_pokemon_obj["pokemon1"]["hp"] + "/" + left_pokemon_obj["pokemon1"]["hp"];
right_buttle_pokemon_name.innerText = right_pokemon_obj["pokemon1"]["name"];
right_skil1.innerText = right_pokemon_obj["pokemon1"]["skil1"];
right_skil2.innerText = right_pokemon_obj["pokemon1"]["skil2"];
right_skil3.innerText = right_pokemon_obj["pokemon1"]["skil3"];
right_buttle_pokemon_hp.innerText = right_pokemon_obj["pokemon1"]["hp"] + "/" + right_pokemon_obj["pokemon1"]["hp"];

left_pokemon_2_name.innerText = left_pokemon_obj["pokemon2"]["name"];
left_pokemon_2_gauge.innerText = left_pokemon_obj["pokemon2"]["gauge"] + "/100";
left_pokemon_2_hp.innerText = left_pokemon_obj["pokemon2"]["hp"] + "/" + left_pokemon_obj["pokemon2"]["stats"]["real_stats"][2];
left_pokemon_3_name.innerText = left_pokemon_obj["pokemon3"]["name"];
left_pokemon_3_gauge.innerText = left_pokemon_obj["pokemon3"]["gauge"] + "/100";
left_pokemon_3_hp.innerText = left_pokemon_obj["pokemon3"]["hp"] + "/" + left_pokemon_obj["pokemon3"]["stats"]["real_stats"][2];
right_pokemon_2_name.innerText = right_pokemon_obj["pokemon2"]["name"];
right_pokemon_2_gauge.innerText = right_pokemon_obj["pokemon2"]["gauge"] + "/100";
right_pokemon_2_hp.innerText = right_pokemon_obj["pokemon2"]["hp"] + "/" + right_pokemon_obj["pokemon2"]["stats"]["real_stats"][2];
right_pokemon_3_name.innerText = right_pokemon_obj["pokemon3"]["name"];
right_pokemon_3_gauge.innerText = right_pokemon_obj["pokemon3"]["gauge"] + "/100";
right_pokemon_3_hp.innerText = right_pokemon_obj["pokemon3"]["hp"] + "/" + right_pokemon_obj["pokemon3"]["stats"]["real_stats"][2];

let now_time = 0;
const All_time_status = [new Object()];
append_All_time_status();

function append_All_time_status() {
    All_time_status[now_time]["left_pokemon_obj"] = JSON.parse(JSON.stringify(left_pokemon_obj));
    All_time_status[now_time]["right_pokemon_obj"] = JSON.parse(JSON.stringify(right_pokemon_obj));
    All_time_status[now_time]["left_buttle_pokemon"] = JSON.parse(JSON.stringify(left_buttle_pokemon));
    All_time_status[now_time]["right_buttle_pokemon"] = JSON.parse(JSON.stringify(right_buttle_pokemon));
    All_time_status[now_time]["left_stiffen_time"] = left_stiffen_time;
    All_time_status[now_time]["right_stiffen_time"] = right_stiffen_time;
    All_time_status[now_time]["left_change_value"] = left_change_value;
    All_time_status[now_time]["right_change_value"] = right_change_value;
    All_time_status[now_time]["left_change_id"] = left_change_id;
    All_time_status[now_time]["right_change_id"] = right_change_id;
    All_time_status[now_time]["left_dead"] = left_dead;
    All_time_status[now_time]["right_dead"] = right_dead;
    All_time_status[now_time]["left_change_timer"] = left_change_timer;
    All_time_status[now_time]["right_change_timer"] = right_change_timer;
    All_time_status[now_time]["left_shield_times"] = left_shield_times;
    All_time_status[now_time]["right_shield_times"] = right_shield_times;
    All_time_status[now_time]["left_pokemon_atack_buff"] = left_pokemon_atack_buff;
    All_time_status[now_time]["left_pokemon_diffence_buff"] = left_pokemon_diffence_buff;
    All_time_status[now_time]["right_pokemon_atack_buff"] = right_pokemon_atack_buff;
    All_time_status[now_time]["right_pokemon_diffence_buff"] = right_pokemon_diffence_buff;
    All_time_status[now_time]["left_pokemon_2_button_value"] = left_pokemon_2_name.value;
    All_time_status[now_time]["left_pokemon_3_button_value"] = left_pokemon_3_name.value;
    All_time_status[now_time]["right_pokemon_2_button_value"] = right_pokemon_2_name.value;
    All_time_status[now_time]["right_pokemon_3_button_value"] = right_pokemon_3_name.value;
    All_time_status[now_time]["left_pokemon_skil1_disabled"] = left_skil1.disabled;
    All_time_status[now_time]["left_pokemon_skil2_disabled"] = left_skil2.disabled;
    All_time_status[now_time]["left_pokemon_skil3_disabled"] = left_skil3.disabled;
    All_time_status[now_time]["left_pokemon_2_name_disabled"] = left_pokemon_2_name.disabled;
    All_time_status[now_time]["left_pokemon_3_name_disabled"] = left_pokemon_3_name.disabled;
    All_time_status[now_time]["right_pokemon_skil1_disabled"] = right_skil1.disabled;
    All_time_status[now_time]["right_pokemon_skil2_disabled"] = right_skil2.disabled;
    All_time_status[now_time]["right_pokemon_skil3_disabled"] = right_skil3.disabled;
    All_time_status[now_time]["right_pokemon_2_name_disabled"] = right_pokemon_2_name.disabled;
    All_time_status[now_time]["right_pokemon_3_name_disabled"] = right_pokemon_3_name.disabled;
    now_time++;
    All_time_status.push(new Object());
}

function update_all_text() {
    document.getElementById("left_shield_times").getElementsByTagName("span")[0].innerText = left_shield_times + "/2";
    document.getElementById("right_shield_times").getElementsByTagName("span")[0].innerText = right_shield_times + "/2";
    update_change_timer();
    document.getElementById("left_atack_buff").getElementsByTagName("span")[0].innerText = left_pokemon_atack_buff;
    document.getElementById("left_diffence_buff").getElementsByTagName("span")[0].innerText = left_pokemon_diffence_buff;
    document.getElementById("right_atack_buff").getElementsByTagName("span")[0].innerText = right_pokemon_atack_buff;
    document.getElementById("right_diffence_buff").getElementsByTagName("span")[0].innerText = right_pokemon_diffence_buff;
    const left_buttle_pokemon_obj = left_pokemon_obj[left_buttle_pokemon["buttle_pokemon"]];
    left_buttle_pokemon_name.innerText = left_buttle_pokemon_obj["name"];
    left_skil1.innerText = left_buttle_pokemon_obj["skil1"];
    left_skil2.innerText = left_buttle_pokemon_obj["skil2"];
    left_skil3.innerText = left_buttle_pokemon_obj["skil3"];
    left_buttle_pokemon_gauge.innerText = left_buttle_pokemon_obj["gauge"] + "/100";
    left_buttle_pokemon_hp.innerText = left_buttle_pokemon_obj["hp"] + "/" + left_buttle_pokemon_obj["stats"]["real_stats"][2];
    const right_buttle_pokemon_obj = right_pokemon_obj[right_buttle_pokemon["buttle_pokemon"]];
    right_buttle_pokemon_name.innerText = right_buttle_pokemon_obj["name"];
    right_skil1.innerText = right_buttle_pokemon_obj["skil1"];
    right_skil2.innerText = right_buttle_pokemon_obj["skil2"];
    right_skil3.innerText = right_buttle_pokemon_obj["skil3"];
    right_buttle_pokemon_gauge.innerText = right_buttle_pokemon_obj["gauge"] + "/100";
    right_buttle_pokemon_hp.innerText = right_buttle_pokemon_obj["hp"] + "/" + right_buttle_pokemon_obj["stats"]["real_stats"][2];
    left_pokemon_2_name.innerText = left_pokemon_obj[left_pokemon_2_name.value]["name"];
    left_pokemon_2_gauge.innerText = left_pokemon_obj[left_pokemon_2_name.value]["gauge"] + "/100";
    left_pokemon_2_hp.innerText = left_pokemon_obj[left_pokemon_2_name.value]["hp"] + "/" + left_pokemon_obj[left_pokemon_2_name.value]["stats"]["real_stats"][2];
    left_pokemon_3_name.innerText = left_pokemon_obj[left_pokemon_3_name.value]["name"];
    left_pokemon_3_gauge.innerText = left_pokemon_obj[left_pokemon_3_name.value]["gauge"] + "/100";
    left_pokemon_3_hp.innerText = left_pokemon_obj[left_pokemon_3_name.value]["hp"] + "/" + left_pokemon_obj[left_pokemon_3_name.value]["stats"]["real_stats"][2];
    right_pokemon_2_name.innerText = right_pokemon_obj[right_pokemon_2_name.value]["name"];
    right_pokemon_2_gauge.innerText = right_pokemon_obj[right_pokemon_2_name.value]["gauge"] + "/100";
    right_pokemon_2_hp.innerText = right_pokemon_obj[right_pokemon_2_name.value]["hp"] + "/" + right_pokemon_obj[right_pokemon_2_name.value]["stats"]["real_stats"][2];
    right_pokemon_3_name.innerText = right_pokemon_obj[right_pokemon_3_name.value]["name"];
    right_pokemon_3_gauge.innerText = right_pokemon_obj[right_pokemon_3_name.value]["gauge"] + "/100";
    right_pokemon_3_hp.innerText = right_pokemon_obj[right_pokemon_3_name.value]["hp"] + "/" + right_pokemon_obj[right_pokemon_3_name.value]["stats"]["real_stats"][2];
}

const promisifyModal = (modal) =>{
    const $modal = $(modal);
    return new Promise((resolve) => {
        $modal
            .data('modal-result', null)
            .off('hidden.bs.modal')
            .one('hidden.bs.modal', () => {
                resolve($modal.data('modal-result'));
                $modal
                    .data('modal-param', null)
                    .data('modal-result', null)
            })
            .modal('show')
    });
};

const $modal = $('#modal');

$modal.on('show.bs.modal', (ev) => {
    // モーダルに渡されたパラメータでなにかする
    const param = $modal.data('modal-param');
    $modal.find('input[type="number"]').val(1.00);
});

$modal.find('[data-modal-ok]').on('click', (ev) => {
    // モーダルの結果を設定して閉じる
    const result = $modal.find('input[type="number"]').val();
    $modal.data('modal-result', result);
    $modal.modal('hide');
});

function update_change_timer() {
    document.getElementById("left_change_timer").getElementsByTagName("span")[0].innerText = left_change_timer;
    document.getElementById("right_change_timer").getElementsByTagName("span")[0].innerText = right_change_timer;
    document.getElementById("left_stiffen_time").getElementsByTagName("span")[0].innerText = left_stiffen_time;
    document.getElementById("right_stiffen_time").getElementsByTagName("span")[0].innerText = right_stiffen_time;
}

async function normal_atack(direction, skil_kind) {
    let damage;
    let skil;
    const left_pokemon = left_pokemon_obj[left_buttle_pokemon["buttle_pokemon"]];
    const right_pokemon = right_pokemon_obj[right_buttle_pokemon["buttle_pokemon"]];
    if (skil_kind.slice(0, 4) == "skil") {
        left_change_timer = Math.max(left_change_timer - 10, 0);
        right_change_timer = Math.max(right_change_timer - 10, 0);
        update_change_timer();
    }
    if (skil_kind == "change") {
        if (direction == "l") {
            left_pokemon["atack"] = left_pokemon["stats"]["real_stats"][0] * buff_list[left_pokemon_atack_buff.toString()];
            left_pokemon["diffence"] = left_pokemon["stats"]["real_stats"][1] * buff_list[left_pokemon_diffence_buff.toString()];
        }
        else if (direction == "r") {
            right_pokemon["atack"] = right_pokemon["stats"]["real_stats"][0] * buff_list[right_pokemon_atack_buff.toString()];
            right_pokemon["diffence"] = right_pokemon["stats"]["real_stats"][1] * buff_list[right_pokemon_diffence_buff.toString()];
        }
        change_pokemon(direction);
    }
    else if ((left_pokemon["hp"] > 0 && right_pokemon["hp"] > 0) || (left_pokemon["skil_kind"] == "normal" && left_stiffen_time == 0 && right_pokemon["skil_kind"] == "normal" && right_stiffen_time == 0)) {
        if (direction == "l") {
            let shield_not_use = true;
            let swipe_magnification = 1;
            if (skil_kind == "normal") {
                skil = normal_skil_obj[left_pokemon["skil1"]];
                left_pokemon["gauge"] = Math.min(100, left_pokemon["gauge"] + skil["gauge"]);
                left_buttle_pokemon_gauge.innerText = left_pokemon["gauge"] + "/100";
            }
            else {
                skil = gauge_skil_obj[left_pokemon["skil" + skil_kind.slice(-1)]];
                left_pokemon["gauge"] = left_pokemon["gauge"] - skil["gauge"];
                left_buttle_pokemon_gauge.innerText = left_pokemon["gauge"] + "/100";
                modal_title.innerText = "左のプレイヤーのスワイプ調整";
                // モーダルを表示して閉じるまで待つ
                const result = await promisifyModal('#modal');
                if (result != null) {
                    // モーダルの結果でなにかする
                    swipe_magnification = result;
                }
                if (right_shield_times > 0) {
                    if (window.confirm("右のプレイヤーはシールドを使いますか？")) {
                        shield_not_use = false;
                        right_shield_times--;
                        document.getElementById("right_shield_times").getElementsByTagName("span")[0].innerText = right_shield_times + "/2";
                    }
                }
                else {
                    alert("右のプレイヤーはシールドがありません");
                }
            }
            const type_match = (left_pokemon["types"].includes(skil["type"]) ? 1.2 : 1);
            let type_compatibilitys = [];
            for (let right_pokemon_type of right_pokemon["types"]) {
                type_compatibilitys.push(pokemon_type_compatibility_obj[skil["type"]][right_pokemon_type]);
            }
            let type_compatibility = 1;
            for (let i = 0; i < type_compatibilitys.length; i++) {
                if (type_compatibilitys.includes(0.390625) && type_compatibilitys[i] == 1.6) type_compatibilitys[i] == 1;
                type_compatibility *= type_compatibilitys[i];
            }
            let left_shadow_compatibilitys = (left_pokemon["shadow"] ? 1.2 : 1);
            let right_shadow_compatibilitys = (right_pokemon["shadow"] ? 1.2 : 1);
            damage = Math.floor((left_pokemon["atack"] / right_pokemon["diffence"]) * skil["power"] * type_match * type_compatibility * 1.3 * 0.5 * shield_not_use * swipe_magnification * left_shadow_compatibilitys * right_shadow_compatibilitys + 1);
            // left_stiffen_time = normal_skil["time"];
            right_pokemon["hp"] -= damage;
            right_buttle_pokemon_hp.innerText = right_pokemon["hp"] + "/" + right_pokemon["stats"]["real_stats"][2];
        }
        else if (direction == "r") {
            let shield_not_use = true;
            let swipe_magnification = 1;
            if (skil_kind == "normal") {
                skil = normal_skil_obj[right_pokemon["skil1"]];
                right_pokemon["gauge"] = Math.min(100, right_pokemon["gauge"] + skil["gauge"]);
                right_buttle_pokemon_gauge.innerText = right_pokemon["gauge"] + "/100";
            }
            else {
                skil = gauge_skil_obj[right_pokemon["skil" + skil_kind.slice(-1)]];
                right_pokemon["gauge"] = right_pokemon["gauge"] - skil["gauge"];
                right_buttle_pokemon_gauge.innerText = right_pokemon["gauge"] + "/100";
                modal_title.innerText = "右のプレイヤーのスワイプ調整";
                // モーダルを表示して閉じるまで待つ
                const result = await promisifyModal('#modal');
                if (result != null) {
                    // モーダルの結果でなにかする
                    swipe_magnification = result;
                }
                if (left_shield_times > 0) {
                    if (window.confirm("左のプレイヤーはシールドを使いますか？")) {
                        shield_not_use = false;
                        left_shield_times--;
                        document.getElementById("left_shield_times").getElementsByTagName("span")[0].innerText = left_shield_times + "/2";
                    }
                }
                else {
                    alert("左のプレイヤーはシールドがありません");
                }
            }
            const type_match = (right_pokemon["types"].includes(skil["type"]) ? 1.2 : 1);
            let type_compatibilitys = [];
            for (let left_pokemon_type of left_pokemon["types"]) {
                type_compatibilitys.push(pokemon_type_compatibility_obj[skil["type"]][left_pokemon_type]);
            }
            let type_compatibility = 1;
            for (let i = 0; i < type_compatibilitys.length; i++) {
                if (type_compatibilitys.includes(0.390625) && type_compatibilitys[i] == 1.6) type_compatibilitys[i] == 1;
                type_compatibility *= type_compatibilitys[i];
            }
            let left_shadow_compatibilitys = (left_pokemon["shadow"] ? 1.2 : 1);
            let right_shadow_compatibilitys = (right_pokemon["shadow"] ? 1.2 : 1);
            damage = Math.floor((right_pokemon["atack"] / left_pokemon["diffence"]) * skil["power"] * type_match * type_compatibility * 1.3 * 0.5 * shield_not_use * swipe_magnification * left_shadow_compatibilitys * right_shadow_compatibilitys + 1);
            // right_stiffen_time = normal_skil["time"];
            left_pokemon["hp"] -= damage;
            left_buttle_pokemon_hp.innerText = left_pokemon["hp"] + "/" + left_pokemon["stats"]["real_stats"][2];
        }
    }
    if (skil_kind.slice(0, 4) == "skil") {
        if (skil["mybuff"]["effect"].length > 0) {
            if (skil["mybuff"]["probability"] >= Math.random()) {
                for (let effect of skil["mybuff"]["effect"]) {
                    if (direction == "l") {
                        let buff_count = Math.max((effect.match(/↓/g) || []).length, (effect.match(/↑/g) || []).length);
                        if (effect[0] == "A") {
                            if (effect.slice(-1) == "↓") {
                                left_pokemon_atack_buff = Math.max(left_pokemon_atack_buff - buff_count, -4);
                                left_pokemon["atack"] = left_pokemon["stats"]["real_stats"][0] * buff_list[left_pokemon_atack_buff.toString()];
                            }
                            else if (effect.slice(-1) == "↑") {
                                left_pokemon_atack_buff = Math.min(left_pokemon_atack_buff + buff_count, 4);
                                left_pokemon["atack"] = left_pokemon["stats"]["real_stats"][0] * buff_list[left_pokemon_atack_buff.toString()];
                            }
                        }
                        else if (effect[0] == "B") {
                            if (effect.slice(-1) == "↓") {
                                left_pokemon_diffence_buff = Math.max(left_pokemon_diffence_buff - buff_count, -4);
                                left_pokemon["diffence"] = left_pokemon["stats"]["real_stats"][1] * buff_list[left_pokemon_diffence_buff.toString()];
                            }
                            else if (effect.slice(-1) == "↑") {
                                left_pokemon_diffence_buff = Math.min(left_pokemon_diffence_buff + buff_count, 4);
                                left_pokemon["diffence"] = left_pokemon["stats"]["real_stats"][1] * buff_list[left_pokemon_diffence_buff.toString()];
                            }
                        }
                    }
                    else if (direction == "r") {
                        let buff_count = Math.max((effect.match(/↓/g) || []).length, (effect.match(/↑/g) || []).length);
                        if (effect[0] == "A") {
                            if (effect.slice(-1) == "↓") {
                                right_pokemon_atack_buff = Math.max(right_pokemon_atack_buff - buff_count, -4);
                                right_pokemon["atack"] = right_pokemon["stats"]["real_stats"][0] * buff_list[right_pokemon_atack_buff.toString()];
                            }
                            else if (effect.slice(-1) == "↑") {
                                right_pokemon_atack_buff = Math.min(right_pokemon_atack_buff + buff_count, 4);
                                right_pokemon["atack"] = right_pokemon["stats"]["real_stats"][0] * buff_list[right_pokemon_atack_buff.toString()];
                            }
                        }
                        else if (effect[0] == "B") {
                            if (effect.slice(-1) == "↓") {
                                right_pokemon_diffence_buff = Math.max(right_pokemon_diffence_buff - buff_count, -4);
                                right_pokemon["diffence"] = right_pokemon["stats"]["real_stats"][1] * buff_list[right_pokemon_diffence_buff.toString()];
                            }
                            else if (effect.slice(-1) == "↑") {
                                right_pokemon_diffence_buff = Math.min(right_pokemon_diffence_buff + buff_count, 4);
                                right_pokemon["diffence"] = right_pokemon["stats"]["real_stats"][1] * buff_list[right_pokemon_diffence_buff.toString()];
                            }
                        }
                    }
                }
            }
        }
        if (skil["ebuff"]["effect"].length > 0) {
            if (skil["ebuff"]["probability"] >= Math.random()) {
                for (let effect of skil["ebuff"]["effect"]) {
                    if (direction == "l") {
                        let buff_count = (effect.match(/↓/g) || []).length;
                        if (effect[0] == "A") {
                            if (effect.slice(-1) == "↓") {
                                right_pokemon_atack_buff = Math.max(right_pokemon_atack_buff - buff_count, -4);
                                right_pokemon["atack"] = right_pokemon["stats"]["real_stats"][0] * buff_list[right_pokemon_atack_buff.toString()];
                            }
                        }
                        else if (effect[0] == "B") {
                            if (effect.slice(-1) == "↓") {
                                right_pokemon_diffence_buff = Math.max(right_pokemon_diffence_buff - buff_count, -4);
                                right_pokemon["diffence"] = right_pokemon["stats"]["real_stats"][1] * buff_list[right_pokemon_diffence_buff.toString()];
                            }
                        }
                    }
                    else if (direction == "r") {
                        let buff_count = Math.max((effect.match(/↓/g) || []).length, (effect.match(/↑/g) || []).length);
                        if (effect[0] == "A") {
                            if (effect.slice(-1) == "↓") {
                                left_pokemon_atack_buff = Math.max(left_pokemon_atack_buff - buff_count, -4);
                                left_pokemon["atack"] = left_pokemon["stats"]["real_stats"][0] * buff_list[left_pokemon_atack_buff.toString()];
                            }
                        }
                        else if (effect[0] == "B") {
                            if (effect.slice(-1) == "↓") {
                                left_pokemon_diffence_buff = Math.max(left_pokemon_diffence_buff - buff_count, -4);
                                left_pokemon["diffence"] = left_pokemon["stats"]["real_stats"][1] * buff_list[left_pokemon_diffence_buff.toString()];
                            }
                        }
                    }
                }
            }
        }
    }
    document.getElementById("left_atack_buff").getElementsByTagName("span")[0].innerText = left_pokemon_atack_buff;
    document.getElementById("left_diffence_buff").getElementsByTagName("span")[0].innerText = left_pokemon_diffence_buff;
    document.getElementById("right_atack_buff").getElementsByTagName("span")[0].innerText = right_pokemon_atack_buff;
    document.getElementById("right_diffence_buff").getElementsByTagName("span")[0].innerText = right_pokemon_diffence_buff;
}

function change_pokemon(direction) {
    
    if (direction == "l") {
        left_pokemon_atack_buff = 0;
        left_pokemon_diffence_buff  = 0;
        const before = left_buttle_pokemon["buttle_pokemon"];
        if (left_pokemon_obj[before]["hp"] > 0) {
            left_change_timer = 60;
        }
        else {
            left_change_timer = Math.max(left_change_timer - 12, 0);
            right_change_timer = Math.max(right_change_timer - 12, 0);
            left_stiffen_time = 0;
            right_stiffen_time = 0;
        }
        update_change_timer();
        left_buttle_pokemon["buttle_pokemon"] = left_change_value;
        left_pokemon_obj[before]["atack"] = left_pokemon_obj[before]["stats"]["real_stats"][0];
        left_pokemon_obj[before]["diffence"] = left_pokemon_obj[before]["stats"]["real_stats"][1];
        left_pokemon_obj[left_change_value]["atack"] = left_pokemon_obj[left_change_value]["stats"]["real_stats"][0];
        left_pokemon_obj[left_change_value]["diffence"] = left_pokemon_obj[left_change_value]["stats"]["real_stats"][1];
        document.getElementById("left_atack_buff").getElementsByTagName("span")[0].innerText = left_pokemon_atack_buff;
        document.getElementById("left_diffence_buff").getElementsByTagName("span")[0].innerText = left_pokemon_diffence_buff;
        left_buttle_pokemon_name.innerText = left_pokemon_obj[left_change_value]["name"];
        left_skil1.innerText = left_pokemon_obj[left_change_value]["skil1"];
        left_skil2.innerText = left_pokemon_obj[left_change_value]["skil2"];
        left_skil3.innerText = left_pokemon_obj[left_change_value]["skil3"];
        left_buttle_pokemon_gauge.innerText = left_pokemon_obj[left_change_value]["gauge"] + "/100";
        left_buttle_pokemon_hp.innerText = left_pokemon_obj[left_change_value]["hp"] + "/" + left_pokemon_obj[left_change_value]["stats"]["real_stats"][2];
        if (left_change_id == "2") {
            left_pokemon_2_name.innerText = left_pokemon_obj[before]["name"];
            left_pokemon_2_gauge.innerText = left_pokemon_obj[before]["gauge"] + "/100";
            left_pokemon_2_hp.innerText = left_pokemon_obj[before]["hp"] + "/" + left_pokemon_obj[before]["stats"]["real_stats"][2];
        }
        if (left_change_id == "3") {
            left_pokemon_3_name.innerText = left_pokemon_obj[before]["name"];
            left_pokemon_3_gauge.innerText = left_pokemon_obj[before]["gauge"] + "/100";
            left_pokemon_3_hp.innerText = left_pokemon_obj[before]["hp"] + "/" + left_pokemon_obj[before]["stats"]["real_stats"][2];
        }
    }
    if (direction == "r") {
        right_pokemon_atack_buff = 0;
        right_pokemon_diffence_buff = 0;
        const before = right_buttle_pokemon["buttle_pokemon"];
        if (right_pokemon_obj[before]["hp"] > 0) {
            right_change_timer = 60;
        }
        else {
            left_change_timer = Math.max(left_change_timer - 12, 0);
            right_change_timer = Math.max(right_change_timer - 12, 0);
            left_stiffen_time = 0;
            right_stiffen_time = 0;
        }
        update_change_timer();
        right_buttle_pokemon["buttle_pokemon"] = right_change_value;
        right_pokemon_obj[before]["atack"] = right_pokemon_obj[before]["stats"]["real_stats"][0];
        right_pokemon_obj[before]["diffence"] = right_pokemon_obj[before]["stats"]["real_stats"][1];
        right_pokemon_obj[right_change_value]["atack"] = right_pokemon_obj[right_change_value]["stats"]["real_stats"][0];
        right_pokemon_obj[right_change_value]["diffence"] = right_pokemon_obj[right_change_value]["stats"]["real_stats"][1];
        document.getElementById("right_atack_buff").getElementsByTagName("span")[0].innerText = right_pokemon_atack_buff;
        document.getElementById("right_diffence_buff").getElementsByTagName("span")[0].innerText = right_pokemon_diffence_buff;
        right_buttle_pokemon_name.innerText = right_pokemon_obj[right_change_value]["name"];
        right_skil1.innerText = right_pokemon_obj[right_change_value]["skil1"];
        right_skil2.innerText = right_pokemon_obj[right_change_value]["skil2"];
        right_skil3.innerText = right_pokemon_obj[right_change_value]["skil3"];
        right_buttle_pokemon_gauge.innerText = right_pokemon_obj[right_change_value]["gauge"] + "/100";
        right_buttle_pokemon_hp.innerText = right_pokemon_obj[right_change_value]["hp"] + "/" + right_pokemon_obj[right_change_value]["stats"]["real_stats"][2];
        if (right_change_id == "2") {
            right_pokemon_2_name.innerText = right_pokemon_obj[before]["name"];
            right_pokemon_2_gauge.innerText = right_pokemon_obj[before]["gauge"] + "/100";
            right_pokemon_2_hp.innerText = right_pokemon_obj[before]["hp"] + "/" + right_pokemon_obj[before]["stats"]["real_stats"][2];
        }
        if (right_change_id == "3") {
            right_pokemon_3_name.innerText = right_pokemon_obj[before]["name"];
            right_pokemon_3_gauge.innerText = right_pokemon_obj[before]["gauge"] + "/100";
            right_pokemon_3_hp.innerText = right_pokemon_obj[before]["hp"] + "/" + right_pokemon_obj[before]["stats"]["real_stats"][2];
        }
    }
}

function stiffen_setting(direction, skil_kind) {
    const left_pokemon = left_pokemon_obj[left_buttle_pokemon["buttle_pokemon"]];
    const right_pokemon = right_pokemon_obj[right_buttle_pokemon["buttle_pokemon"]];
    if (direction == "l") {
        const normal_skil = normal_skil_obj[left_pokemon["skil1"]];
        left_stiffen_time = (skil_kind == "normal" ? normal_skil["time"] : 1);
        left_pokemon["skil_kind"] = skil_kind;
        // if (skil_kind != "normal") {
        //     right_stiffen_time = 1;
        // }
    }
    else if (direction == "r") {
        const normal_skil = normal_skil_obj[right_pokemon["skil1"]];
        right_stiffen_time = (skil_kind == "normal" ? normal_skil["time"] : 1);
        right_pokemon["skil_kind"] = skil_kind;
        // if (skil_kind != "normal") {
        //     left_stiffen_time = 1;
        // }
    }
}

function disabled_change_gauge(direction) {
    if (direction == "l") {
        const left_pokemon = left_pokemon_obj[left_buttle_pokemon["buttle_pokemon"]];
        if (left_pokemon["gauge"] >= gauge_skil_obj[left_pokemon["skil2"]]["gauge"]) {
            left_skil2.disabled = false;
        }
        else {
            left_skil2.disabled = true;
        }
        if (left_pokemon["gauge"] >= gauge_skil_obj[left_pokemon["skil3"]]["gauge"]) {
            left_skil3.disabled = false;
        }
        else {
            left_skil3.disabled = true;
        }
    }
    else if (direction == "r") {
        const right_pokemon = right_pokemon_obj[right_buttle_pokemon["buttle_pokemon"]];
        if (right_pokemon["gauge"] >= gauge_skil_obj[right_pokemon["skil2"]]["gauge"]) {
            right_skil2.disabled = false;
        }
        else {
            right_skil2.disabled = true;
        }
        if (right_pokemon["gauge"] >= gauge_skil_obj[right_pokemon["skil3"]]["gauge"]) {
            right_skil3.disabled = false;
        }
        else {
            right_skil3.disabled = true;
        }
    }
}

function disabled_change_all(direction, flag) {
    if (direction == "l") {
        left_skil1.disabled = flag;
        if (flag) {
            left_skil2.disabled = flag;
            left_skil3.disabled = flag;
        }
        else {
            disabled_change_gauge(direction);
        }
    }
    else if (direction == "r") {
        right_skil1.disabled = flag;
        if (flag) {
            right_skil2.disabled = flag;
            right_skil3.disabled = flag;
        }
        else {
            disabled_change_gauge(direction);
        }
    }
}

async function stiffen_check() {
    const left_pokemon = left_pokemon_obj[left_buttle_pokemon["buttle_pokemon"]];
    const right_pokemon = right_pokemon_obj[right_buttle_pokemon["buttle_pokemon"]];
    if (left_stiffen_time > 0 && right_stiffen_time > 0) {
        left_stiffen_time--;
        right_stiffen_time--;
        left_change_timer = Math.max(left_change_timer - 0.5, 0);
        right_change_timer = Math.max(right_change_timer - 0.5, 0);
        update_change_timer();
        right_pokemon["atack"] = right_pokemon["stats"]["real_stats"][0] * buff_list[right_pokemon_atack_buff.toString()];
        right_pokemon["diffence"] = right_pokemon["stats"]["real_stats"][1] * buff_list[right_pokemon_diffence_buff.toString()];
        if (left_stiffen_time == 0 && right_stiffen_time == 0 && left_pokemon["skil_kind"] == "change") {
            await normal_atack("l", left_pokemon["skil_kind"]);
            await normal_atack("r", right_pokemon["skil_kind"]);
        }
        else if (left_stiffen_time == 0 && right_stiffen_time == 0 && right_pokemon["skil_kind"] == "change") {
            await normal_atack("r", right_pokemon["skil_kind"]);
            await normal_atack("l", left_pokemon["skil_kind"]);
        }
        else if (left_stiffen_time == 0 && right_stiffen_time == 0 && left_pokemon["skil_kind"].slice(0, 4) == "skil" && right_pokemon["skil_kind"].slice(0, 4) == "skil") {
            if (left_pokemon["atack"] > right_pokemon["atack"]) {
                await normal_atack("l", left_pokemon["skil_kind"]);
                if (right_pokemon["hp"] > 0) await normal_atack("r", right_pokemon["skil_kind"]);
            }
            else if (left_pokemon["atack"] < right_pokemon["atack"]) {
                await normal_atack("r", right_pokemon["skil_kind"]);
                if (left_pokemon["hp"] > 0) await normal_atack("l", left_pokemon["skil_kind"]);
            }
            else {
                if (Math.random() < 0.5) {
                    await normal_atack("l", left_pokemon["skil_kind"]);
                    if (right_pokemon["hp"] > 0) await normal_atack("r", right_pokemon["skil_kind"]);
                }
                else {
                    await normal_atack("r", right_pokemon["skil_kind"]);
                    if (left_pokemon["hp"] > 0) await normal_atack("l", left_pokemon["skil_kind"]);
                }
            }
        }
        else if (left_pokemon["skil_kind"].slice(0, 4) == "skil" || right_pokemon["skil_kind"].slice(0, 4) == "skil") {
            if (left_stiffen_time == 0 && left_pokemon["skil_kind"].slice(0, 4) == "skil") {
                if (right_stiffen_time == 0) {
                    if (normal_skil_obj[right_pokemon["skil1"]]["time"] == 1) {
                        await normal_atack("l", left_pokemon["skil_kind"]);
                        await normal_atack("r", right_pokemon["skil_kind"]);
                    }
                    else {
                        await normal_atack("r", right_pokemon["skil_kind"]);
                        await normal_atack("l", left_pokemon["skil_kind"]);
                    }
                }
                else {
                    await normal_atack("l", left_pokemon["skil_kind"]);
                    await normal_atack("r", right_pokemon["skil_kind"]);
                }
                right_stiffen_time = 0;
            }
            else if (right_stiffen_time == 0 && right_pokemon["skil_kind"].slice(0, 4) == "skil") {
                if (left_stiffen_time == 0) {
                    if (normal_skil_obj[left_pokemon["skil1"]]["time"] == 1) {
                        await normal_atack("r", right_pokemon["skil_kind"]);
                        await normal_atack("l", left_pokemon["skil_kind"]);
                    }
                    else {
                        await normal_atack("l", left_pokemon["skil_kind"]);
                        await normal_atack("r", right_pokemon["skil_kind"]);
                    }
                }
                else {
                    await normal_atack("r", right_pokemon["skil_kind"]);
                    await normal_atack("l", left_pokemon["skil_kind"]);
                }
                left_stiffen_time = 0;
            }
        }
        else {
            if (left_stiffen_time == 0) {
                await normal_atack("l", left_pokemon["skil_kind"]);
            }
            if (right_stiffen_time == 0) {
                await normal_atack("r", right_pokemon["skil_kind"]);
            }
        }
        if (left_stiffen_time == 0) disabled_change_all("l", false);
        if (right_stiffen_time == 0) disabled_change_all("r", false);
        if (left_pokemon["hp"] <= 0 || right_pokemon["hp"] <= 0) {
            left_skil1.disabled = true;
            left_skil2.disabled = true;
            left_skil3.disabled = true;
            right_skil1.disabled = true;
            right_skil2.disabled = true;
            right_skil3.disabled = true;
        }
        if (now_time > 0) {
            back_turn.disabled = false;
        }
        else {
            back_turn.disabled = true;
        }
        append_All_time_status();
    }
    if (left_stiffen_time == 0){
        if (left_change_timer == 0) {
            if (left_pokemon_obj[left_pokemon_2_name.value]["hp"] > 0) left_pokemon_2_name.disabled = false;
            if (left_pokemon_obj[left_pokemon_3_name.value]["hp"] > 0) left_pokemon_3_name.disabled = false;
        }
        if (!(left_pokemon["hp"] <= 0 || right_pokemon["hp"] <= 0)) {
            disabled_change_all("l", false);
        }
    }
    if (right_stiffen_time == 0){
        if (right_change_timer == 0) {
            if (right_pokemon_obj[right_pokemon_2_name.value]["hp"] > 0) right_pokemon_2_name.disabled = false;
            if (right_pokemon_obj[right_pokemon_3_name.value]["hp"] > 0) right_pokemon_3_name.disabled = false;
        }
        if (!(left_pokemon["hp"] <= 0 || right_pokemon["hp"] <= 0)) {
            disabled_change_all("r", false);
        }
    }
    if (left_pokemon["hp"] <= 0) {
        left_skil1.disabled = true;
        left_skil2.disabled = true;
        left_skil3.disabled = true;
        right_skil1.disabled = true;
        right_skil2.disabled = true;
        right_skil3.disabled = true;
        if (left_pokemon_obj[left_pokemon_2_name.value]["hp"] > 0) left_pokemon_2_name.disabled = false;
        if (left_pokemon_obj[left_pokemon_3_name.value]["hp"] > 0) left_pokemon_3_name.disabled = false;
        right_pokemon_2_name.disabled = true;
        right_pokemon_3_name.disabled = true;
        left_dead = true;
    }
    if (right_pokemon["hp"] <= 0) {
        left_skil1.disabled = true;
        left_skil2.disabled = true;
        left_skil3.disabled = true;
        right_skil1.disabled = true;
        right_skil2.disabled = true;
        right_skil3.disabled = true;
        if (right_pokemon_obj[right_pokemon_2_name.value]["hp"] > 0) right_pokemon_2_name.disabled = false;
        if (right_pokemon_obj[right_pokemon_3_name.value]["hp"] > 0) right_pokemon_3_name.disabled = false;
        left_pokemon_2_name.disabled = true;
        left_pokemon_3_name.disabled = true;
        right_dead = true;
    }
    
}

const intervalID = setInterval(stiffen_check, 250);

for (let normal_skil_button of normal_skil_buttons) {
    normal_skil_button.addEventListener("click", function() {
        const direction = normal_skil_button.id[0];
        disabled_change_all(direction, true);
        stiffen_setting(direction, "normal");
        if (direction == "l") {
            left_pokemon_2_name.disabled = true;
            left_pokemon_3_name.disabled = true;
        }
        else if (direction == "r") {
            right_pokemon_2_name.disabled = true;
            right_pokemon_3_name.disabled = true;
        }
    })
}

for (let gauge_skil_button of gauge_skil_buttons) {
    gauge_skil_button.addEventListener("click", function() {
        const direction = gauge_skil_button.id[0];
        disabled_change_all(direction, true);
        stiffen_setting(direction, "skil" + gauge_skil_button.id.slice(-1));
        if (direction == "l") {
            left_pokemon_2_name.disabled = true;
            left_pokemon_3_name.disabled = true;
        }
        else if (direction == "r") {
            right_pokemon_2_name.disabled = true;
            right_pokemon_3_name.disabled = true;
        }
    })
}

for (let left_change_pokemon of left_change_pokemons) {
    left_change_pokemon.addEventListener("click", function() {
        stiffen_setting("l", "change");
        disabled_change_all("l", true);
        left_pokemon_2_name.disabled = true;
        left_pokemon_3_name.disabled = true;
        left_change_value = left_change_pokemon.value;
        left_change_pokemon.value = left_buttle_pokemon["buttle_pokemon"];
        left_change_id = left_change_pokemon.id.slice(-6, -5);
        if (left_dead) {
            left_stiffen_time = 0;
            right_stiffen_time = 0;
            change_pokemon("l");
            left_dead = false;
        }
    })
}

for (let right_change_pokemon of right_change_pokemons) {
    right_change_pokemon.addEventListener("click", function() {
        stiffen_setting("r", "change");
        disabled_change_all("r", true);
        right_pokemon_2_name.disabled = true;
        right_pokemon_3_name.disabled = true;
        right_change_value = right_change_pokemon.value;
        right_change_pokemon.value = right_buttle_pokemon["buttle_pokemon"];
        right_change_id = right_change_pokemon.id.slice(-6, -5);
        if (right_dead) {
            left_stiffen_time = 0;
            right_stiffen_time = 0;
            change_pokemon("r");
            right_dead = false;
        }
    })
}

back_turn.addEventListener("click", function() {
    now_time--;
    All_time_status.pop();
    while (All_time_status[now_time - 1]["left_stiffen_time"] > 0 && All_time_status[now_time - 1]["right_stiffen_time"] > 0) {
        now_time--;
        All_time_status.pop();
    }
    now_time--;
    All_time_status.pop();
    All_time_status.push(new Object());
    left_pokemon_obj = JSON.parse(JSON.stringify(All_time_status[now_time]["left_pokemon_obj"]));
    right_pokemon_obj = JSON.parse(JSON.stringify(All_time_status[now_time]["right_pokemon_obj"]));
    left_buttle_pokemon = JSON.parse(JSON.stringify(All_time_status[now_time]["left_buttle_pokemon"]));
    right_buttle_pokemon = JSON.parse(JSON.stringify(All_time_status[now_time]["right_buttle_pokemon"]));
    left_stiffen_time = All_time_status[now_time]["left_stiffen_time"];
    right_stiffen_time = All_time_status[now_time]["right_stiffen_time"];
    left_change_value = All_time_status[now_time]["left_change_value"];
    right_change_value = All_time_status[now_time]["right_change_value"];
    left_change_id = All_time_status[now_time]["left_change_id"];
    right_change_id = All_time_status[now_time]["right_change_id"];
    left_dead = All_time_status[now_time]["left_dead"];
    right_dead = All_time_status[now_time]["right_dead"];
    left_change_timer = All_time_status[now_time]["left_change_timer"];
    right_change_timer = All_time_status[now_time]["right_change_timer"];
    left_shield_times = All_time_status[now_time]["left_shield_times"];
    right_shield_times = All_time_status[now_time]["right_shield_times"];
    left_pokemon_atack_buff = All_time_status[now_time]["left_pokemon_atack_buff"];
    left_pokemon_diffence_buff = All_time_status[now_time]["left_pokemon_diffence_buff"];
    right_pokemon_atack_buff = All_time_status[now_time]["right_pokemon_atack_buff"];
    right_pokemon_diffence_buff = All_time_status[now_time]["right_pokemon_diffence_buff"];
    left_pokemon_2_name.value = All_time_status[now_time]["left_pokemon_2_button_value"];
    left_pokemon_3_name.value = All_time_status[now_time]["left_pokemon_3_button_value"];
    right_pokemon_2_name.value = All_time_status[now_time]["right_pokemon_2_button_value"];
    right_pokemon_3_name.value = All_time_status[now_time]["right_pokemon_3_button_value"];
    left_skil1.disabled = All_time_status[now_time]["left_pokemon_skil1_disabled"];
    left_skil2.disabled = All_time_status[now_time]["left_pokemon_skil2_disabled"];
    left_skil3.disabled = All_time_status[now_time]["left_pokemon_skil3_disabled"];
    left_pokemon_2_name.disabled = All_time_status[now_time]["left_pokemon_2_name_disabled"];
    left_pokemon_3_name.disabled = All_time_status[now_time]["left_pokemon_3_name_disabled"];
    right_skil1.disabled = All_time_status[now_time]["right_pokemon_skil1_disabled"];
    right_skil2.disabled = All_time_status[now_time]["right_pokemon_skil2_disabled"];
    right_skil3.disabled = All_time_status[now_time]["right_pokemon_skil3_disabled"];
    right_pokemon_2_name.disabled = All_time_status[now_time]["right_pokemon_2_name_disabled"];
    right_pokemon_3_name.disabled = All_time_status[now_time]["right_pokemon_3_name_disabled"];

    update_all_text();
    now_time++;
    if (now_time == 1) {
        back_turn.disabled = true;
    }
});
// 巻き戻し機能追加