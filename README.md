# postfixCSV
Tranform CSV file containing postfix expressions with internal reference to its resolved values

app.js - To read the input file and transform each cell to its resolved value
       - Convert CSV to 2D array
       - Loop throgh each element and resolve the internal references recursively to form a complete arithmetic postfic expression
       - Use postfix.js to evaluate the postfix expression and write back to the 2D array
postfix.js - Util to evaluate a give postfix expression

input.txt - sample input file

To Run, follow the steps

-> Download the project
-> 'npm update' - to download depend modules
-> 'node app.js' - to execute the program (input file is in input.txt)

To run unit test

-> 'npm test'
-> 'nyc npm test' (For coverage, before this do 'npm install nyc -g')

# Assumptions
1. Invalid file or non existing file will be considered an empty array of input

# Limitations 
(To keep the design simple, following limitations are considered, however, code can be extended)
1. Columns are limited to 26 (a-z)
2. Rows are limited to 9 (1-9)
3. Col names can only be in lowercase (a-z)
4. Interlocking references are not allowed

# Design Decisions
1. Delimiters for row and column has been parameterised in the file
