import json
import random
import logging


class Readings:
    logging.basicConfig(format='%(levelname)s:%(asctime)s %(message)s', level=logging.INFO)

    exposed = True
    def GET(self, **kwargs):
        logging.info('GET request to Reading')

        data = json.load(open('gauge_config.json'))

        newReading = {
            'newReading': random.uniform(0, 10)
        }

        return json.dumps(data)
