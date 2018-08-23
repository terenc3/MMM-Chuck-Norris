/* global Module */

/* Magic Mirror
 * Module: MMM-Chuck-Norris
 *
 * By Benjamin Kahlau
 * MIT Licensed.
 */
Module.register('MMM-Chuck-Norris', {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		url: 'http://api.icndb.com/jokes/random',
		maxWidth: '400px',
		header: false,
		textClasses: 'small light',
		headerClasses: ''
	},

	requiresVersion: '2.1.0',

	start: function() {
		var self = this;

		this.loaded = false;

		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getData: function() {
		var self = this;

		var retry = true;

		var request = new XMLHttpRequest();
		request.open('GET', this.config.url, true);
		request.onreadystatechange = function() {
			if (this.readyState !== 4) {
				return;
			}

			if (this.status === 200) {
				self.processData(JSON.parse(this.response));
			} else if (this.status === 401) {
				self.updateDom(self.config.animationSpeed);
				Log.error(self.name, this.status);
				retry = false;
			} else {
				Log.error(self.name, 'Could not load data.');
			}
			if (retry) {
				self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
			}
		};
		request.send();
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== 'undefined' && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
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
			wrapper.appendChild(joke)
		}
		return wrapper;
	},

	processData: function(data) {
		var self = this;
		this.joke = data.value.joke;
		if (this.loaded === false) {
			self.updateDom(self.config.animationSpeed);
		}
		this.loaded = true;
	}
});
