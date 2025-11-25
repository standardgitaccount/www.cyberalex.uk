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