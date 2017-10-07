X=$1
Y=$2
X=$((X*60*1000))
Y=$((Y*1))
rm stills.txt
rm *.jpg
rm timelapse.avi
raspistill --rotation 180 --nopreview -w 866 -h 650 -o a%07d.jpg -t $X -tl $Y
ls *.jpg > /home/pi/Desktop/camera/stills.txt
mencoder -nosound -ovc lavc -lavcopts vcodec=mpeg4:aspect=16/9:vbitrate=8000000 -vf scale=1920:1080 -o timelapse.avi -mf type=jpeg:fps=24 mf://@stills.txt
