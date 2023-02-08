COPY . /app
WORKDIR /app
RUN npm install

ENTRYPOINT /usr/sbin/sshd && cd /app && npm start && sleep 9999999d
