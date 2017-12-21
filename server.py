# System Imports
import os
import sys
import cherrypy
from api import ResourceApi

PATH = os.path.abspath(os.path.dirname(__file__))
sys.path.append(PATH)
WEBROOT = os.path.abspath(os.path.join(PATH, 'static'))


class Root(object):
    api = ResourceApi()

    def index(self, *args, **kwargs):

        return "index.html"

    index.exposed = True


def get_cp_config():
    config = {
        '/': {
            'tools.gzip.on': True,
            'tools.staticdir.on': True,
            'tools.staticdir.dir': WEBROOT,
            'tools.staticdir.index': 'index.html',
            'tools.sessions.on': True,
            'tools.expires.on': True,
            'tools.expires.secs'  : 3600 * 24 * 7 * 4
        },
        '/api': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        },
    }
    return config


def runserver(config):
    cherrypy.tree.mount(Root(), '/', config)

    cherrypy.server.socket_host = "0.0.0.0"
    cherrypy.server.socket_port = 5000
    cherrypy.engine.start()
    cherrypy.engine.block()


if __name__ == "__main__":
    runserver(get_cp_config())
else:
    application = cherrypy.Application(Root(), script_name=None, config=get_cp_config())
