#!/usr/bin/env python3
from urllib.request import urlopen
from email.mime.text import MIMEText
import smtplib
import json
import urllib.request

import logging

filePathLocal = "/Users/cd/Downloads"
filePathServer = "/media/ebs/ping"
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("PingLog")

handler = logging.FileHandler(filePathServer+'/ping.log')
handler.setLevel(logging.INFO)

# create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# add the handlers to the logger
logger.addHandler(handler)



logger.info("Check Dentsu TecSpread")
emailList = ["dhiraj@chalkdigital.com", "ishwardeep@chalkdigital.com", "chirag@chalkdigital.com"]
emailUser = "chalkdigitalsupport@chalkdigital.com"
emailPassword = "support@chalkdigital"
serversToCheck = ["tecspread.chalkdigital.com"]
port = 443
protocol = "https://"

def checkPortal(portalUrl):
	try:
		response = urlopen(portalUrl)
		logger.info(response.info())
	except IOError as e :
		raise
	return

def sendEmail(toList, message):
	try:
		logger.info(toList)
		logger.info(message)
		smtpObj = smtplib.SMTP('smtp.gmail.com', 587)
		smtpObj.starttls()
		smtpObj.login(emailUser, emailPassword)
		smtpObj.sendmail(emailUser, toList, message)
		logger.info ("Successfully sent email")
	except SMTPException:
		logger.info ("Error: unable to send email")
	return 1

def checkPortalAndSendEmail(portalUrl, emailList):
	try:
		checkPortal(portalUrl)
	except IOError as e:
		if hasattr(e, 'code'):
			logger.info('http error code: ')
			logger.info(e.code)
		elif hasattr(e, 'reason'):
			logger.info("can't connect to [",portalUrl,"], reason: ", e.reason)
		message  = "Server ["+portalUrl+"] is not accessible reason ["+str(e.reason)+"]"
		msg = 'Subject: {}\n\n{}'.format("Portal Not Reachable", message)
		return sendEmail(emailList, msg)
	return 0

def checkLoginAndSendEmail(loginUrl, userName, password, emailList):
	try:
		logger.info("Checking Login API")
		requestData = {"loginType":"employee", "password":password, "userName":userName, "portalName":"Dentsu", "generateToken":"true", "appname":"Dentsu"}
		params = json.dumps(requestData).encode('utf8')
		req = urllib.request.Request(loginUrl, data=params,headers={'content-type': 'application/json', "appname":"Dentsu"})
		response = urllib.request.urlopen(req)
		readResponse = response.read().decode('utf8');
		parsedResponse = json.loads(readResponse);
		if(parsedResponse["status"] != "success") :
			message  = "Server ["+loginUrl+"] is not accessible reason ["+parsedResponse["status"]+"]"
			msg = 'Subject: {}\n\n{}'.format("Login Api Failure", message)
			sendEmail(emailList, msg)
	except IOError as e:
		message  = "Server ["+loginUrl+"] is not accessible reason ["+str(e.reason)+"]"
		msg = 'Subject: {}\n\n{}'.format("Login Api Failure", message)
		sendEmail(emailList, message, "Login Api Server not reachable")
	return

for host in serversToCheck :
	
	url = protocol+host+":"+str(port)
	logger.info("Check Server url");
	logger.info(url)
	if checkPortalAndSendEmail(url, emailList) == 0 :
		checkLoginAndSendEmail(url+"/api/loginApi", "test123", "test123", emailList)


