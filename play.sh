#!/bin/bash

omxplayer $1;

SERVICE="omxplayer"

# now for our infinite loop!
while true; do
        if ps ax | grep -v grep | grep $SERVICE > /dev/null
        then
        sleep 1;
else
	omxplayer $1
fi
done