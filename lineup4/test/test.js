var assert = require('assert');
var lineup4 = require('../lineup4.js')

var matrix = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
var player1 = 1;
var blank_num = 42;
var win_flag = 0;

describe('matrix test', function(){
  describe('test game functions', function(){
    it('should return correct drop positions', function(){
      assert.equal('5', lineup4.getDropPosition(matrix, 0));
    })

    it('should return can not find drop positions', function(){
      matrix = [[1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1]];
      assert.equal('-1', lineup4.getDropPosition(matrix, 0));
    })

    it('should count down the blank_num',function(){
      assert.equal('41',lineup4.blank_numCountDown(blank_num));
      blank_num = 42;
    })

    it('should set the drop values',function(){
      lineup4.setDropValue(matrix, 5, 0, player1);
      assert.equal('1',matrix[5][0]);
    })

    it('should set the drop values',function(){
      lineup4.setDropValue(matrix, 5, 1, player1);
      assert.equal('1',matrix[5][1]);
    })

    it('should return win (checkRow)',function(){
      matrix = [[1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('1',lineup4.checkRow(matrix));
    })

    it('should return win (checkColumn)',function(){
      matrix = [[1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('1',lineup4.checkColumn(matrix));
    })

    it('should return win (checkLeftToRight)',function(){
      matrix = [[0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('1',lineup4.checkLeftToRight(matrix));
    })

    it('should return win (checkRightToLeft)',function(){
      matrix = [[1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('1',lineup4.checkRightToLeft(matrix));
    })

    it('should return win (check all)',function(){
      assert.equal(true,lineup4.checkWin(matrix));
    })

    it('should return not win (checkRow)',function(){
      matrix = [[1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('0',lineup4.checkRow(matrix));
    })

    it('should return not win (checkColumn)',function(){
      matrix = [[1, 1, 1, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('0',lineup4.checkColumn(matrix));
    })

    it('should return not win (checkLeftToRight)',function(){
      matrix = [[1, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('0',lineup4.checkLeftToRight(matrix));
    })

    it('should return not win (checkRightToLeft)',function(){
      matrix = [[0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal('0',lineup4.checkRightToLeft(matrix));
    })

    it('should return not win (check all)',function(){
      matrix = [[0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
      assert.equal(false,lineup4.checkWin(matrix));
    })

    it('should reset the variable we used',function(){
      player1 = 0;
      blank_num = 0;
      win_flag = 1;
      assert.equal('1',lineup4.resetP1(player1));
      assert.equal('42',lineup4.resetBnum(blank_num));
      assert.equal('0',lineup4.resetWF(win_flag));
    })
  })
})
