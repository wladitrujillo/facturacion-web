#!/bin/sh
echo "Building angular app prod version can take some minutes ..."
ng build --prod
echo "Compress ..."
tar -czvf ~/dist.tar.gz dist
echo "Sending data ..."
sftp groupmobil << EOF
lcd ~
put dist.tar.gz
bye
EOF
echo "Deploying ..."
ssh groupmobil << EOF
tar -xzvf dist.tar.gz  
cp -R dist/demo/* ~/FACTURACION_HOME/public
rm dist.tar.gz
rm -R dist
exit
EOF
echo "Cleaning build"
rm ~/dist.tar.gz
echo "Finish script."