FROM node:0.12
 
ADD package.json /tmp/
RUN cd /tmp && npm install

RUN mkdir /www && cp -a /tmp/node_modules /www

ADD . /www



# Expose ports
EXPOSE 5000

