FILE=lambda-workout-planner-express-server
FUNCTION=MiddlewareWorkoutPlannerExpressServer

# Refresh modules and remove existing zip file
rm -rf dist
rm -rf /tmp/$FILE.zip
mkdir dist

cp package.json dist/
cp index.js dist/
cp -r middleware dist/middleware
cp -r mongoDB dist/mongoDB

# Only include production modules
cd dist && npm install --production && cd ..

# Zip related files
cd dist && zip /tmp/$FILE \
    -r index.js \
    middleware/ \
    mongoDB/ \
    package.json \
    node_modules/ \
    && cd ..

# Deploy
export AWS_PROFILE=workoutPlanner
aws lambda update-function-code \
    --function-name $FUNCTION \
    --zip-file fileb:///tmp/$FILE.zip
