/* global Module */

/* Magic Mirror
 * Module: MMM-Chuck-Norris
 *
 * By Benjamin Kahlau
 * MIT Licensed.
 */
Module.register('MMM-Chuck-Norris', {
	defaults: {
		updateInterval: 60,
		url: 'http://api.icndb.com/jokes/random',
		maxWidth: '400px',
		header: false,
		textClasses: 'small light',
		headerClasses: 'module-header'
	},

	requiresVersion: '2.1.0',

	start: function() {
		this.joke = false;

		this.sendSocketNotification('JOKE_GET', {
			identifier: this.identifier,
			url: this.config.url,
			interval: this.config.updateInterval
		});
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === 'JOKE_DATA' && payload.identifier === this.identifier) {
			this.joke = payload.joke;

			this.updateDom();
		}
	},

	getTemplate: function () {
		return "MMM-Chuck-Norris.njk"
	},

	getTemplateData: function () {
		return {
			config: this.config,
			joke: this.joke
		}
	}
});
