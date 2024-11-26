# bodoge-fe
オンラインボードゲームの画面を作る際のサンプルプロジェクト。

## 関連情報
- cloudflare pagesを使ってホストする。
- このゲームのルールはこちら。
- バックエンドのコードはこちら。

## ディレクトリ
```
bodoge-fe/
├── src/
│   ├── assets/
│   ├── component/ ... ページ配下で使用するtsx
│   ├── components/ ... shadcn/uiのtsx
│   ├── games/ ... ゲームロジックに関係のある関数/型定義
│   ├── hooks/ ... 状態管理のProviderを含むカスタムフック
│   ├── lib/ ... shadcn/uiの関数
│   ├── pages/ ... 画面に対応するtsx, レイアウト用のtsx
│   ├── routes/ ... URLと画面の対応
│   ├── types/ ... openapi.yamlから出力される型ファイル
│   └── utils/ ... ゲームロジックに関係のない関数/型定義
├── public/
├── package.json
└── README.md
```

