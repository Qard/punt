
var assert = require('better-assert');
var punt = require('..');

var s = punt.bind('0.0.0.0:5000');
var c = punt.connect('0.0.0.0:5000');

describe('Client#send(buffer)', function(){
  it('should transfer the message', function(done){
    s.once('message', function(msg){
      assert('Buffer' == msg.constructor.name);
      assert('Hello' == msg.toString());
      assert(10 == this.info.size);
      done();
    });

    c.send(new Buffer('Hello'));
  })
})

describe('Client#send(string)', function(){
  it('should convert to a buffer', function(done){
    s.once('message', function(msg){
      assert('string' == typeof msg);
      assert('Hello' == msg);
      done();
    });

    c.send('Hello');
  })
})

describe('Client#send(object)', function(){
  it('should json stringify and convert to a buffer', function(done){
    s.once('message', function(msg){
      assert('object' == typeof msg);
      assert('world' == msg.hello);
      done();
    });

    c.send({ hello: 'world' });
  })
})