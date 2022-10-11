// turf.js

import * as turf from '@turf/turf'
import collect from '@turf/collect';

const line = turf.lineString([
    [109.502991, 29.68718],
    [108.837829, 32.969237],
    [113.567871, 37.200787]
]);

const along = turf.along(line, 300, {units: 'miles'});
console.log(along)


const polygon = turf.polygon([[
    [108.09876, 37.200787],
    [106.398901, 33.648651],
    [114.972103, 33.340483],
    [113.715685, 37.845557],
    [108.09876, 37.200787]
]]);

const area = turf.area(polygon);
console.log(area)







