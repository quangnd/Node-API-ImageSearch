module.exports = {
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    buildDateTime: function () {
        var date = new Date();
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },

    getUrl: function (req) {
        return req.protocol + '://' + req.get('host');
    },

    getAppUrl: function (req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl;
    },

    isUrlValid: function (userInput) {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null) {
            return false;
        }
        return true;
    },

    getParameterByName: function (name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
};
