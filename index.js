'use strict';
const http = require('http');
const pug = require('pug');
const server = http
  .createServer((req, res) => {
　　　　console.info('Requested by ' + req.connection.remoteAddress);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    switch (req.method) {
      case 'GET':
        if (req.url === '/applicationForm/tasty-red') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: 'とまと',
              secondItem: 'すいか',
              thirdItem: 'いちご',
              fourthItem: '赤牛',
              fifthItem: '天草大王(赤鶏)',
              sixthItem: '車海老'
            })
          );
        } else if (req.url === '/applicationForm/tasty-black') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '黒豚',
              secondItem: '黒毛和牛',
              thirdItem: '黒さつま鶏',
              fourthItem: '黒酢',
              fifthItem: '黒米',
              sixthItem: 'クロマグロ'
            })
          );
        }
        res.end();
        break;
      case 'POST':
        let rawData = '';
        req.on('data', chunk => {
            rawData = rawData + chunk;
          }).on('end', () => {
            const qs = require('querystring');
            const answer = qs.parse(rawData);
            const body = answer['chiiki']+'の'+
              answer['ニックネーム'] + 'さんが、<br>'+
              answer['favorite'] + 'をお選びくださいました。<br>ありがとうございました！';
            console.info(body);
            res.write('<!DOCTYPE html><html lang="ja"><style>body{background-color:#FF9872;}</style><body><h1 align="center">' +
              body + '</h1></body></html>');
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.info('Listening on ' + port);
});
