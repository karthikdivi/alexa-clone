# alexa-clone
Alexa clone using Google cloud functions

## Deploying to Google cloud functions
```
gcloud beta functions deploy record --trigger-http --stage-bucket karthikdivi-functions-bucket
gcloud beta functions deploy retrive --trigger-http --stage-bucket karthikdivi-functions-bucket
gcloud beta functions deploy top --trigger-http --stage-bucket karthikdivi-functions-bucket
```
