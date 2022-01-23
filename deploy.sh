#!/bin/sh
npm run build:aws
export AWS_PROFILE=veronica
aws s3 sync dist/demo s3://facturacion-frontend --delete