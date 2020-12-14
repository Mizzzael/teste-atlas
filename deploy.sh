#!/usr/bin/env sh
set -e

npm run build

cd dist

git init
cp ./index.html ./404.html
git add -A
git commit -m 'deploy'
#Todo: Executar esse comando com as sus credenciais de acesso.
#git push -f git@github.com:Mizzzael/teste-atlas.git master:gh-pages

cd -