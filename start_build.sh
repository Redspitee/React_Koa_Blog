yarn build
git add .
git commit -m "update page:cv  "
git pull origin master
git push origin master
rm -rf ../server_blog/*
cp -ri server/* ../server_blog
cd ../server_blog
git checkout master
git add .
git commit -m "update page:cv"
git pull origin master
git push origin master
