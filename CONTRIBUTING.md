# 🤝 Contributing

We would ❤️ for you to contribute to AppwriteCMS and help make it better! We want contributing to AppwriteCMS to be fun, enjoyable, and educational for anyone and everyone. All contributions are welcome, including issues, new docs as well as updates and tweaks, blog posts, workshops, and more.

## 🤔 How to Start?

If you are worried or don’t know where to start, check out our next section explaining what kind of help we could use and where can you get involved. You can also submit an issue, and a maintainer can guide you!

## 📜 Code of Conduct

Help us keep AppwriteCMS open and inclusive. Please read and follow our [Code of Conduct](https://github.com/Meldiron/appwrite-cms/blob/master/CODE_OF_CONDUCT.md).

## 🚀 Submit a Pull Request

Branch naming convention is as following: `TYPE-ISSUE_ID-DESCRIPTION`, for example:

```
doc-548-update-contribution-guide
```

Where `TYPE` can be:

- **feat** - is a new feature
- **doc** - documentation only changes
- **cicd** - changes related to CI/CD system
- **fix** - a bug fix
- **refactor** - code change that neither fixes a bug nor adds a feature

Issue ID can be ommited if there isn't any issue about problem you are solving. Description should be descriptive, but short enough so person using branch after you doesn't need to write a sentence 😅

**All PRs must include a commit message with the changes description!**

For the initial start, fork the project and use git clone command to download the repository to your computer. A standard procedure for working on an issue would be to:

1. `git pull`, before creating a new branch, pull the changes from upstream. Your master needs to be up to date.

```
$ git pull
```

2. Create new branch from `master` like: `doc-548-update-contribution-guide`<br/>

```
$ git checkout -b [name_of_your_new_branch]
```

3. Work - commit - repeat ( be sure to be in your branch )

4. Push changes to GitHub

```
$ git push origin [name_of_your_new_branch]
```

5. Submit your changes for review
   If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.
6. Start a Pull Request
   Now submit the pull request and click on `Create pull request`.
7. Get a code review approval/reject
8. After approval, merge your PR
9. GitHub will automatically delete the branch after the merge is done. (they can still be restored).

## 🤖 Development setup

To set up a working **development environment**, just fork the project git repository and install the dependencies using the proper package manager.

```bash
$ yarn -D
$ yarn dev
```
