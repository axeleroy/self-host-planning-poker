import errno
import os
import sys


def check_db_file_permissions():
    path = '/data/database.db'

    # Database does not exist, it's probably the first time the container is run
    if not os.path.isfile(path):
        print(f"Database file {path} does not exist, a new one will be created.\n" +
              "If it isn't the first time that container has run, make sure to have mounted a volume to `/data`.")
        return

    if not os.access(path, os.W_OK):
        print(f"ERROR: User does not have write permissions on {path}.\n" +
              "\tUpdate permissions so that it is owned and writable by 1001:0.\n" +
              "\tIf you migrated from an earlier version, run `chown 1001:0 <path_to_data_volume>/database.db` (Docker) " +
              "or `podman unshare chown 1001:0 <path_to_data_volume>/database.db` (Podman)")
        sys.exit(errno.EINTR)
