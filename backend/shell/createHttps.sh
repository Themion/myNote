dir=`pwd`
sudo /usr/lib/jvm/java-11-openjdk-amd64/bin/keytool -genkeypair -alias $1 -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore $dir/src/main/resources/$1.p12 -validity 3650
