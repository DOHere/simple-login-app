const fs = require('fs');

function readFile(path, callback) {
    fs.readFile(path, 'utf8', (err, data) =>{
        if (err) {
            callback(err);
        } else{
            callback(null, data); // first argument is err
        }
    });

} 

function writeFile(path, data, callback) {
    fs.writeFile(path, data, 'utf8', err =>{
        if (err) {
            callback(err);
        } else{
            callback();
        } 
    });
} 

readFile('input.txt', (err, data) =>{
    if (err) {
        return console.log("Input error: ", err.message); // handle readFile error case and return
    }

    const newData = data.toUpperCase();
    writeFile('output2.txt', newData, (err) =>{
        if (err) {
            return console.log("Output error: ", err.message);
        }

        console.log('File written successfully');
    });
});