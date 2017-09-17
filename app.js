const fs = require('fs');
const _ = require('lodash');
const postfix = require('./postfix');

const colNames = 'abcdefghijklmnopqrstuvwxyz';
const ERR = '#ERR';
const COL_DELIMIT = ',';
const ROW_DELIMIT = '\r\n';

module.exports = { readInputToGrid : readInputToGrid,
  transform : transform,
  resolveCellVal : resolveCellVal};

  //Takes a input file with grid with postfix values and returns resolved grid
  function transform(filename){
    var grid = readInputToGrid(filename);
    console.log('---Input---');
    console.log(grid);
    //Iterate each element in gird and resolve its value
    _.map(grid, (row,rindex)=>{
      _.map(row, (col,cindex)=>{
        if(/[a-z]/i.test(col)){
          grid[rindex][cindex] = resolveCellVal(grid,rindex,cindex);
        }else{
          grid[rindex][cindex] = postfix.eval(col);
        }
      });
    });
    console.log('---Output---');
    console.log(grid);
    return grid;
  }

  //Reads an inputfile containing CSV input and returns array (grid)
  function readInputToGrid(filename){
    try{
      var inputData = fs.readFileSync(filename, 'utf8');
      return _.map( _.split(inputData, ROW_DELIMIT) , (row)=>_.map(_.split(row, COL_DELIMIT),_.trim));
    }catch(err){
      console.log('Invalid Input File');
      return [];
    }
  }

  //Takes a cell(with reference to other cell) and returns resolved value (recursively)
  function resolveCellVal(grid,i,j){
    try{
      var cellVal = grid[i][j];
    }catch(err){
      return ERR;
    }
    if(/[a-z]/i.test(cellVal)){
      let cellArr = _.split(cellVal, /[ ]+/);
      for (let k=0;k<cellArr.length;k++){
        let item = cellArr[k];
        if(/[a-z]/i.test(item)){
          if(item.length != 2 || _.isNumber(item.charAt(0))) return ERR;
          cellArr[k] = resolveCellVal(grid,item.charAt(1)-1,colNames.indexOf(item.charAt(0)));
        }
      }
      grid[i][j]= _.join(cellArr,' ');
      return postfix.eval(grid[i][j]);
    }else{
      return postfix.eval(cellVal);
    }
  }

transform('input.txt');
