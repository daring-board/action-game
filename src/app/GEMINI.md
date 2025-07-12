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
