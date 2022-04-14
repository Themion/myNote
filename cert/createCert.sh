dirpath=`dirname $0`
cd $dirpath
dirpath=`pwd`

keyName=private
pemName=public
certificateName=myNote

openssl req -x509 -sha256 -nodes -newkey rsa:2048 -keyout $keyName.key -out $pemName.pem
openssl pkcs12 -export -inkey $keyName.key -in $pemName.pem -name $certificateName -out $certificateName.p12 -caname root
cp $certificateName.p12 $dirpath/../backend/src/main/resources/
