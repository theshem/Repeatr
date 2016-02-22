# Repeatr
A micro JavaScript library for repetitive tasks

## Example

"Talk is cheap, show me the code" — Linus Torvalds

```javascript
var job1 = Repeatr()
                .do(function() { /*...*/ })
                .every(1000)
                .start();

var job2 = Repeatr()
                .do(function() { /*...*/ })
                .do(function() { /*...*/ })
                .for(5) // times
                .every(2000) // interval
                .delay(1000) // initial delay
                .start();

job1.stop(); // stops the repetitive calls
job1.reset(); // resets the counter as if it isn't invoked

// Cheers!
```