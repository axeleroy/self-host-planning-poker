"""
Database configuration module that supports multiple database backends.
Automatically detects the database type from environment variables and
creates appropriate database connections.
"""
import os
import logging

# Try to load .env file for development
try:
    from dotenv import load_dotenv
    # Look for .env file in parent directory (project root)
    env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    if os.path.exists(env_path):
        load_dotenv(env_path)
        logging.getLogger(__name__).info(f"Loaded environment from {env_path}")
except ImportError:
    # python-dotenv not installed, skip
    pass

from peewee import SqliteDatabase, PostgresqlDatabase, MySQLDatabase

logger = logging.getLogger(__name__)


def get_database():
    """
    Creates and returns a database instance based on environment variables.
    
    Environment variables:
    - DATABASE_URL: Full database URL (takes precedence over other vars)
    - DATABASE_TYPE: sqlite, postgresql, mysql
    - DATABASE_HOST: Database host
    - DATABASE_PORT: Database port
    - DATABASE_NAME: Database name
    - DATABASE_USER: Database username
    - DATABASE_PASSWORD: Database password
    - DATABASE_SSL_MODE: SSL mode for PostgreSQL (require, prefer, disable)
    
    For development, defaults to SQLite.
    """
    database_url = os.getenv('DATABASE_URL')
    
    if database_url:
        return _create_database_from_url(database_url)
    
    database_type = os.getenv('DATABASE_TYPE', 'sqlite').lower()
    
    if database_type == 'sqlite':
        return _create_sqlite_database()
    elif database_type == 'postgresql':
        return _create_postgresql_database()
    elif database_type == 'mysql':
        return _create_mysql_database()
    else:
        logger.warning(f"Unknown database type '{database_type}', falling back to SQLite")
        return _create_sqlite_database()


def _create_database_from_url(database_url):
    """Create database instance from DATABASE_URL"""
    if database_url.startswith('sqlite'):
        # Extract path from sqlite:///path or sqlite://path
        if database_url.startswith('sqlite:///'):
            db_path = database_url[10:]  # Remove 'sqlite:///'
        elif database_url.startswith('sqlite://'):
            db_path = database_url[9:]   # Remove 'sqlite://'
        else:
            db_path = database_url[7:]   # Remove 'sqlite:'
        
        logger.info(f"Using SQLite database: {db_path}")
        return SqliteDatabase(db_path)
    
    elif database_url.startswith('postgresql'):
        # PostgreSQL URL format: postgresql://user:password@host:port/dbname
        logger.info("Using PostgreSQL database from URL")
        return PostgresqlDatabase(database_url)
    
    elif database_url.startswith('mysql'):
        # MySQL URL format: mysql://user:password@host:port/dbname
        logger.info("Using MySQL database from URL")
        return MySQLDatabase(database_url)
    
    else:
        raise ValueError(f"Unsupported database URL scheme: {database_url}")


def _create_sqlite_database():
    """Create SQLite database instance"""
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    if debug_mode:
        db_path = os.getenv('DATABASE_PATH', 'database.db')
        logger.info(f"Using SQLite database (debug mode): {db_path}")
        return SqliteDatabase(db_path)
    else:
        db_path = os.getenv('DATABASE_PATH', '/data/database.db')
        logger.info(f"Using SQLite database (production mode): {db_path}")
        # Import here to avoid circular imports in tests
        from permission_check import check_db_file_permissions
        check_db_file_permissions()
        return SqliteDatabase(db_path)


def _create_postgresql_database():
    """Create PostgreSQL database instance"""
    host = os.getenv('DATABASE_HOST', 'localhost')
    port = int(os.getenv('DATABASE_PORT', '5432'))
    database = os.getenv('DATABASE_NAME', 'planning_poker')
    user = os.getenv('DATABASE_USER', 'postgres')
    password = os.getenv('DATABASE_PASSWORD', '')
    ssl_mode = os.getenv('DATABASE_SSL_MODE', 'prefer')
    
    logger.info(f"Using PostgreSQL database: {user}@{host}:{port}/{database}")
    
    connect_kwargs = {}
    if ssl_mode:
        connect_kwargs['sslmode'] = ssl_mode
    
    return PostgresqlDatabase(
        database,
        user=user,
        password=password,
        host=host,
        port=port,
        **connect_kwargs
    )


def _create_mysql_database():
    """Create MySQL database instance"""
    host = os.getenv('DATABASE_HOST', 'localhost')
    port = int(os.getenv('DATABASE_PORT', '3306'))
    database = os.getenv('DATABASE_NAME', 'planning_poker')
    user = os.getenv('DATABASE_USER', 'root')
    password = os.getenv('DATABASE_PASSWORD', '')
    charset = os.getenv('DATABASE_CHARSET', 'utf8mb4')
    
    logger.info(f"Using MySQL database: {user}@{host}:{port}/{database}")
    
    return MySQLDatabase(
        database,
        user=user,
        password=password,
        host=host,
        port=port,
        charset=charset
    )


def validate_database_connection(database):
    """
    Validates the database connection and creates tables if needed.
    Returns True if successful, False otherwise.
    """
    try:
        if database.is_closed():
            database.connect()
        
        # Test the connection with a simple query
        database.execute_sql('SELECT 1')
        logger.info("Database connection validated successfully")
        return True
        
    except Exception as e:
        logger.error(f"Database connection validation failed: {e}")
        return False


def get_database_info():
    """Returns information about the current database configuration"""
    database_type = os.getenv('DATABASE_TYPE', 'sqlite').lower()
    database_url = os.getenv('DATABASE_URL')
    
    if database_url:
        return f"Database URL: {database_url[:20]}..." if len(database_url) > 20 else database_url
    
    if database_type == 'sqlite':
        debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
        db_path = os.getenv('DATABASE_PATH', 'database.db' if debug_mode else '/data/database.db')
        return f"SQLite: {db_path}"
    
    elif database_type == 'postgresql':
        host = os.getenv('DATABASE_HOST', 'localhost')
        port = os.getenv('DATABASE_PORT', '5432')
        database = os.getenv('DATABASE_NAME', 'planning_poker')
        user = os.getenv('DATABASE_USER', 'postgres')
        return f"PostgreSQL: {user}@{host}:{port}/{database}"
    
    elif database_type == 'mysql':
        host = os.getenv('DATABASE_HOST', 'localhost')
        port = os.getenv('DATABASE_PORT', '3306')
        database = os.getenv('DATABASE_NAME', 'planning_poker')
        user = os.getenv('DATABASE_USER', 'root')
        return f"MySQL: {user}@{host}:{port}/{database}"
    
    return f"Unknown database type: {database_type}"
