const fs = require('fs');

const {data} = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// see: https://stackoverflow.com/a/22672370
function getSortMethod(){
    let _args = Array.prototype.slice.call(arguments);
    return function(a, b){
        for(let x in _args){
            let ax = a[_args[x].substring(1)];
            let bx = b[_args[x].substring(1)];
            let cx;

            ax = typeof ax == "string" ? ax.toLowerCase() : ax / 1;
            bx = typeof bx == "string" ? bx.toLowerCase() : bx / 1;

            if(_args[x].substring(0,1) === "-"){cx = ax; ax = bx; bx = cx;}
            if(ax !== bx){return ax < bx ? -1 : 1;}
        }
    }
}

let sortedData = data.sort(getSortMethod('+title', '+venue'));
let uniqueData = [...new Set(sortedData.map(item => item.link))].map(link => sortedData.find(foundData => link === foundData.link));
console.log(uniqueData.length, "items divides by 3:", uniqueData.length % 3 === 0);

fs.writeFileSync('data-sorted.json', JSON.stringify({data: uniqueData}, null, 4));
