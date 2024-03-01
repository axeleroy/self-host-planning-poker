import errno
import os
import sys


def check_db_file_permissions():
    folder = '/data'
    path = '/data/database.db'

    try:
        os.scandir(folder)
        with open(path, 'a') as file:
            s = file.read()
    except PermissionError:
        print(f"ERROR: User does not have write permissions on {path}.\n" +
              "\tUpdate permissions so that it is owned and writable by 1001:0.\n" +
              "\tIf you migrated from an earlier version, run `chown 1001:0 -R <path_to_data_volume>` (Docker) " +
              "or `podman unshare chown 1001:0 -R <path_to_data_volume>` (Podman)")
        sys.exit(errno.EINTR)
    except IOError as e:
        if e.errno == errno.ENOENT:
            print(f"Database file {path} does not exist, a new one will be created.\n" +
                  "If it isn't the first time that container has run, make sure to have mounted a volume to `/data`.")
            return

