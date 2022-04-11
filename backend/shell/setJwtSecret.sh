plain="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fugit nulla ducimus ut dolores explicabo, odio fugiat doloribus error modi?"
VAL=$(echo $plain | base64 | tr -d '\n') yq -i '.jwt.secret = strenv(VAL)' src/main/resources/application.yml
exit 0
