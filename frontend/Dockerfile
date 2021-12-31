FROM node

ENV DJREACT_TODO_FRONTEND=/home/app/frontend

# set working directory
RUN mkdir -p $DJREACT_TODO_FRONTEND
WORKDIR $DJREACT_TODO_FRONTEND

COPY package.json $DJREACT_TODO_FRONTEND

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]