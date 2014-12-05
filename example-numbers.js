var Minipipe = require('./index.js');

// ----

/*

To use minipipes:

- each object must have its own minipipe
- object must `minipipe.emit` with a single argument
- objects that want to receive data over the minipipe must provide a "receiver" function to its minipipe, which does not itself emit (otherwise we blow the stack).

*/

function Counter () {
  var self = this;

  this.minipipe = new Minipipe();

  var i = 0;
  setInterval(function () {
    self.minipipe.emit(i);
    i += 1;
  }, 1000);
}

// ----

function Prefixer (prefix) {
  this.prefix = prefix;
  this.minipipe = new Minipipe(this._receive.bind(this));
}

Prefixer.prototype._receive = function (data) {
  this.minipipe.emit(this.prefix + data);
};

// ----

var counter = new Counter();
var prefixer = new Prefixer('item:');

function objectify (raw) {
  var parts = raw.split(':');
  var obj = {};
  obj[parts[0]] = parts[1];
  return obj;
}

// ----

console.log('- Start with a counter that emits numbers');
console.log('- Pipe into a prefixer, that prefixes each number with a string before passing it on');
console.log('- Pipe through a function that converts this string into an object');
console.log('- Pipe to the console');

counter.minipipe
  .to(prefixer.minipipe)
  .through(objectify)
  .to(console.log);
