#!/bin/bash
# run "thisFile.sh url"
# check that e.g. xdotool is installed!

if [[ -z $1 ]] ; then
 echo "No URL. Call \"thisFile.sh url\""
 exit 1
fi

xdotool -v || exit
firefox -url $1 &
sleep 5

WID=`xdotool search "Mozilla Firefox" 2>/dev/null | head -1`
echo $WID
re='^[0-9]+$'
#echo Debug1
if ! [[ $WID =~ $re ]] ; then
   echo "error: Window number of firefox not found." >&2; exit 1
fi

echo "Firefox!!"
xdotool windowactivate --sync $WID
xdotool key --clearmodifiers F11;
echo "Script end"
