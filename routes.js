var moment = require('moment');

module.exports = function(app) {

    app.route('/')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/index.html');
        });
    app.route('/favicon.ico')
        .get(function(req, res) {
            res.send();
        });

    app.route('/:date')
        .get(function(req, res) {
            var date = req.params['date'];
            var timeUTC;
            var timeUnix;

            // if it is a number, convert it from Unix
            if (/^\d+$/.test(date)) {
                timeUTC = convertFromUnix(date);
                timeUnix = date;
            }
            else if (moment(date, ["MMMM DD, YYYY"], true).isValid()) {
                // convert to unix
                timeUnix = converToUnix(date);
                timeUTC = date;
            } else {
                // don't conver and return null
                timeUnix = null;
                timeUTC = null;
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                timeUnix: timeUnix,
                timeUtc: timeUTC
            }, null, 3)); 
        });
};

function converToUnix(arg) {
    var formatted = moment(arg).unix();
    return formatted;
}

function convertFromUnix(date) {
    var formateDay = moment.unix(date).format('LL');
    return formateDay;
}