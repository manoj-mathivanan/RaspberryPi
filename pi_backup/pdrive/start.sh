X=$1
Y=$2
X=$((X*60*1000))
Y=$((Y*1))
rm /media/MANOJ/camera/stills.txt
rm /media/MANOJ/camera/*.jpg
rm /media/MANOJ/camera/timelapse.avi
raspistill --rotation 180 --nopreview -w 866 -h 650 -o /media/MANOJ/camera/a%07d.jpg -t $X -tl $Y
ls /media/MANOJ/camera/*.jpg > /media/MANOJ/camera/stills.txt
cd /media/MANOJ/camera/
mencoder -nosound -ovc lavc -lavcopts vcodec=mpeg4:aspect=16/9:vbitrate=8000000 -vf scale=1920:1080 -o timelapse.avi -mf type=jpeg:fps=24 mf://@stills.txt
