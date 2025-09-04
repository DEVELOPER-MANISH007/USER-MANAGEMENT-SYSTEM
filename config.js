// Configuration file for User Management System

module.exports = {
    // Server Configuration
    PORT: process.env.PORT || 3000,
    
    // Database Configuration
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/userManagement',
    
    // Environment
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // For production deployment, set these environment variables:
    // PORT=your_port
    // MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/userManagement?retryWrites=true&w=majority
    // NODE_ENV=production
};
