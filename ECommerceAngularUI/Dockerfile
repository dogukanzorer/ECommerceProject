# Angular Projesi İçin Dockerfile
FROM node:20 AS build

# Çalışma dizinini belirle
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Node.js bağımlılıklarını yükle
RUN npm install

# Uygulama kaynak kodlarını kopyala
COPY . .

# Uygulamayı prod modda derle
RUN npm run build --prod

# Nginx kullanarak derlenmiş uygulamayı sunma aşaması
FROM nginx:alpine AS final

# Angular dist klasörünü Nginx'in wwwroot klasörüne kopyala
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx sunucusunu başlat
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
