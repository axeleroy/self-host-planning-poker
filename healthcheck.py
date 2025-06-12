#!/usr/bin/env python3
"""
Health check script for Planning Poker application.
This script is used by Kubernetes liveness and readiness probes.
"""

import sys
import os
import logging
from urllib.request import urlopen
from urllib.error import URLError
import socket

def check_app_health(port=8000, path="/"):
    """Check if the Flask application is responding"""
    try:
        url = f"http://localhost:{port}{path}"
        response = urlopen(url, timeout=5)
        return response.status == 200
    except (URLError, socket.timeout, ConnectionError):
        return False

def check_database_health():
    """Check if database connection is working"""
    try:
        # Add the flask directory to the path
        flask_dir = os.path.join(os.path.dirname(__file__), 'flask')
        if os.path.exists(flask_dir):
            sys.path.insert(0, flask_dir)
        
        from database_config import get_database, validate_database_connection
        
        database = get_database()
        return validate_database_connection(database)
    except Exception:
        return False

def main():
    """Main health check function"""
    logging.basicConfig(level=logging.WARNING)  # Minimal logging for health checks
    
    # Parse command line arguments
    check_type = sys.argv[1] if len(sys.argv) > 1 else "app"
    
    if check_type == "app":
        # Basic application health check
        if check_app_health():
            print("OK: Application is responding")
            return 0
        else:
            print("ERROR: Application is not responding")
            return 1
    
    elif check_type == "db":
        # Database health check
        if check_database_health():
            print("OK: Database connection is working")
            return 0
        else:
            print("ERROR: Database connection failed")
            return 1
    
    elif check_type == "full":
        # Full health check
        app_ok = check_app_health()
        db_ok = check_database_health()
        
        if app_ok and db_ok:
            print("OK: Application and database are healthy")
            return 0
        else:
            issues = []
            if not app_ok:
                issues.append("Application not responding")
            if not db_ok:
                issues.append("Database connection failed")
            print(f"ERROR: {', '.join(issues)}")
            return 1
    
    else:
        print(f"Usage: {sys.argv[0]} [app|db|full]")
        print("  app  - Check if application is responding (default)")
        print("  db   - Check database connection")
        print("  full - Check both application and database")
        return 1

if __name__ == "__main__":
    sys.exit(main())
