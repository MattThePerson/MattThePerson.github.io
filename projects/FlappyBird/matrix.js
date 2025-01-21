// let m = new Matrix(3,2);


function Matrix(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.data = Array(this.rows).fill().map( () => Array(this.cols).fill(0) );



  //copy method
  this.copy = function() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }


  //fromArray static method
  Matrix.fromArray = function(arr) {
    return new Matrix(arr.length, 1).map( (e, i) => arr[i] );
  }



  //subtract static method
  Matrix.subtract = function(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }

    // Return a new Matrix a-b
    return new Matrix(a.rows, a.cols)
      .map((_, i, j) => a.data[i][j] - b.data[i][j]);
  }



  //toArray method
  this.toArray = function() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }



  //randomize method
  this.randomize = function() {
    return this.map(e => Math.random() * 2 - 1);
  }



  //add method
  this.add = function(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
      return this.map((e, i, j) => e + n.data[i][j]);
    } else {
      return this.map(e => e + n);
    }
  }



  //transpose static method
  Matrix.transpose = function(matrix) {
    return new Matrix(matrix.cols, matrix.rows)
      .map((_, i, j) => matrix.data[j][i]);
  }



  //multiply static method
  Matrix.multiply = function(a, b) {
    // Matrix product
    if (a.cols !== b.rows) {
      console.log('Columns of A must match rows of B.')
      return;
    }

    return new Matrix(a.rows, b.cols)
      .map((e, i, j) => {
        // Dot product of values in col
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        return sum;
      });
  }




  //multiply method
  this.multiply = function(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      // hadamard product
      return this.map( (e, i, j) => e * n.data[i][j] );
    } else {
      // Scalar product
      return this.map(e => e * n);
    }
  }



  //map method
  this.map = function(func) {
    // Apply a function to every element of matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }




  //map static method
  Matrix.map = function(matrix, func) {
    // Apply a function to every element of matrix
    return new Matrix(matrix.rows, matrix.cols)
      .map((e, i, j) => func(matrix.data[i][j], i, j));
  }



  //print method
  this.print = function() {
    console.log(this.data);
    //console.table(this.data);
    return this;
  }



  //serialize method
  this.serialize = function() {
    return JSON.stringify(this);
  }



  //deserialize static method
  Matrix.deserialize = function(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Matrix;
}