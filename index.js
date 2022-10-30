import fetch from 'node-fetch';
import convert from 'xml-js';
import fs from 'fs';
// run windows -> $env:videoId='d76WWAD99Yo'; node ./index.js

const origin = 'https://youtubetranscript.com';
const referrer = (videoId) => `${origin}/?v=${videoId}`;
const getTranscriptUrl = (videoId) => `${origin}/?server_vid=${videoId}`;
const getFile = (text, videoId) => {
    const dir = './texts'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFile(`${dir}/${videoId}.txt`, text, (err) => {
        if (err) console.log(err);
        console.log('Done...');
    });
};

const videoId = process.env.videoId;

fetch(getTranscriptUrl(videoId), { headers: { 'referer': referrer(videoId) }}).then(resp => {
    resp.text().then(xml => {
        const data = convert.xml2js(xml)?.elements;
        const transcript = data.find(el => el.name === 'transcript')?.elements;
        const text = transcript.map(el => el.elements.map(el => el.text)).join(' ');
        getFile(text, videoId);
    })
});