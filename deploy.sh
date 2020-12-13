#!/usr/bin/env sh
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
#Todo: Executar esse comando com as sus credenciais de acesso.
#git push -f git@github.com:Mizzzael/teste-atlas.git master:gh-pages

cd -