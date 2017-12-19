import json
import random
import logging
import cherrypy


class Readings:
    logging.basicConfig(format='%(levelname)s:%(asctime)s %(message)s', level=logging.INFO)
    exposed = True

    def GET(self, **kwargs):
        logging.info('GET request to Reading')

        cherrypy.response.headers['Content-Type'] = 'application/json'

        newReading = random.randrange(0, 10)
        print(newReading)

        return json.dumps(newReading)
