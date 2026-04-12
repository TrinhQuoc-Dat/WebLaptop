# 🚀 Hướng dẫn Deploy VPS — Laptop Phú Quốc

## 1️⃣ Cài PostgreSQL

```bash
# Cập nhật hệ thống
sudo apt update && sudo apt upgrade -y

# Cài PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Kiểm tra chạy chưa
sudo systemctl status postgresql
```

## 2️⃣ Tạo Database

```bash
# Vào PostgreSQL
sudo -u postgres psql

# Trong psql, chạy lần lượt:
CREATE DATABASE laptop_phuquoc;
ALTER USER postgres WITH PASSWORD 'Phuc14kute@';
ALTER ROLE postgres SET timezone TO 'Asia/Ho_Chi_Minh';
GRANT ALL PRIVILEGES ON DATABASE laptop_phuquoc TO postgres;

# Thoát psql
\q
```

> ⚠️ Thay `mat-khau-cua-ban` bằng mật khẩu thật, rồi cập nhật vào file `.env` trên VPS.

## 3️⃣ Cài Python & Chuẩn bị project

```bash
# Cài Python + pip + venv
sudo apt install python3 python3-pip python3-venv -y

# Tạo virtual environment
python3 -m venv venv
source venv/bin/activate

# Cài thư viện
pip install -r requirements.txt
```

## 4️⃣ Cấu hình .env trên VPS

```bash
nano .env
```

Nội dung:
```
SECRET_KEY=tao-key-moi-bang-lenh-ben-duoi
DEBUG=False
ALLOWED_HOSTS=157.10.52.96,sualaptopphuquoc.vn,www.sualaptopphuquoc.vn

DB_NAME=laptop_phuquoc
DB_USER=postgres
DB_PASSWORD=mat-khau-cua-ban
DB_HOST=localhost
DB_PORT=5432
```

Tạo SECRET_KEY mới:
```bash
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## 5️⃣ Chạy Django (giống máy local)

```bash
# Kích hoạt venv (nếu chưa)
source venv/bin/activate

# Tạo bảng database
python manage.py makemigrations
python manage.py migrate

# Tạo tài khoản admin
python manage.py createsuperuser

# Load dữ liệu mẫu (nếu có)
python manage.py seed_data

# Thu thập static files
python manage.py collectstatic --noinput

# Test thử chạy được không
python manage.py runserver 0.0.0.0:8000
```

> Nếu chạy `runserver` mà vào được `http://157.10.52.96:8000` là OK ✅

## 6️⃣ Copy React build vào Django

```bash
# Trên máy local: npm run build (trong web-laptop/)
# Rồi copy thư mục build lên VPS:
scp -r ./web-laptop/build/* root@157.10.52.96:/root/web-laptop-be/frontend/
```

## 7️⃣ Cài Gunicorn Service

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

Nội dung:
```ini
[Unit]
Description=Gunicorn Laptop Phu Quoc
After=network.target

[Service]
User=root
WorkingDirectory=/root/web-laptop-be
ExecStart=/root/web-laptop-be/venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8000 --workers 3

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn
```

## 8️⃣ Cài Nginx

```bash
sudo apt install nginx -y

# Copy file config
sudo cp nginx.conf /etc/nginx/sites-available/sualaptopphuquoc
sudo ln -s /etc/nginx/sites-available/sualaptopphuquoc /etc/nginx/sites-enabled/

# Xóa default (nếu có)
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Khởi động
sudo systemctl restart nginx
```

## 9️⃣ Cài SSL (HTTPS)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d sualaptopphuquoc.vn -d www.sualaptopphuquoc.vn
```

## 🔄 Khi cần cập nhật sau này

```bash
cd /root/web-laptop-be
source venv/bin/activate
git pull
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart gunicorn
```
