# Add some features like lint staged files and conventional commits for git repo


Install `init-git-repo` in you local repo:
```sh
# npm
npm install -D @yangss/init-git-repo eslint
# pnpm
pnpm add -D @yangss/init-git-repo eslint
```
then, config your repo with:
```sh
# npm
npx init-git-repo --type [js|ts|vue]
# pnpm
pnpm exec init-git-repo --type [js|ts|vue]
```
Done.