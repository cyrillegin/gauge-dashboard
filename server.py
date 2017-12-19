
# System Imports
import os
import sys
import cherrypy

PATH = os.path.abspath(os.path.dirname(__file__))
sys.path.append(PATH)
WEBROOT = os.path.abspath(os.path.join(PATH, 'static'))


class Root(object):

    def index(self, *args, **kwargs):

        return "index.html"

    index.exposed = True


def get_cp_config():
    config = {
        '/': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': WEBROOT,
            'tools.staticdir.index': 'index.html',
            'tools.sessions.on': True
        }
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
