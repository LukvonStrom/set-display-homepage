const fs = require('fs');

const {data} = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// see: https://stackoverflow.com/a/22672370
function getSortMethod(){
    var _args = Array.prototype.slice.call(arguments);
    return function(a, b){
        for(var x in _args){
            var ax = a[_args[x].substring(1)];
            var bx = b[_args[x].substring(1)];
            var cx;

            ax = typeof ax == "string" ? ax.toLowerCase() : ax / 1;
            bx = typeof bx == "string" ? bx.toLowerCase() : bx / 1;

            if(_args[x].substring(0,1) == "-"){cx = ax; ax = bx; bx = cx;}
            if(ax != bx){return ax < bx ? -1 : 1;}
        }
    }
}

fs.writeFileSync('data-sorted.json', JSON.stringify({data: data.sort(getSortMethod('+title', '+venue'))}, null, 4));
