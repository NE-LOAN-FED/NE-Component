var DESIRED_FRAMES = 60;
var MILLISECONDS_PER_SECOND = 1000;
var running = {};
var counter = 1;

export var Animate = {
  // requestAnimationFrame wrapper / polyfill.
  requestAnimationFrame: function () {
    var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    return function (callback) {
      requestFrame(callback);
    };
  }(),

  // Stops the given animation.
  stop: function stop(id) {
    var cleared = running[id] !== null;
    if (cleared) {
      running[id] = null;
    }
    return cleared;
  },


  // Whether the given animation is still running.
  isRunning: function isRunning(id) {
    return running[id] !== null;
  },


  // Start the animation.
  start: function start(stepCallback, verifyCallback, completedCallback, duration, easingMethod) {
    var start = Date.now();
    var lastFrame = start;
    var percent = 0;
    var dropCounter = 0;
    var id = counter++;
    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
      var newRunning = {};
      for (var usedId in running) {
        if (running.hasOwnProperty(usedId)) {
          newRunning[usedId] = true;
        }
      }
      running = newRunning;
    }

    // This is the internal step method which is called every few milliseconds
    var step = function step(virtual) {
      // Normalize virtual value
      var render = virtual !== true;
      // Get current time
      var now = Date.now();

      // Verification is executed before next animation step
      if (!running[id] || verifyCallback && !verifyCallback(id)) {
        running[id] = null;
        if (completedCallback) {
          completedCallback(DESIRED_FRAMES - dropCounter / ((now - start) / MILLISECONDS_PER_SECOND), id, false);
        }
        return;
      }

      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state constiables up-to-date with progress in time.
      if (render) {
        var droppedFrames = Math.round((now - lastFrame) / (MILLISECONDS_PER_SECOND / DESIRED_FRAMES)) - 1;
        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true);
          dropCounter++;
        }
      }

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration;
        if (percent > 1) {
          percent = 1;
        }
      }

      // Execute step callback, then...
      var value = easingMethod ? easingMethod(percent) : percent;
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null;
        if (completedCallback) {
          completedCallback(DESIRED_FRAMES - dropCounter / ((now - start) / MILLISECONDS_PER_SECOND), id, percent === 1 || duration === null);
        }
      } else if (render) {
        lastFrame = now;
        Animate.requestAnimationFrame(step);
      }
    };

    // Mark as running
    running[id] = true;
    // Init first step
    Animate.requestAnimationFrame(step);
    // Return unique animation ID
    return id;
  }
};

export function easeOutCubic(pos) {
  return Math.pow(pos - 1, 3) + 1;
}

export function easeInOutCubic(p) {
  var pos = p;
  pos /= 0.5;
  if (pos < 1) {
    return 0.5 * Math.pow(pos, 3);
  }
  return 0.5 * (Math.pow(pos - 2, 3) + 2);
}