/* Magic Mirror
 * Module: MMM-Chuck-Norris
 *
 * By Benjamin Kahlau
 * MIT Licensed.
 */
var node_helper = require('node_helper');
var request = require('request');

module.exports = node_helper.create({
	getJoke: function (url, interval) {
		var self = this;

		request({
			url: url,
			method: 'GET'
		}, function (error, response, body) {
			if (error) {
				console.error(error);
				return;
			}

			var data = JSON.parse(body).value;

			self.sendSocketNotification('JOKE_DATA', {
				joke: data.joke
			});

			setTimeout(function() {
				self.getJoke(url, interval);
			}, interval * 1000);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === 'JOKE_GET') {
			this.getJoke(payload.url, payload.interval, this.done);
		}
	}
});
