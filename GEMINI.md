# ドメイン知識

## 技術スタック

*   **フレームワーク:** Next.js 15.3.5 (React 19)
*   **言語:** TypeScript
*   **パッケージマネージャー:** npm
*   **ビルドツール:** Next.js CLI (`next build`) / Turbopack (`next dev --turbopack`)
*   **スタイリング:** Tailwind CSS
*   **リンター:** ESLint

## 構成

*   `tsconfig.json`で`@/*`が`./src/*`へのパスエイリアスとして設定されています。
*   `postcss.config.mjs`でTailwind CSSがPostCSSのプラグインとして設定されています。
*   `eslint.config.mjs`では、Next.jsの推奨ルールセット (`next/core-web-vitals`, `next/typescript`) が適用されています。

## ディレクトリ構成

```
/home/iwasa_ma/workspace/action-game/
├───.gitignore
├───eslint.config.mjs
├───GEMINI.md
├───next.config.ts
├───package-lock.json
├───package.json
├───postcss.config.mjs
├───README.md
├───tsconfig.json
├───.git/...
├───.next/...
├───docs/
│   ├───spec.md
│   └───tasks.md
├───node_modules/...
├───public/
│   ├───file.svg
│   ├───globe.svg
│   ├───next.svg
│   ├───vercel.svg
│   └───window.svg
└───src/
    └───app/
        ├───favicon.ico
        ├───Game.tsx
        ├───globals.css
        ├───layout.tsx
        └───page.tsx
```

## `docs`ディレクトリ

*   `spec.md`: ゲームの目的、使用技術、主な機能などの仕様を記述するファイルです。
*   `tasks.md`: 実装アプローチや具体的なタスクリストを記述するファイルです。

## タスク管理

1.  **タスクの洗い出し:** `docs/tasks.md`に今後のタスクを記述します。
2.  **Issueの作成:** `docs/tasks.md`に記載されたタスクを、`gh issue create`コマンドを使用してGitHubのIssueとして登録します。
3.  **タスクとIssueの関連付け:** `docs/tasks.md`の各タスクに、対応するGitHub Issueへのリンクを追記します。