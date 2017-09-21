const request = require('request');
const { send, json: getJson } = require('micro');
const cors = require('micro-cors')();

module.exports = cors( async (req, res) => {
    let json = {};
    try { json = await getJson(req) } catch (e) {}
    const { code, client_id, client_secret, redirect_uri } = json || {};

    if (!(code && client_id && client_secret && redirect_uri)) {
      send(res, 400, { success: false, error: 'Invalid Request.' });
      return;
    }

    const url = 'https://github.com/login/oauth/access_token';
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            code,
            client_id,
            client_secret,
            redirect_uri,
        }),
    };

    request(url, options, function(err, response) {
        if (err) {
            send(res, 400, { success: false, error: err });
            return;
        }

        send(res, 200, {
            success: true,
            body: JSON.parse(response.body),
        });
    });
});