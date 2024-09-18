#!/bin/bash

# Backend ayarları
BACKEND_PORT=5059
FRONTEND_PORT=4200

# Backend dizinine geç
cd ECommerceAPI/Presentation/ECommerceAPI.API || { echo "Backend dizini bulunamadı."; exit 1; }

# .NET Core yüklü mü kontrol et
if command -v dotnet &>/dev/null; then
    echo ".NET Core mevcut."
else
    echo ".NET Core yüklü değil. Lütfen .NET Core'u yükleyin."
    exit 1
fi

# Backend portu kullanımda mı kontrol et
BACKEND_PID=$(lsof -ti tcp:$BACKEND_PORT)

if [ ! -z "$BACKEND_PID" ]; then
    echo "Port $BACKEND_PORT, PID $BACKEND_PID tarafından kullanılıyor. Süreç sonlandırılıyor..."
    kill -9 $BACKEND_PID
    echo "PID $BACKEND_PID sonlandırıldı. Backend başlatılıyor..."
else
    echo "Port $BACKEND_PORT boş. Backend başlatılıyor..."
fi

# Projeyi derle
echo "Projeyi derliyorum..."
dotnet build

if [ $? -ne 0 ]; then
    echo "Hata: Proje derlenemedi."
    exit 1
fi

# Projeyi arka planda çalıştır
echo "Projeyi arka planda çalıştırıyorum..."
dotnet run &

if [ $? -ne 0 ]; then
    echo "Hata: Proje çalıştırılamadı."
    exit 1
fi

# Frontend dizinine geç
cd ../../../ECommerceAngularUI || { echo "Frontend dizini bulunamadı."; exit 1; }

# Node.js yüklü mü kontrol et
if command -v node &>/dev/null; then
    echo "Node.js mevcut."
else
    echo "Node.js yüklü değil. Lütfen Node.js'i yükleyin."
    exit 1
fi

# npm yüklü mü kontrol et
if command -v npm &>/dev/null; then
    echo "npm mevcut."
else
    echo "npm yüklü değil. Lütfen npm'i yükleyin."
    exit 1
fi

# Gereken paketleri yükle
echo "Gerekli paketler yükleniyor..."
npm install

if [ $? -ne 0 ]; then
    echo "Hata: Gerekli paketler yüklenemedi."
    exit 1
fi

# Frontend portu kullanımda mı kontrol et
FRONTEND_PID=$(lsof -ti tcp:$FRONTEND_PORT)

if [ ! -z "$FRONTEND_PID" ]; then
    echo "Port $FRONTEND_PORT, PID $FRONTEND_PID tarafından kullanılıyor. Süreç sonlandırılıyor..."
    kill -9 $FRONTEND_PID
    echo "PID $FRONTEND_PID sonlandırıldı. Frontend başlatılıyor..."
else
    echo "Port $FRONTEND_PORT boş. Frontend başlatılıyor..."
fi

# Frontend uygulamasını çalıştır
echo "Frontend uygulaması çalıştırılıyor..."
ng serve --port $FRONTEND_PORT &

if [ $? -ne 0 ]; then
    echo "Hata: Frontend çalıştırılamadı."
    exit 1
fi


