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
				return self.sendMessage('JOKE_ERROR', identifier, {
					error: error.message
				});
			}

			var joke = JSON.parse(body).value.joke;

			self.instances[identifier] = joke;

			self.sendMessage('JOKE_DATA', identifier, {
				joke: joke
			});

			setTimeout(function() {
				self.getJoke(identifier, url, interval);
			}, interval * 1000);
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === 'JOKE_GET') {
			if (this.instances[payload.identifier] && typeof this.instances[payload.identifier] === 'string') {
				return this.sendMessage('JOKE_DATA', payload.identifier, {
					joke: this.instances[payload.identifier]
				});
			}
			this.instances[payload.identifier] = true;

			this.getJoke(payload.identifier, payload.url, payload.interval, this.done);
		}
	},

	sendMessage: function (message, identifier, payload) {
		this.sendSocketNotification(message, Object.assign({}, {
			identifier: identifier
		}, payload));
	}
});
