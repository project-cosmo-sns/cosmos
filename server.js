const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const hostname = 'local.cosmo-sns.com';
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};
app.prepare().then(() => {
  https
    .createServer(httpsOptions, async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error occurred handling', req.url, err);
        res.statusCode = 500;
        res.end('internal server error');
      }
    })
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://${hostname}:${port}`);
    });
});
