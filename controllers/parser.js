//TODO parse the csv file into an object or array
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');



var Parser = function(inputFile) {
    var output = [];
    var input = fs.createReadStream(inputFile);
    // Create the parser
    var parser = parse({delimiter: ','});
    // Use the writable stream api
    parser.on('readable', function(){
        while(record = parser.read()){
            output.push(record);
        }
    });

    return output;
}