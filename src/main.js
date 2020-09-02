// src/main.js
const worker = new Worker("../src/worker.js");

worker.onmessage = e => {
    const message = e.data;
    console.log(`[From Worker]: ${message}`);
};

const d = document.all;

let whitelist = ["id", "tagName", "className", "childNodes", "text"];
function domToObj (domEl) {

    var obj = {};
    for (let i=0; i<whitelist.length; i++) {
        if (domEl[whitelist[i]] instanceof NodeList) {
            obj[whitelist[i]] = Array.from(domEl[whitelist[i]]);
        }
        else {
            obj[whitelist[i]] = domEl[whitelist[i]];
        }
    };
    return obj;
}

function objectify(element) {
    const s = JSON.stringify(element, function (name, value) {
        if (name === "") {
            return domToObj(value);
        }
        if (Array.isArray(this)) {
            if (typeof value === "object") {
                return domToObj(value);
            }
            return value;
        }
        if (whitelist.find(x => (x === name)))
            return value;
    })
    return JSON.parse(s)
}
 

const o = objectify(document.all[0]);

worker.postMessage({
    type: 'serialize',
    document: o
});
