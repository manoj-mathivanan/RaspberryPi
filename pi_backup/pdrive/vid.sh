X=$1
Y=$2
X=$((X*60*1000))
Y=$((Y*1))
rm /media/MANOJ/camera/outvid.h264
raspivid --rotation 180 --nopreview -o /media/MANOJ/camera/outvid.h264 -t $X -fps $Y

