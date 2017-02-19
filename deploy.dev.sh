#!/usr/bin/env bash

TAG=$1
SHA1=$2

push_dockerhub_image(){
    docker tag $TAG:$SHA1 $TAG:develop
    docker push $TAG:develop
}

deploy_develop(){
    echo "Stopping running application"
    ssh $DEPLOY_USER@$DEPLOY_HOST 'docker stop jc-api-develop'
    ssh $DEPLOY_USER@$DEPLOY_HOST 'docker rm jc-api-develop'

    echo "Pulling latest develop version of the code"
    ssh $DEPLOY_USER@$DEPLOY_HOST 'docker pull justcoders/jc-api:develop'

    echo "Starting the new version"
    ssh $DEPLOY_USER@$DEPLOY_HOST 'docker run -e VIRTUAL_HOST=devapi.justcoders.org --link mongodb -e MONGODB_HOST=mongodb -e RUN_ENV=develop -e MONGODB_DATABASE=justcoders -d --restart=always --name jc-api-develop justcoders/jc-api:develop'

    echo "Success!"
}

push_dockerhub_image
deploy_develop