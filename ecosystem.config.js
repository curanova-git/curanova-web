module.exports = {
  apps: [
    {
      name: "curanova-web",
      script: "npm",
      args: "start",
      cwd: "/var/www/curanova/curanova-web",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Restart if process uses more than 500MB RAM
      // Wait 5 seconds before restarting
      restart_delay: 5000,
      // Exponential backoff restart delay
      exp_backoff_restart_delay: 100,
      // Don't restart more than 10 times in 1 minute
      max_restarts: 10,
      min_uptime: "10s",
      // Kill timeout - give process time to gracefully shutdown
      kill_timeout: 5000,
      // Listen timeout - how long to wait for process to be ready
      listen_timeout: 10000,
      // Graceful shutdown
      shutdown_with_message: true,
      // Log configuration
      error_file: "/var/www/curanova/logs/error.log",
      out_file: "/var/www/curanova/logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      // Health check - restart if no response
      health_check_grace_period: 5000,
    },
  ],
};
