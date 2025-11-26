# www.cyberalex.uk
www.cyberalex.uk - A new website for 2026
Copyright

## Resolving merge conflicts

If Git reports conflicts when you pull changes:

1. Run `git status` to see the files with conflicts.
2. Open each conflicted file and keep the intended code while removing the `<<<<<<<`, `=======`, and `>>>>>>>` markers.
3. Re-run any relevant checks (or load the site locally) to confirm the resolved file works as expected.
4. Stage the fixes with `git add <file>` and continue your workflow (`git commit` / `git rebase --continue` / `git merge --continue`).
5. Push the branch after all conflicts are resolved.

## Quick pull/push flow

To reduce conflicts when updating your branch against `main`:

1. Fetch the latest remote changes: `git fetch origin`.
2. Rebase your branch onto `origin/main`: `git rebase origin/main`.
3. If conflicts appear, resolve them using the steps above, then continue with `git rebase --continue`.
4. Push your branch: `git push origin <branch-name>` (use `--force-with-lease` if you rebased).

This repository is managed via branches; contributors cannot push directly to `main` without review. Opening a pull request from your branch ensures changes are reviewed and merged cleanly.
