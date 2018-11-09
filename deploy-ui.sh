# Refresh modules and remove existing zip file
rm -rf dist
mkdir dist

npm run build

export AWS_PROFILE=workoutPlanner
aws s3 sync ./dist/ s3://workout-planner --acl public-read --delete
