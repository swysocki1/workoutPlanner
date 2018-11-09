npm run build

# Refresh modules and remove existing zip file
rm -rf dist
mkdir dist

aws s3 sync ./dist/ s3://workoutplanner --acl public-read --delete
