const {format} = require('timeago.js');

const helpers = {};

helpers.timeago = (Timestamp) => {
    return format(Timestamp);
};

module.exports = helpers;