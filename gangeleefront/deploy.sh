echo "Switching to branch master"

git checkout main

echo "Building app..."

 npm run build
echo "Deploying files to server..."

scp -rp -P 54 build/* ab@andrewslearning.com:/var/www/gangelee/


echo "Done!"
