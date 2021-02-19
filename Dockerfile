FROM node:14-alpine as builder

ARG PORT

WORKDIR app

COPY . /app

RUN npm install
RUN npm install -g @angular/cli@9.0.5

RUN npm run build -- --configuration production

FROM nginx:1.16.0-alpine

COPY --from=builder /app/dist/. /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $PORT
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
