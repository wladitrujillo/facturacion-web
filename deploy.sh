#!/bin/sh
export AWS_PROFILE=veronica
aws s3 sync dist/demo s3://facturacion-frontend --delete