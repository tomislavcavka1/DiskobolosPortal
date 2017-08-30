FROM tomcat:8.0.20-jre8
MAINTAINER Tomislav Čavka "<tomislavcavka1@gmail.com>"
COPY target/DiskobolosPortal.war /usr/local/tomcat/webapps
CMD ["catalina.sh", "run"]