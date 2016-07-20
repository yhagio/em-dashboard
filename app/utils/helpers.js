// Count the number of customer who paid each month
export function countNumOfAMonth (paidDate, total) {
  let monthInt = parseInt(paidDate.substr(0, paidDate.indexOf('/')));

  ( monthInt === 1 ) ? total[0]++ : null;
  ( monthInt === 2 ) ? total[1]++ : null;
  ( monthInt === 3 ) ? total[2]++ : null;
  ( monthInt === 4 ) ? total[3]++ : null;
  ( monthInt === 5 ) ? total[4]++ : null;
  ( monthInt === 6 ) ? total[5]++ : null;
  ( monthInt === 7 ) ? total[6]++ : null;
  ( monthInt === 8 ) ? total[7]++ : null;
  ( monthInt === 9 ) ? total[8]++ : null;
  ( monthInt === 10 ) ? total[9]++ : null;
  ( monthInt === 11 ) ? total[10]++ : null;
  ( monthInt === 12 ) ? total[11]++ : null;

  return total;
}

// Covert CSV to JSON
export function csvJSON (csv) {
  let lines=csv.split("\n");
  let result = [];
  let headers=lines[0].split(",");
  for(let i=1;i<lines.length;i++){
    let obj = {};
    let currentline=lines[i].split(",");

    for(let j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result; //JavaScript object
}