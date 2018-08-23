# MMM-Chuck-Norris

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) which displays a random Chuck Norris joke from [The Internet Chuck Norris Database ](http://www.icndb.com)

## Preview

![](https://github.com/terenc3/MMM-Chuck-Norris/blob/master/screenshot.png?raw=true)

## Installation

In your terminal, go to your MagicMirror's Module folder:
```bash
cd ~/MagicMirror/modules
```

Clone this repository:
```bash
git clone https://github.com/terenc3/MMM-Chuck-Norris.git
```

Configure the module in your `config.js` file.

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-Chuck-Norris',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```

## Configuration options

| Option           | Type       | Default 		| Description
|----------------- |----------- |-------------- | ---------------
| `url`        	   | `string`	| `http://api.icndb.com/jokes/random` | Address to fetch jokes from. See http://www.icndb.com/api/ for mor options.
| `updateInterval` | `number`	| `60000`		|  
| `retryDelay` 	   | `number`	| `5000`		|  
| `maxWidth`       | `string`   | `200px`       | Max width of the module
| `header`         | `boolean|string` | `false` | Control the header line. *Values:* `true`, `false` or `Custom text`
| `headerClasses`  | `string`   | `small light` | CSS classes applied to the header, if any
| `textClasses`    | `string`   | `small light` | CSS classes applied to the joke