/*!
 *  Repeatr.js
 *
 *  Repeatr is a micro JavaScript library for running repetitive tasks
 *
 *  Made by @HashemQolami with care
 *  Released under MIT license
 *  @version 1.0.0
 */
/**
 *  Usage:
 *
 *  var job1 = Repeatr().do(function() {...}).every(1000).start();
 *  var job2 = Repeatr().do(function() {...}).delay(1000).every(1000).for(50).start();
 *  job2.stop();  // stops the repetitive calls
 *  job1.reset(); // resets the number of calls, renews the internal counter
 */
+function (global, undefined) {
    'use strict';

    // internal repeatr function
    var Repeatr = function () {
        return new Repeatr.init();
    };

    // initializr function
    Repeatr.init = function () {
        // reset the counter
        this.reset();
    }

    Repeatr.prototype = {
        // the counter for repetitive calls
        counter: 0,
        // the list of functions to be invoked
        fn: [],
        // number of iterations
        iteration: 1,
        // period in milliseconds
        period: 0,
        // timeout instance
        timeout: null,
        // delay time in milliseconds for initial call
        delayTime: 0,

        // counts the iterations
        count: function () {
            this.counter += 1;
            // return the current object
            return this;
        },

        // resets counter
        reset: function () {
            this.counter = 0;
            // returns the current object
            return this;
        },

        // sets a delay time for initial call
        delay: function (ms) {
            if (typeof ms === 'number') {
                this.delayTime = ms;
            }
            // returns the current object
            return this;
        },

        // adds the function to the list of functions for the current instance
        'do': function (fn) {
            // checks if the given function is valid
            if (typeof fn !== 'function') {
                throw new Error('Invalid argument: fn is not a function');
            }
            // appends the function to the list and set the fn property.
            this.fn = this.fn.concat(fn);
            // returns the current object
            return this;
        },

        // sets the number of calls
        'for': function (num) {
            if (typeof num === 'number' && num > 0) {
                this.iteration = num;
            }
            // returns the current object
            return this;
        },

        // sets the interval time in X milliseconds
        every: function (ms) {
            if (typeof ms === 'number') {
                this.period = ms;
            }
            // returns the current object
            return this;
        },

        // runs the repeatr with handlers
        start: function () {
            // declares the handler function to be invoked
            function handler() {
                // internal variable to check if function list contains invokable objects
                var invoked = false;

                // invokes the given functions, in order
                for (var i = 0, length = this.fn.length; i < length; i++) {
                    // checks if the current function is valid
                    // otherwise, ignore it
                    if (typeof this.fn[i] !== 'function') {
                        continue;
                    }

                    this.fn[i].call(this);
                    // sets the invocation state
                    invoked = true;
                }

                // terminates the handler and returns the Repeatr object
                // if none of the given functions in the list is invocable
                if (!invoked) {
                    return this;
                }

                // increases the counter for each call
                this.count();

                // invokes the function again based on the mode of repetition
                if (this.hasOwnProperty('iteration')) {
                    // if the call counter is less than requested iteration
                    // sets the timer again
                    if (this.counter < this.iteration) {
                        this.timeout = setTimeout(handler.bind(this), this.period);
                    }
                } else {
                    // sets the timer infinitely
                    this.timeout = setTimeout(handler.bind(this), this.period);
                }
            }

            // calls the handler after delayTime for initial load
            setTimeout(handler.bind(this), this.delayTime);

            // returns the current object
            return this;
        },

        // stops the job/calling the function
        stop: function () {
            clearTimeout(this.timeout);
            // return the current object
            return this;
        }
    };

    // adds a pointer for prototype object
    Repeatr.init.prototype = Repeatr.prototype;

    // exposing the Repeatr
    // adding AMD support
    if (typeof define === 'function' && define.amd) {
        define([], Repeatr);
    // for node
    } else if (typeof exports === 'object') {
        module.exports = Repeatr;
    // window
    } else {
        global.Repeatr = Repeatr;
    }
}(this);