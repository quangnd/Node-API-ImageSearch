function Client(cx, apiKey) {
    if (!(this instanceof Client)) {
        return new Client(cx, apiKey);
    }

    this.endpoint = 'https://www.googleapis.com/customsearch/v1';
    this.cx = cx;
    this.apiKey = apiKey;
};

Client.prototype.buildUrl = function (query, offset) {
    var url = this.endpoint + '?q=' + query + '&cx=' + this.cx + '&searchType=image' + '&key=' + this.apiKey;

    if (offset) {
        url += '&start=' + offset;
    }

    return url;
};


module.exports = Client;
