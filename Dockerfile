FROM node:12-alpine

ENV APP_DIR /home/node/app

# Copy application source to $APP_DIR.
WORKDIR $APP_DIR
COPY . $APP_DIR

RUN yarn
COPY . $APP_DIR
RUN yarn build

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

# Set default docker user to node (provided by base image).
USER node

ENV NODE_ENV production

EXPOSE 5000
ENTRYPOINT ["/docker-entrypoint.sh"]
