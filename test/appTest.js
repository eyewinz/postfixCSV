const assert = require('chai').assert;
const app = require('../app');
const ERR = '#ERR';
const TestInputFile = './test/sampleinput.txt';

describe('App Test', function(){
  before(function() {
    grid = app.readInputToGrid(TestInputFile);
  });
  describe('ReadInput TestSuite', function(){
    it('App should return empty array on invalid input file', function(){
      assert.deepEqual(app.readInputToGrid('nonexistingfile.txt') , []);
    });
    it('App should return an array on valid input file', function(){
      assert.deepEqual(grid , [ [ "b1  b2 +", "2  3  *", "+" ], [ "a1" , "5", "d4" ], ["3 +", "aa2", "c12 b1  +"] ] );
    });
  });
  describe('Resolving Cell Value TestSuite', function(){
    it('Cell with just a valid postfix expression (2 3 *) should resolve to a value(6)', function(){
      assert.equal(app.resolveCellVal(grid,0,1) , 6);
    });
    it('Cell with reference to other cell(b1 b2 +) should resolve to correct value(11)', function(){
      assert.equal(app.resolveCellVal(grid,0,0) , 11);
    });
    it('Cell with invalid postfix expression (+) value should resolve to #ERR', function(){
      assert.equal(app.resolveCellVal(grid,0,2) , ERR);
    });
    it('Cell with invalid postfix expression (3 +) value should resolve to #ERR', function(){
      assert.equal(app.resolveCellVal(grid,2,0) , ERR);
    });
    it('Cell with invalid reference(aa2) only a-z cols allowed, value should resolve to #ERR', function(){
      assert.equal(app.resolveCellVal(grid,2,1) , ERR);
    });
    it('Cell with invalid reference(c12 b1 +) only 1-9 rows allowed, value should resolve to #ERR', function(){
      assert.equal(app.resolveCellVal(grid,2,2) , ERR);
    });
    it('Cell with nonexisting reference(d4) value should resolve to #ERR', function(){
      assert.equal(app.resolveCellVal(grid,1,2) , ERR);
    });
  });
  describe('Transform Grid TestSuite', function(){
    it('For a valid input file grid should transform to resolved grid', function(){
      assert.deepEqual(app.transform(TestInputFile) , [ [ 11, 6, '#ERR' ], [ 11, 5, '#ERR' ], [ '#ERR', '#ERR', '#ERR' ] ]);
    });
    it('For an invalid input file grid should transform to empty grid', function(){
      assert.deepEqual(app.transform('nonexistingfile.txt') , []);
    });
  });
});
