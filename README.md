# ポケモンGO PvP対戦シミュレーター

## 概要
このプロジェクトは、ポケモンGOにおけるPvP対戦をシミュレートするウェブベースのアプリケーションです。HTML、CSS、JavaScriptを使用して構築されており、PvP対戦の練習や戦略を立てるために活用できます。

## 特徴
- **バトルシミュレーション**: 3対3のポケモンバトルを実際のターン制やコマンド選択によってシミュレートします。
- **カスタマイズ可能なチーム**: 右と左で二つのパーティを自由に作成可能です。
- **技の選択**: 各ポケモンに異なる技を覚えさせることができます。

## インストール
ローカルでシミュレーターを実行するには、以下の手順に従ってください：

Git clone
```sh
git clone https://github.com/takaira/PokegoSimPvP.git
cd PokegoSimPvP
```
お好みのウェブブラウザでindex.htmlファイルを開いてください

## 使い方
- **ポケモンを選択**: ドロップダウンメニューから両チームのポケモンを選びます。  
- **ポケモンの状態**: シャドウという特殊状態のポケモンにするか選べます。  
- **技を選ぶ**: 各ポケモンの覚える技を選びます。  
- **バトルを開始**: 「戦闘開始」ボタンをクリックしてバトルを開始します。  
- **技1を使う**: 硬直時間に応じた技の発動を行います。  
- **技2,3を使う**: 技の威力にかける倍率を決めて発動します。  
- **シールドを使う**: プレイヤーがシールドを所持している場合に技2,3を1ダメージにすることができ、シールドを消費します。  
- **交代をする**: ポケモン名のボタンをクリックすることで交代できます。一定時間が経過するまで次の交代は行えません。  
- **戻る**: 前回のボタン操作をキャンセルします。
