# Two files (private key and public key) are generated
ssh-keygen -t rsa -P "" -b 2048 -m PEM -f jwtRS256.key
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub

# Print keys to one line string
echo "\n";
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}'  jwtRS256.key
echo "\n";
awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}'  jwtRS256.key.pub

# Delete two files generated
rm jwtRS256.key jwtRS256.key.pub