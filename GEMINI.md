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

## 開発フロー

1.  **タスクの確認:** `docs/tasks.md`で対応するタスクとIssue番号を確認します。
2.  **ブランチの作成:** `git checkout -b feat/issue-XX-description` のように、Issue番号を含んだわかりやすい名前のブランチを作成します。
3.  **実装:** 機能の実装や修正を行います。
4.  **テストの作成と実行:**
    *   必要に応じて単体テストやE2Eテストを作成します。
    *   `npm run dev &` で開発サーバーをバックグラウンドで起動します。
    *   `npx playwright test` でテストを実行します。
    *   テストが完了したら `kill` コマンドで開発サーバーを停止します。
5.  **コミット:** `git commit -m "feat: Short description (closes #XX)"` のように、Issueを閉じるキーワードを含んだコミットメッセージでコミットします。
6.  **プルリクエストの作成:**
    *   `git push origin branch-name` でブランチをプッシュします。
    *   `gh pr create` コマンドでプルリクエストを作成し、レビューを依頼します。
7.  **GEMINI.mdの更新:** プロジェクトに変更（機能追加、構造変更、主要な依存関係の追加など）を加えた場合、GEMINI.mdファイルを積極的に更新してこれらの変更を反映させる。
8.  **mainブランチの更新:** `git checkout main` と `git pull origin main` でローカルのmainブランチを最新の状態に保ちます。
