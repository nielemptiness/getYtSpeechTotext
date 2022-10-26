import fetch from 'node-fetch';
import convert from 'xml-js';

fetch('https://youtubetranscript.com/?server_vid=d76WWAD99Yo').then(resp => {
    resp.text().then(xml => {
        var data = convert.xml2js(xml);
        var text = data.elements.find(el => el.name == 'transcript').elements.map(el => el.elements.map(el => el.text)).join(' ');
        console.log(text);
    })
    
});