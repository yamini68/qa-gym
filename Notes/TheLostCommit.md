# Git Basics — Revision Notes

Remember everything through one example: you're building a login page for your project, `qa-gym`.

## 1. Essential Git Concepts

### 1. Git

Git is a version control system. It tracks changes to your code and lets you revisit earlier committed versions.

**Example:** You can inspect the login page before you changed its description.

### 2. Repository (Repo)

A project folder tracked by Git, along with its history.

**Example:** Your `qa-gym` folder is a Git repository.

### 3. Working Directory

The files and folders you're currently working on. Changes you make to files appear here before you stage them.

### 4. Staging Area

A place where you select changes that should go into your next commit.

**Example:** You've edited `git.md`, but you're choosing which changes to save in the next commit.

### 5. Commit

A snapshot of staged changes saved in your local Git history.

**Example:** Save the login feature with the message `Add login feature`.

### 6. Branch

An independent line of development. A branch points to a commit and can move forward as you make new commits.

**Example:** `main` contains the main work; `practice/conflict` lets you make a separate change.

### 7. Merge

Combines the histories of two branches.

**Example:** Bring the changes from `practice/conflict` into `main`.

### 8. Remote

A reference to a repository hosted somewhere else, such as GitHub.

**Example:** `origin` is the conventional name for your GitHub repository's remote.

---

## 2. The Most Important Git Commands

| Command | Simple meaning |
|---|---|
| `git status` | Show changed files and what's staged. |
| `git add .` | Stage changes in the current directory and its subdirectories. |
| `git commit -m "Add login feature"` | Save staged changes in local Git history. |
| `git log --oneline` | Show a short commit history. |
| `git show <id>` | Inspect a commit and its changes. |
| `git branch` | List local branches. |
| `git branch practice/conflict` | Create a branch. |
| `git switch main` | Switch to `main`. |
| `git merge practice/conflict` | Merge that branch into your current branch. |
| `git push origin main` | Upload local commits on `main` to the remote named `origin`. |
| `git reflog` | Show recent movements of `HEAD`. |

## 3. Remember the Git Workflow

1. **Edit:** Change your file.
2. **Stage:** Run `git add` to select changes.
3. **Commit:** Run `git commit` to save a snapshot locally.
4. **Push:** Run `git push` to upload commits to GitHub.

Never confuse these three:

- `git add` = Select changes.
- `git commit` = Save changes in local history.
- `git push` = Upload commits to a remote repository.

Useful habit:

```bash
git status
git add .
git status
git commit -m "Describe the change"
git push origin main
```

Review `git status` before committing to make sure you're staging the intended changes.

---

## 4. Branches and Merge Conflicts

A branch lets you work separately without immediately moving another branch forward.

### Practice example

- Change a line on `practice/conflict`.
- Change the same line differently on `main`.
- Merge `practice/conflict` into `main`.
- Git may report a merge conflict because it cannot decide which version to keep.

Conflict markers look like this:

```text
<<<<<<< HEAD
Your current branch's version
=======
Incoming branch's version
>>>>>>> practice/conflict
```

### How to resolve a conflict

1. Open the conflicted file.
2. Choose or combine the correct content.
3. Remove the conflict markers.
4. Save the file.
5. Stage the resolved file.
6. Commit the merge if Git requires you to complete the merge with a commit.

**Remember:** `HEAD` represents the current position in Git history. During a merge conflict, `HEAD` usually identifies the current branch's version, while the other section contains the incoming version.

---

## 5. Git Recovery Commands

| Command | Meaning |
|---|---|
| `git reset --hard HEAD~3` | Move the current branch back three first-parent steps and reset the working tree and index. |
| `git reflog` | Inspect recent movements of `HEAD`. |
| `git reset --hard 29db7ea` | Move the current branch to that commit and reset files to match it. |
| `git log --oneline --graph --all` | View commit history across reachable branches. |

### What is `HEAD`?

`HEAD` represents your current position in Git history, usually the commit checked out on your current branch.

### What is `HEAD~3`?

`HEAD~3` follows the first-parent path three commits backward. This matters when merge commits have multiple parents.

### What is `git reflog`?

Think of it as a diary of recent `HEAD` movements. It can help you find a commit after accidentally moving a branch backward with `git reset`.

**Important warning:** `git reset --hard` can discard uncommitted changes. Commits moved away from may remain recoverable through the reflog for a limited time, but recovery isn't guaranteed forever.

---

## 6. Git Identity vs GitHub Authentication

These are different concepts.

### Git identity

Git records the author name and email in your commits.

```bash
git config user.name
git config user.email
```

Set the identity for the current repository:

```bash
git config user.name "yamini68"
git config user.email "your-email@example.com"
```

Set the identity for all your repositories:

```bash
git config --global user.name "yamini68"
git config --global user.email "your-email@example.com"
```

- `user.name` = The name recorded as the commit author.
- `user.email` = The email recorded on the commit.

GitHub can associate commits with an account when the recorded email is linked to that account.

**Important:** These commands set commit identity. They do not log you into GitHub.

### Personal Access Token (PAT)

A personal access token is a credential used to authenticate Git operations with GitHub over HTTPS.

Typical process:

1. Create a personal access token in GitHub Settings → Developer settings.
2. Configure your Git author identity if needed.
3. Run `git push origin main`.
4. If Git requests HTTPS credentials, use your GitHub username and the token as the password.

A classic token generally needs the `repo` scope for private repository access. Public repository access may use the narrower `public_repo` scope.

Never share your token or commit it into your repository.

### What happens when you have multiple GitHub accounts?

Changing `user.name` and `user.email` alone does not switch the authenticated GitHub account.

| Item | Question it answers |
|---|---|
| `user.name` | Who is recorded as the commit author? |
| `user.email` | Which email is recorded on the commit? |
| PAT or saved credentials | Which GitHub account authenticates the push? |
| `git push` | Which local commits are uploaded to the remote? |

If you receive a `403 Permission denied` error, check which GitHub account your saved credentials authenticate as and whether that account has permission to push to the repository.

---

## 7. Final Memory Map

**Git tracks history → `add` stages → `commit` saves → `log` shows history → `branch` separates work → `merge` combines work → `push` uploads → `reflog` helps recover previous positions.**

## 8. Quick Revision Questions

1. What is the difference between `git add` and `git commit`?
2. Why do we create branches?
3. What causes a merge conflict?
4. What does `HEAD` represent?
5. Why is `git reset --hard` dangerous?
6. What is the purpose of `git reflog`?
7. What is the difference between `user.name` and a GitHub token?
8. Why might `git push` fail with a `403` error?

Try answering these questions without looking at the notes. If you can explain the answers in your own words, you understand the fundamentals.


## 9. What I Learned Today — Branches, HEAD & Recovery

### 1. What is a branch pointer?
- A branch is a pointer to a commit, usually the latest commit on that branch.
- When I create a new commit, the current branch pointer moves to that new commit.
- `HEAD` tells Git which branch or commit I'm currently working on.

### 2. Does creating a branch create a new commit?
**No.** Creating a branch creates a new pointer at the current commit.

Example:
```bash
git branch practice/conflict
```
If `main` points to commit C3, the new branch also points to C3. No new commit is created.

### 3. What happens when I commit on a new branch?
```bash
git switch practice/conflict
git add .
git commit -m "Add practice notes"
```
- A new commit is created.
- `practice/conflict` moves to the new commit.
- `main` stays at its previous commit.
- The branches share their earlier history.

### 4. What are uncommitted changes?
Changes that haven't been saved in a commit.

- **Unstaged:** Edited files that haven't been added using `git add`.
- **Staged:** Changes added using `git add` but not yet committed.

Check them using:
```bash
git status
```

### 5. What does `git reflog` show?
- Records recent movements of `HEAD`.
- Helps me find earlier commits after commands like `git reset`.
- It doesn't recover commits automatically; I must select the correct commit.

```bash
git reflog
git reset --hard <commit-id>
```

**Warning:** `git reset --hard` can discard uncommitted changes and reset files to match the selected commit.

### Remember
- `git branch` → Creates a branch pointer.
- `git commit` → Creates a commit and advances the current branch.
- `git switch` → Switches the current branch.
- `git status` → Shows the state of my files.
- `git reflog` → Helps me find previous HEAD positions.
