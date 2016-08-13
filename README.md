[![Build Status](https://travis-ci.org/mgaebler/drawer.svg?branch=master)](https://travis-ci.org/mgaebler/drawer)

# Drawer
Draw players after a specific time period.

The following example starts a game with a duration of 5 minutes and a minimum
group size of 3.

```javascript
const Drawer = require('drawer')
dr = new Drawer(groupSize=3, duration=5)
dr.addPlayer('Jon')
```

Read [test/test.js](test/test.js) for more details.
