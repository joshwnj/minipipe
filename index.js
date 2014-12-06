function Minipipe (receiveFunc) {
  this._receiveFunc = receiveFunc;
  this._targetFunc = null;
}

Minipipe.prototype.emit = function (data) {
  if (this._targetFunc) {
    this._targetFunc(data);
  }
};

Minipipe.prototype.receive = function (data) {
  if (this._receiveFunc) {
    this._receiveFunc(data);
  }
  // if no receiver set up, pass through
  else {
    this.emit(data);
  }
};

Minipipe.prototype.to = function (targetPipe) {
  if (typeof targetPipe === 'function') {
    this._targetFunc = targetPipe;
  }

  else if (typeof targetPipe.receive === 'function') {
    this._targetFunc = targetPipe.receive.bind(targetPipe);
  }

  return targetPipe;
};

/*

  Shortcut to create a minipipe out of a function.
  The return value of the function will be the emitted value of the new pipe.

*/
Minipipe.prototype.through = function (func) {
  var pipe = new Minipipe(function (data) {
    pipe.emit(func(data));
  });

  this.to(pipe);

  return pipe;
};

/*

  Similar to `.through`, except the data will always be passed on untouched
  (So you can plug in functions that receive the data without worrying about their return value)

*/
Minipipe.prototype.peek = function (func) {
  var wrapper = function (data) {
    func(data);
    return data;
  };

  var pipe = new Minipipe(function (data) {
    pipe.emit(wrapper(data));
  });

  this.to(pipe);

  return pipe;
};

module.exports = Minipipe;
