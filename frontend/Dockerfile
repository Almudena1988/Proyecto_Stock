FROM node:24-alpine AS build

WORKDIR /home/app

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=build /home/app/dist /usr/share/nginx/html

COPY --from=build /home/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
