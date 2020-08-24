#!/bin/sh

echo "Building dist"
npm run build

echo "Uploading files"
cd dist
aws s3 sync . s3://www.securitycreators.video
cd -

echo "Waiting 5 seconds before clearing cache"
sleep 5

aws cloudfront create-invalidation --distribution-id E2SNS5LT8IMGS7 --path '/*'

echo "Site published"
