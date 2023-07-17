#!/usr/bin/env node

const https = require('https');
const http = require('http');
const fs = require('fs');

let creators_json = fs.readFileSync('src/assets/data/creators.json');
let creators = JSON.parse(creators_json);

const links = creators.flatMap(creator => creator['links'].map(link => link[0]))

const user_agents = {
    //'default': 'https://github.com/ZetaTwo/security-creators',
    'www.udemy.com': 'curl/7.54.1',
    'ko-fi.com': 'node-fetch',
    'www.buymeacoffee.com': 'curl/7.54.1',

    'simplycyber.io': 'curl/7.54.1',
    'stokfredrik.com': 'curl/7.54.1',
    'www.cyberwarriorstudios.com': 'curl/7.54.1',

}

const default_headers = {
    headers: {
        'User-Agent': 'https://github.com/ZetaTwo/security-creators'
    }
}

const requests = links.map(link => {
    return new Promise((resolve, reject) => {
        try {
            const url = new URL(link);
            const options = {
                headers: { ...default_headers }
            };
            if (url.hostname in user_agents) {
                options['headers']['User-Agent'] = user_agents[url.hostname];
            }

            let req = (link.startsWith('https://') ? https : http).get(link, options, (res) => {
                let error = null;
                if ((res.statusCode < 200 || res.statusCode >= 400)
                    && res.statusCode != 999) { // Fuck LinkedIn
                    error = new Error('statusCode=' + res.statusCode);
                    error.res = res;
                    error.link = link;
                }

                res.on('data', () => { });
                res.on('end', () => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
            req.on('error', err => {
                err.link = link;
                return reject(err);
            })
            req.end();
        } catch (error) {
            error.link = link;
            reject(error);
        }
    })
});

const main = async () => {
    const results = await Promise.allSettled(requests);
    const errors = results.filter((result) => result.status === 'rejected');
    if (errors.length > 0) {
        errors.forEach(error => {
            console.error('Link: ' + error.reason.link + ', Error: ' + error.reason)
        });
        throw new Error("Invalid links in creators data: " + errors.length);
    }
};

main();
