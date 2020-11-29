# to execute Aerich Migration tools
# "migrate" to compares the current models with old models and creates SQL query commands.
# "upgrade" applies all unapplied migrations to the database.
# "downgrade" reverts the last applied migrations.
# "history" lists all applied migrations.
# "heads" lists all unapplied migrations.
# in normal case, the flow would be
# change models -> call migrate -> call upgrade -> database will be updated with new models

import sys
from subprocess import call

from Api.configs.secrets import populate_secrets

if __name__ == "__main__":
    populate_secrets()
    call(["aerich", sys.argv[1]])
