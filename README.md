Nantes Devfest 2015
=======

Angular 2 Codelab: Let's develop an Angular 2 application for The DevFest 2015 Conference.

**Note:** Angular 2.0 is not production ready yet!
**Current verison:** ALPHA-45

# Your Feedback

Please take a minute and give us your feedback about Angular 2. https://docs.google.com/forms/d/1GnPT8iupzDIO0c-4EZj90DfZhGvatx9_yVgnN-0D63U/edit

# How to start

```bash
git clone https://github.com/manekinekko/devfest-2015-ng2-codelab
cd !$
npm install -g gulp bower tsd
npm install
gulp
```

# Directory Structure

```
.
├── LICENSE
├── README.md
├── __build__/
│   ├── app.js
│   ├── bootstrap.js
│   ├── components/
│   ├── data/
│   ├── fonts/
│   ├── images/
│   ├── index.html
│   ├── routes.config.js
│   ├── services/
│   ├── styles/
│   └── vendor/
├── bower.json
├── bower_components/
├── documentation/
├── fonts/
├── gulpfile.js
├── images/
├── karma.conf.js
├── package.json
├── src/
│   ├── app/
│   │   ├── app.ts
│   │   ├── bootstrap.ts
│   │   ├── components/
│   │   ├── data/
│   │   ├── index.html
│   │   ├── routes.config.ts
│   │   ├── services/
│   │   ├── styles/
│   │   ├── system.config.js
│   │   └── typings/
│   └── tsconfig.json
├── test/
├── tsd.json
├── tsd_typings/
└── typings/
```

# Running local dev server

```bash
gulp serve
```
