#!/bin/bash         

clear

echo "Build Process starting.."
for i in "$@"
do
case $i in
    -e=*|--prefix=*)
    ENV="${i#*=}"

    ;;
esac
done
value=$(<s3cred)
arrIN=(${value//:/ })

ENV=${ENV} AWS_ACCESS_KEY_ID=${arrIN[0]} AWS_SECRET_ACCESS_KEY=${arrIN[1]} node server.js