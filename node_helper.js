/* Magic Mirror
 * Module: MMM-Chuck-Norris
 *
 * By Benjamin Kahlau
 * MIT Licensed.
 */
var node_helper = require('node_helper');
var request = require('request');

module.exports = node_helper.create({
	instances: [],

	getJoke: function (identifier, url, interval) {
		var self = this;

		request({
			url: url,
			method: 'GET'
		}, function (error, response, body) {
			if (error) {
				console.error(error);
				return;
			}

			var joke = JSON.parse(body).value.joke;

			self.instances[identifier] = joke;

			self.sendUpdate(identifier, joke);

			setTimeout(function() {
				self.getJoke(identifier, url, interval);
			}, interval * 1000);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === 'JOKE_GET') {
			if (this.instances[payload.identifier]) {
				if (typeof this.instances[payload.identifier] === 'string') {
					this.sendUpdate(payload.identifier, this.instances[payload.identifier]);
				}
				return;
			}
			this.instances[payload.identifier] = true;

			this.getJoke(payload.identifier, payload.url, payload.interval, this.done);
		}
	},

	sendUpdate: function (identifier, joke) {
		this.sendSocketNotification('JOKE_DATA', {
			identifier: identifier,
			joke: joke
		});
	}
});
