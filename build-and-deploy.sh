#!/bin/sh

npm run build
cd dist
aws s3 sync . s3://www.securitycreators.video
cd -
