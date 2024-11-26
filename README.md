# board game client template
- This is a template repository for creating online board game client with Vite, React, three.js, React-three-fiber and tailwind css.
- This project has implemented my original board game "undo ando".
  - You can read the rule([JP](https://mfqwkmr4.notion.site/undo-ando-13b1123f22e180b389d8d5c3b231fe87))([EN](https://mfqwkmr4.notion.site/undo-ando-English-14a1123f22e180259f72dde40a216470)) and play it [here](https://bodoge-fe.pages.dev/).

## Composition
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

