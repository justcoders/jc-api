#!/usr/bin/env bash

TAG=$1
SHA1=$2

# Push the new tested production image to a docker repository:
docker push $TAG:$SHA1

# Push the latest tag for this image:
docker tag $TAG:$SHA1 $TAG:latest
docker push $TAG:latest

# Create new Elastic Beanstalk version
EB_BUCKET=jc-api-bucket
DOCKERRUN_FILE=$SHA1-Dockerrun.aws.json
sed "s/<TAG>/$SHA1/" < Dockerrun.aws.json.template > $DOCKERRUN_FILE
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE
aws elasticbeanstalk create-application-version --application-name jc-api \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE

# Update Elastic Beanstalk environment to new version
aws elasticbeanstalk update-environment --environment-name jc-api-env \
    --version-label $SHA1