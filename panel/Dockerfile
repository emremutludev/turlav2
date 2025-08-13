# 1. Build aşaması
FROM node:20.12.2 as builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# 2. Nginx aşaması
FROM nginx:alpine

# Build edilmiş dosyaları nginx'in servis klasörüne kopyala
COPY --from=builder /app/dist /usr/share/nginx/html

# Özel nginx config'in varsa:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5227

CMD ["nginx", "-g", "daemon off;"]
