import errno
import sys


def check_db_file_permissions():
    path = '/data/database.db'

    try:
        with open(path, 'w') as file:
            s = file.read()
    except IOError as e:
        if e.errno == errno.ENOENT:
            # Database does not exist, it's probably the first time the container is run
            print(f"Database file {path} does not exist, a new one will be created.\n" +
                  "If it isn't the first time that container has run, make sure to have mounted a volume to `/data`.")
            return
        if e.errno == errno.EACCES:
            print(f"ERROR: User does not have write permissions on {path}.\n" +
                  "\tUpdate permissions so that it is owned and writable by 1001:0.\n" +
                  "\tIf you migrated from an earlier version, run `chown 1001:0 <path_to_data_volume>/database.db` (Docker) " +
                  "or `podman unshare chown 1001:0 <path_to_data_volume>/database.db` (Podman)")
            sys.exit(errno.EINTR)
