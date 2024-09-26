/**
 * @Author huang
 * @Date 2024-09-26
 * @File: jsonFlatten.js
 * @Description:
 */

const jsonFlatten = function(data) {

    let result = {};
    function deepTraverse(obj, path) {

        if (obj !== Object(obj)) {
            result[path] = obj;
            return;
        }

        // 数组对象，如果前缀路径保证正确，拼接上下标访问符即可
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                deepTraverse(obj[i], path + "[" + i + "]");
            }
            return;
        }

        // json对象
        for (let i in obj) {
            if (path !== "") {
                deepTraverse(obj[i], path + "." + i);
            } else {
                deepTraverse(obj[i], i);
            }
        }
    }

    if(data !== Object(data)) {
        return data;
    }

    deepTraverse(data,"");
    return result;
}

const unflatten = function(data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
        return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
        resultholder = {};
    for (var p in data) {
        var cur = resultholder,
            prop = "",
            m;
        while (m = regex.exec(p)) {
            cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
            prop = m[2] || m[1];
        }
        cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
};

let jdata = {
    "a": "a1",
    "b": {
        "b1": "b11"
    },
    "c": ["c1", "c2", "c3"],
    "d": [{
        "d1": "d2"
    }]
}
console.log('jdata  ---->  ', JSON.stringify(jdata));
const sss = `{"a":1,"b":null,"c":true,"d":{},"e":{"e1":1,"e2":[],"e3":["1"],"e4":{},"e5":{"e51":1}},"f":[],"g":[1,"xxx",true,null,[],{}],"h":[{"x":1,"y":"xxx1","z":true},{"x":2,"y":"xxx2","z":false}]}`

const r1 = jsonFlatten(JSON.parse(sss))
console.log('r1  ---->  ', r1);
const r2 = unflatten(r1)
console.log('r2  ---->  ', r2);

