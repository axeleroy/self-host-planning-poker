from peewee import Model, UUIDField, CharField, Proxy

database_proxy = Proxy()


class StoredGame(Model):
    uuid = UUIDField(primary_key=True)
    name = CharField()
    deck = CharField()

    class Meta:
        database = database_proxy

