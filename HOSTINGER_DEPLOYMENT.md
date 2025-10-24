# 🚀 Hostinger Deployment Guide for Hars Jewellery

This guide will help you deploy your jewelry e-commerce website to Hostinger with automatic deployment when admin makes changes.

## 📋 Prerequisites

1. **Hostinger VPS/Cloud Hosting** account
2. **Domain name** pointing to your Hostinger server
3. **SSH access** to your Hostinger server
4. **Git repository** (GitHub, GitLab, or Bitbucket)

## 🔧 Server Setup

### 1. Connect to Your Hostinger Server

```bash
ssh your-username@your-server-ip
```

### 2. Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install git -y

# Install Nginx
sudo apt install nginx -y
```

### 3. Create Project Directory

```bash
# Create project directory
sudo mkdir -p /public_html
sudo chown -R $USER:$USER /public_html
cd /public_html

# Clone your repository
git clone https://github.com/your-username/hars-jewellery.git .
```

## 🔐 Environment Configuration

### 1. Create Environment File

```bash
nano .env
```

Add the following content:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Deployment
DEPLOY_WEBHOOK_URL="https://your-domain.com/api/webhook/deploy"
WEBHOOK_SECRET="your-webhook-secret"

# Production Environment
NODE_ENV="production"
PORT="3000"
```

### 2. Install Dependencies and Setup Database

```bash
# Install dependencies
npm ci

# Generate Prisma client
npx prisma generate

# Setup database
npx prisma db push

# Seed database (optional)
npx tsx prisma/seed.ts
```

## 🚀 Deployment Setup

### 1. Configure PM2

```bash
# Copy ecosystem config
cp ecosystem.config.js /public_html/

# Start application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### 2. Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/hars-jewellery
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/hars-jewellery /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 3. Setup SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔄 Automatic Deployment

### 1. GitHub Actions Setup

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

```
HOSTINGER_HOST: your-server-ip
HOSTINGER_USERNAME: your-username
HOSTINGER_SSH_KEY: your-ssh-private-key
HOSTINGER_PORT: 22
```

### 2. Webhook Configuration

The deployment will be triggered automatically when:
- Admin makes changes in the admin panel
- Code is pushed to main/master branch
- Manual deployment via admin panel

## 📱 Admin Panel Deployment

### 1. Deploy Button

The admin panel now includes a **"Deploy to Production"** button that:
- Triggers automatic deployment
- Shows deployment status
- Provides real-time feedback

### 2. Deployment Process

When admin clicks deploy:
1. **Webhook triggered** → `/api/webhook/deploy`
2. **Server pulls** latest code from Git
3. **Dependencies installed** → `npm ci`
4. **Database updated** → `npx prisma db push`
5. **Application built** → `npm run build`
6. **PM2 restarted** → Application updated

## 🔍 Monitoring and Logs

### 1. Check Application Status

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs hars-jewellery

# Restart application
pm2 restart hars-jewellery
```

### 2. Check Nginx Status

```bash
# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Port 3000 not accessible**
   ```bash
   # Check if application is running
   pm2 status
   # Check port
   netstat -tlnp | grep :3000
   ```

2. **Database connection issues**
   ```bash
   # Check database file
   ls -la /public_html/dev.db
   # Regenerate Prisma client
   npx prisma generate
   ```

3. **Permission issues**
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER /public_html
   chmod +x deploy.sh
   ```

## 🎯 Final Steps

1. **Test your deployment** by visiting `https://your-domain.com`
2. **Login as admin** and test the deploy button
3. **Add some products** and verify they appear on the website
4. **Test the shopping cart** functionality

## 📞 Support

If you encounter any issues:

1. Check the logs: `pm2 logs hars-jewellery`
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check Nginx configuration

Your jewelry e-commerce website is now ready for production with automatic deployment! 🎉
