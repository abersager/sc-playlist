grunt server &
SERVER=$!
SPECDIR="$( cd "$(dirname "$0")" ; pwd -P )"
phantomjs $SPECDIR/lib/phantomjs-testrunner.js "http://localhost:8000/spec/index-ci.html"
kill $SERVER