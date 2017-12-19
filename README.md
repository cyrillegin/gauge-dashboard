
### Getting Started
`npm run setup`
This command will install all node modules and python dependencies. It will also install a pre-commit hook that will run the linter.
Note: At the end of installation, npm and pip is checked for any outdated dependencies.
This should will give you a heads up to know if you need to modify the package.json or requirements.txt at all.

### Development
`npm run start`
This command will start the cherrypy server, build and watch webpack.

`npm run lint`
This will lint all all html, js, scss, and py files.

### Production
`npm run startProduction`
This command starts the cherrypy server and builds webpack using the production config.

### License
2017 Visgence Inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
