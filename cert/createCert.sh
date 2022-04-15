dirpath=`dirname $0`
cd $dirpath
dirpath=`pwd`

keyName=private.pem
pemName=public.pem
certName=myNote

openssl req -x509 -sha256 -nodes -newkey rsa:2048 -keyout $keyName -out $pemName
openssl pkcs12 -export -inkey $keyName -in $pemName -name $certName -out $certName.p12 -caname root
mv $certName.p12 $dirpath/../backend/src/main/resources/
mv $keyName $dirpath/../frontend/cert/
mv $pemName $dirpath/../frontend/cert/
