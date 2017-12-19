import json
import random
import logging


class Readings:
    logging.basicConfig(format='%(levelname)s:%(asctime)s %(message)s', level=logging.INFO)

    exposed = True
    def GET(self, **kwargs):
        logging.info('GET request to Reading')

        newReading = {
            'newReading': random.uniform(0, 10)
        }
        print(newReading)

        return json.dumps(newReading)
