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

	getDom: function() {
		var wrapper = document.createElement('div');
		wrapper.style = 'max-width: ' + this.config.maxWidth + ';';
		if (this.config.header) {
			var header = document.createElement('header');
			header.className = this.config.headerClasses;
			header.innerHTML = typeof this.config.header === 'string' ? this.config.header : 'Chuck Norris';
			wrapper.appendChild(header);
		}

		if (this.joke) {
			var joke = document.createElement('div');
			joke.className = this.config.textClasses;
			joke.innerHTML = this.joke;
			wrapper.appendChild(joke);
		}
		return wrapper;
	}
});
