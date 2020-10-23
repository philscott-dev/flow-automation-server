# flow-automation-server

To migrate existing data from a previous major version of PostgreSQL run:
  brew postgresql-upgrade-database

This formula has created a default database cluster with:
  initdb --locale=C -E UTF-8 /usr/local/var/postgres
For more details, read:
  https://www.postgresql.org/docs/13/app-initdb.html

To have launchd start postgresql now and restart at login:
  brew services start postgresql
Or, if you don't want/need a background service you can just run:
  pg_ctl -D /usr/local/var/postgres start

In your command-line run the command: brew install postgres

Run the command: ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents

Create two new aliases to start and stop your postgres server. They could look something like this:

     alias pg_start="launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
     alias pg_stop="launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist"
Run the alias you just created: pg_start. Use this comment to start your database service.

alternatively, pg_stop stops your database service.
Run the command: createdb `whoami`

Connect to your postgres with the command: psql

brew reinstall readline - ONLY IF NEEDED

createuser -s postgres - fixes role "postgres" does not exist

Test with psql command

$ psql
psql (10.0)
Type "help" for help.

ibraheem=# 



https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3

pg_start
pg_stop
createdb <name>
dropdb <name>
