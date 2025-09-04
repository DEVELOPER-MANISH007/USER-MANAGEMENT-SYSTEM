# User Management System - Deployment Guide

## Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy the configuration from `config.js`
   - Set your MongoDB connection string
   - Set your desired port

3. **Start the Application**
   ```bash
   # For development (with nodemon)
   npm run dev
   
   # For production
   npm start
   ```

## Deployment Options

### 1. Heroku Deployment

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### 2. Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - MONGODB_URI
   - NODE_ENV=production

### 3. Railway Deployment

1. **Connect GitHub Repository**
   - Go to railway.app
   - Connect your GitHub account
   - Select your repository

2. **Set Environment Variables**
   - MONGODB_URI
   - NODE_ENV=production

3. **Deploy**
   - Railway will automatically deploy on push

### 4. Render Deployment

1. **Connect Repository**
   - Go to render.com
   - Connect your GitHub account
   - Select your repository

2. **Configure Service**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

3. **Set Environment Variables**
   - MONGODB_URI
   - NODE_ENV=production

## MongoDB Atlas Setup (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/atlas
   - Create a free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select your region

3. **Create Database User**
   - Go to Database Access
   - Add new user with read/write permissions

4. **Whitelist IP Addresses**
   - Go to Network Access
   - Add 0.0.0.0/0 for all IPs (or specific IPs)

5. **Get Connection String**
   - Go to Clusters
   - Click Connect
   - Choose "Connect your application"
   - Copy the connection string

## Environment Variables

Set these environment variables in your deployment platform:

```
PORT=3000 (or your platform's assigned port)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/userManagement?retryWrites=true&w=majority
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Application is accessible via URL
- [ ] Database connection is working
- [ ] All CRUD operations are functional
- [ ] Error handling is working
- [ ] Static files are being served correctly

## Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check MongoDB Atlas connection string
   - Verify IP whitelist settings
   - Check database user permissions

2. **Port Issues**
   - Most platforms assign ports automatically
   - Use `process.env.PORT` in your code

3. **Static Files Not Loading**
   - Ensure `public` folder is in the root directory
   - Check file paths in your views

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

## Support

For issues or questions, check:
- Application logs in your deployment platform
- MongoDB Atlas logs
- Node.js documentation
