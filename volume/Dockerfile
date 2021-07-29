COPY . /app
WORKDIR /app
RUN npm install
run chmod 600 /app/res/key/*

RUN mv volume/shell/start.sh /home/admin
RUN mv volume/shell/stop.sh /home/admin

ENTRYPOINT /usr/sbin/sshd && mkdir -p /export/logs && cd /app && npm start && sleep 9999999d
