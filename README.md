# WorkoutPlanner


Dev Notes:

To run this application locally, use 'npm run start'

To run just the UI, 'ng serve'

To run just the Express Back End, node middleware/app.js

To Deploy Express Back End to AWS Lambda 'npm run deploy-express'

For Deployments to AWS, you need the node module aws-cli installed and need to create the profile 'workoutPlanner'

<b>Prod UI URL:</b> http://d6i88f4fzbxyg.cloudfront.net/
_____________________________________________________________________________________________________________________________________________________________

For Prod API, I set up 2 Environments:

<b>Production:</b> https://9t5lmz7nha.execute-api.us-east-1.amazonaws.com/prod/{Additional Path Params}

<b>Test:</b> https://9t5lmz7nha.execute-api.us-east-1.amazonaws.com/test/{Additional Path Params}


