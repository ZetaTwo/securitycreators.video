#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

let creators_json = fs.readFileSync('src/assets/data/creators.json');
let creators = JSON.parse(creators_json);

const links = creators.flatMap(creator => creator['links'].map(link => link[0]))

const options = {
    headers: {
        'User-Agent': 'https://github.com/ZetaTwo/security-creators'
    }
}

const requests = links.map(link => {
    return new Promise((resolve, reject) => {
        try {
            var req = https.get(link, options, (res) => {
                if (res.statusCode < 200 || res.statusCode >= 400 && res.statusCode != 999) {
                    var err = new Error('statusCode=' + res.statusCode);
                    err.res = res;
                    err.link = link;
                    return reject(err);
                }
                if((res.statusCode >= 300 && res.statusCode < 400) || res.statusCode == 999) {
                    return resolve(res) 
                }
                res.on('data', (data) => {
                    return resolve(data)
                });
            });
            req.on('error', err => {
                err.link = link;
                return reject(err);
            })
            req.end();
        } catch(error) {
            error.link = link;
            reject(error);
        }
    })
});

Promise
    .allSettled(requests)
    .then(results => {
        const errors = results.filter((result) => result.status === 'rejected');
        if(errors.length > 0) {
            // new Error('Link: '+result.reason.link+', Error: '+result.reason)
            errors.forEach(error => {
                console.error('Link: '+error.reason.link+', Error: '+error.reason)
            });
            console.error('Number of invalid links: ' + errors.length);
            return Promise.reject("Invalid links in creators data: " + errors.length);
        }
        return Promise.resolve()
    })
