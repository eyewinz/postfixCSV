const assert = require('chai').assert;
const postfix = require('../postfix');
const ERR = '#ERR';
const TestInputFile = './test/sampleinput.txt';

describe('PostFix Test', function(){
  describe('PostFix TestSuite', function(){
    it('A Valid postfix expression(2 3 *) should resolve to a value(6)', function(){
      assert.equal(postfix.eval('2 3 *') , 6);
    });
    it('Multiple spaces should be omitted in postfix expression ( 3   5  +) & should resolve to a value(8)', function(){
      assert.equal(postfix.eval(' 3   5  +') , 8);
    });
    it('#ERR expression should resolve to #ERR', function(){
      assert.equal(postfix.eval(ERR) , ERR);
    });
    it('If expression(7) is a number it should return same (7)', function(){
      assert.equal(postfix.eval('7') , 7);
    });
    it('Empty String or spaces should resolve to 0', function(){
      assert.equal(postfix.eval('') , 0);
      assert.equal(postfix.eval(' ') , 0);
      assert.equal(postfix.eval('  ') , 0);
    });
    it('InValid postfix expressio (+) , (2 3),  (2 +), (2 + 3), (2 3 + ), (4 5 %)) should resolve to a #ERR', function(){
      assert.equal(postfix.eval('+') , ERR);
      assert.equal(postfix.eval('2 3') , ERR);
      assert.equal(postfix.eval('2 +') , ERR);
      assert.equal(postfix.eval('2  + 3') , ERR);
      assert.equal(postfix.eval('2 3 + )') , ERR);
      assert.equal(postfix.eval('4 5 %') , ERR);
    });
    it('A Valid postfix expression should resolve to a number', function(){
      assert.isNotNaN(postfix.eval('2 3 *'));
      assert.isNotNaN(postfix.eval('2 3 + 3 /'));
      assert.isNotNaN(postfix.eval('2 3 - 5 *'));
      assert.isNotNaN(postfix.eval('2 3 + 7 - 8 *'));
    });
  });
});
