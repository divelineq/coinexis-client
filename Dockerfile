FROM node:20-alpine as build

WORKDIR /client
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm build

FROM nginx:stable-alpine
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

CMD ["nginx","-g", "daemon off;"]

