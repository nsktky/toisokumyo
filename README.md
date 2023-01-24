# toisokumyo README
サイトURL  
https://toisokumyo-cf376.web.app/

## ポートフォリオサイトの概要
to_i_soku_myoは、私が制作したCreative Codingの作品を紹介するサイトです。

## 使用技術
* npm 8.19.3
* vue 2.7.14
* vue cli 5.0.8
* vue-p5 0.8.4
* vue-router 3.6.5
* vuetify 2.6.12
* firebase 8.10.1

## 当サイトの作成理由
私は2021年12月から毎日Creative Codingを行い、作品を制作しています。  
Creative Codingとは、プログラムを用いて作品(Generative Art)を制作する活動です。  
主にJavaScriptのライブラリであるp5.jsを用いて作品を制作しており、現在までに約420作品を制作しました。  
これらの作品を紹介する場を持ちたいと思い、当サイトを作成しました。  

## コンテンツ一覧
<dl>
  <dt>Home</dt>
  <dd>Generative Artを全面に表示</dd>
  <dt>About</dt>
  <dd>プロフィールやスキルを掲載</dd>
  <dt>Work</dt>
  <dd>過去制作した作品などを掲載</dd>
</dl>

## 技術的ポイント
* vueを使用しSPAとして作成
* vuetifyを用いてサイト全体のデザインを統一
* vue-routerを使用しルーティングを実現
* Homeにはvue-p5を使用しGenerative Artを表示。各ページに切り替えてもアニメーションが継続されるよう設定
* vue-p5内でHTML側のcanvasタグを作成。canvas要素としてアニメーションを描画
* FirebaseのFirestoreおよびStorageでWorkに表示するデータを管理
* adminページを実装。ログイン機能を設計。Firebase上のルール設定で、管理者のみにwrite権限を付与
* Firebaseコンソールで操作せずにWork用のデータをアップロードできるよう、uploadページを実装
* 上記uploadページにはログイン状態でのみアクセスできるよう設定。未ログイン時はリダイレクト処理を実行するよう設計
* Firebase　Hostingでデプロイ

## 改善点
* ブログなどのコンテンツを増やしたい
* Generative Artを複数実行し、動く展示会のようにしたい
