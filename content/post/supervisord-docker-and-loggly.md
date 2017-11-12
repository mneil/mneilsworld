---
title: "Supervisord Docker and Loggly"
description: "Description of the post"
date: 2017-07-23T16:20:16+02:00
draft: false
---
# Supervisord, Docker, and Loggly

99% of what I need to do can be found on Stack Overflow. But, I had a hard time finding any article that explained how to put together Supervisord and Docker and pipe the logs into Loggly.

This week I had the pleasure of dealing with log aggregation from multiple docker containers. I use Docker quite often. I find that private registries make it easy to distribute images to my team, and my servers. Anything inside of a container typically “just works”. And, Docker images make it easy to both version and deploy code across multiple servers and services. Furthermore, I’ve been using supervisord for a couple years to make sure my processes stay up and that logs are generated and rotated without having to configure log rotate on each machine I deploy to. Supervisord fails to add value to logging though when using multiple containers running the same process (nodejs). Plus it’s not always convenient or possible to ssh into your server to get logs out. This is where a remote logging service like loggly, papertrail,  graylog, or fluentd come in.

## Setup Remote Logging

The first thing to do is setup your remote log server. I’m specifically going to cover loggly — because that’s what I use. But, the majority of this discussion covers any system that can accept logs from syslog. Since I’m already using Docker, and based on the post title and you reading this far I’m assuming you are too, I followed this help article from Loggly. I’ll repeat the instructions below in case that link becomes invalid.

### Run the loggly image

```
docker run -d -p 514/udp --name loggly-docker -e TOKEN=TOKEN -e TAG=Docker sendgridlabs/loggly-docker
```

Here we're exposing port 514 for udp messages to syslog. Give the container a name, and tag the container for loggly. Also important to note is that you must replace =TOKEN with a customer token from your loggly account.

### Test it out

This container makes sending messages to Loggly a snap. If you want to test it out you need to find out the host port that is mapped to 514 in the container. You can do that by inspecting the docker process with:

```
docker ps -a
```

Then run the following and replace UDP_PORT with your port #

```
echo netcat:"Host test log" | nc -u -w 1 127.0.0.1 UDP_PORT
```

You should see “Host test log” in your Loggly account.

### Link your container

How linking containers works has changed in Docker. Environment variables use to be how it was done. Now, Docker will add an entry into the hosts file based on your container name. The Loggly instructions explain the old way. I’m going to use the current, preferred, Docker way. Run your container with a link.

docker run --name nginx --link loggly-docker:loggly nginx
The above example is for the nginx image. And this is the same image the Loggly docs use. You really just need to add the –link loggly-docker:loggly part to any container you want to run and send logs to Loggly with.

If you want to test it out from the container to better understand how this will all come together do the following.

#### Exec into the container

```
docker exec -it nginx /bin/bash
```

Send the same test log to Loggly from the container

```
echo netcat:"Hello from NGINX container" | nc -u -w 1 loggly 514
```

You should see "Hello from NGINX container" in your Loggly logs.

## Update your Supervisord Config

Now that we have our logging container setup we’re ready to pipe all of our logs to it. But first, a quick disclaimer. Supervisord cannot currently send logs to a remote syslog. Because of this, we’ll have to use a plugin. I’ve chosen to use supervisor-logging because it’s the first one I found and also the only one. For now we’re not going to worry about that though. We’ll cover this in the Dockerfile updates. This was is my typical supervisord program setup

```
[program:api]
command=/node/bin/node /src/server/server.js
environment=
autostart=true
startretries=10
autorestart=true
redirect_stderr=true
stdout_logfile=syslog
stdout_logfile=/var/log/supervisor/api.log
stdout_logfile_maxbytes=5MB
stdout_logfile_backups=5
Here I’m redirecting stderr to stdout and sending all the logs to a file at /var/log/supervisr/api.log. We want to change this to send all the logs to syslog. We can do that by changing our config to this:

[program:api]
command=/node/bin/node /src/server/server.js
environment=
autostart=true
startretries=10
autorestart=true
stdout_events_enabled=true
stderr_events_enabled=true
Those last two lines are what tells supervisor to send events for stdout and stderr. We also need to add a new event section to our config.

[eventlistener:logging]
command=supervisor_logging
events=PROCESS_LOG
```

You do not need to change either of those lines under the listener. For more info on what is happening here you’ll want to refer to the supervisord docs.

## Update your Dockerfile

The Supervisord logging plugin relies on 3 environment variables being set. You can set those in your Dockerfile. I placed mine towards the bottom — just before my CMD argument.

```
ENV SYSLOG_SERVER=loggly
ENV SYSLOG_PORT=514
ENV SYSLOG_PROTO=udp
```

Remember earlier when we linked the Loggly container to our nginx container? That added an entry in our hosts file which maps “loggly” to the IP of the Loggly container. The port is 514 and the protocol is udp. We configured that when we ran the Loggly container. Linking the container also set these values in environment variables with different names in our container. However, I found it difficult to copy those values to new environment variables when starting my container. So setting the port and protocol in the Dockerfile felt reasonable since I will only ever need 1 Loggly container running and I can always make sure that 514 is available and udp is my preferred protocol for sending because it’s lightweight.

At this point you need to rebuild your image and re-run your container with the link to the Loggly container set. Now any data in your application that writes to stdout or stderr will get captured by Supervisord, sent to supervisor-logging as an event, piped to the Loggly container, and finally sent by syslog to Loggly.