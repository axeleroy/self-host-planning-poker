from peewee import Model, UUIDField, CharField, SqliteDatabase

from app import app

database = SqliteDatabase(None)


class Game(Model):
    uuid = UUIDField(primary_key=True)
    name = CharField()

    class Meta:
        database = database


if app.config['DEBUG'] or app.config['TESTING']:
    database.init(':memory:')
else:
    database.init('/app/database.db')

