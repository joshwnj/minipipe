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

Minipipe.prototype.through = function (func) {
  var pipe = new Minipipe(function (data) {
    pipe.emit(func(data));
  });

  this.to(pipe);

  return pipe;
};

module.exports = Minipipe;
