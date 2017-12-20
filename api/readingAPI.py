import json
import random
import logging
import cherrypy


class Readings:
    logging.basicConfig(format='%(levelname)s:%(asctime)s %(message)s', level=logging.INFO)

    exposed = True
    def GET(self, **kwargs):

        data = json.load(open('gauge_config.json'))



        return json.dumps(data)

    # TODO: cherrypy.request.methods_with_bodies = True
    # We could then put this in the GET request.
    def POST(self, **kwargs):
        logging.info('GET request to Reading')
        cherrypy.response.headers['Content-Type'] = 'application/json'
        status_code = "200"

        data = json.loads(cherrypy.request.body.read())
        toReturn = []
        for i in data:
            toReturn.append({
                'id': i,
                'newReading': random.uniform(0, 10)
            })
        return json.dumps({"readings": toReturn})
