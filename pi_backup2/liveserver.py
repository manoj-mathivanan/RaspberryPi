#!/usr/bin/python
from subprocess import call
import socket
import sys
import RPi.GPIO as GPIO
import time



#GPIO.cleanup()
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)
GPIO.setup(7, GPIO.OUT)
GPIO.output(7,GPIO.LOW)
 
HOST = '0.0.0.0'   # Symbolic name meaning all available interfaces
PORT = 8000 # Arbitrary non-privileged port
 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket created'
 
try:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((HOST, PORT))
except socket.error , msg:
    print 'Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1]
    sys.exit()
     
print 'Socket bind complete'
 
s.listen(10)
print 'Socket now listening'
GPIO.output(7, GPIO.LOW) 
GPIO.output(12, GPIO.LOW)
#now keep talking with the client
try:
	while 1:
    #wait to accept a connection - blocking call
	    conn, addr = s.accept()
	    print 'Connected with ' + addr[0] + ':' + str(addr[1])
            str1="close"
	    str2="close all"
	    str3="on"
	    str4="off"
	    str5="one"
	    str6="two"
	    #str5=u'\xe0'	
	    #str6="of"	
            while 1:
	    	data = conn.recv(1024)
	    	reply = 'OK...' + data
	    	print data
            	value= data.find(str1)
		value2=data.find(str2)
		value3=data.find(str3)
		value4=data.find(str4)
                #value5=data.find(str5.decode('utf-8'))
		#value5=data.find(str5.encode('utf-8','ignore'))
		#value6=data.find(str6)
		value5=data.find("1")
		value7=data.find(str5)
		print value5
		value6=data.find("2")
		value8=data.find(str6)
		if value3!=-1  and( value5!=-1 or value7!=-1):
                        GPIO.output(12, GPIO.HIGH)
			print "here 1"

                if value4!=-1 and (value5!=-1 or value7!=1):
                        GPIO.output(12, GPIO.LOW)

		if value3!=-1 and (value6!=-1 or value8!=-1):
			GPIO.output(7, GPIO.HIGH)
			print "here 2"	
			
		if value4!=-1 and (value6!=-1 or value8!=-1):
                        GPIO.output(7, GPIO.LOW)


		if value2!=-1:
			conn.close()
			s.close()
			sys.exit()
	    	if value!=-1:
			conn.close()
			break
                
		if not data:
                	conn.close() 
	        	break
     
	    	conn.sendall(reply)
finally: 
	conn.close()
	s.close()
	GPIO.cleanup()
#!/usr/bin/python
from subprocess import call
import socket
import sys
import RPi.GPIO as GPIO
import time



#GPIO.cleanup()
GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)
GPIO.setup(7, GPIO.OUT)
GPIO.output(7,GPIO.LOW)
 
HOST = '0.0.0.0'   # Symbolic name meaning all available interfaces
PORT = 8000 # Arbitrary non-privileged port
 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket created'
 
try:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind((HOST, PORT))
except socket.error , msg:
    print 'Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1]
    sys.exit()
     
print 'Socket bind complete'
 
s.listen(10)
print 'Socket now listening'
GPIO.output(7, GPIO.LOW) 
GPIO.output(12, GPIO.LOW)
#now keep talking with the client
try:
	while 1:
    #wait to accept a connection - blocking call
	    conn, addr = s.accept()
	    print 'Connected with ' + addr[0] + ':' + str(addr[1])
            str1="close"
	    str2="close all"
	    str3="on"
	    str4="off"
	    str5="one"
	    str6="two"
	    #str5=u'\xe0'	
	    #str6="of"	
            while 1:
	    	data = conn.recv(1024)
	    	reply = 'OK...' + data
	    	print data
            	value= data.find(str1)
		value2=data.find(str2)
		value3=data.find(str3)
		value4=data.find(str4)
                #value5=data.find(str5.decode('utf-8'))
		#value5=data.find(str5.encode('utf-8','ignore'))
		#value6=data.find(str6)
		value5=data.find("1")
		value7=data.find(str5)
		print value5
		value6=data.find("2")
		value8=data.find(str6)
		if value3!=-1  and( value5!=-1 or value7!=-1):
                        GPIO.output(12, GPIO.HIGH)
			print "here 1"

                if value4!=-1 and (value5!=-1 or value7!=1):
                        GPIO.output(12, GPIO.LOW)

		if value3!=-1 and (value6!=-1 or value8!=-1):
			GPIO.output(7, GPIO.HIGH)
			print "here 2"	
			
		if value4!=-1 and (value6!=-1 or value8!=-1):
                        GPIO.output(7, GPIO.LOW)


		if value2!=-1:
			conn.close()
			s.close()
			sys.exit()
	    	if value!=-1:
			conn.close()
			break
                
		if not data:
                	conn.close() 
	        	break
     
	    	conn.sendall(reply)
finally: 
	conn.close()
	s.close()
	GPIO.cleanup()

