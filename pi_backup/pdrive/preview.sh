X=$1
Y=$((X+10))
X=$((X*1000))
cd /home/pi
sudo ./tomcat7/bin/startup.sh &
sleep 3
sudo mkdir /tmp/stream
sudo LD_LIBRARY_PATH=/usr/local/lib mjpg_streamer -i "input_file.so -f /tmp/stream -n pic.jpg" -o "output_http.so -w /usr/local/www" &
sleep 3
sudo raspistill --rotation 180 --nopreview -w 320 -h 200 -q 5 -o /tmp/stream/pic.jpg -tl 33 -t $X -th 0:0:0 &
sleep $Y
cd /home/pi
sudo ./tomcat7/bin/shutdown.sh &
sleep 3
cd /home/pi/Desktop/camera

