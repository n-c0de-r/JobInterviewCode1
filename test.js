// Given code

const dataAsString = [
  "1:S:Warehouse 1",
  "2:O:Order1",
  "3:P:Product1",
  //Added later to test flexibility
  "4:I:Info about Product1",
  "5:P:Product2",
  "6:O:Order2",
  "7:P:Product3",
  //Added later to test flexibility & deeper levels
  "9:I:Info about Product3",
  "10:I:Second info about Product3",
  "11:A:Author of second info",
  "12:S:Warehouse 2", 
  "13:O:Order3",
  "14:P:Product4",
  "15:P:Product5"
];

class InfoObject {
  objectNumber;
  objectType;
  objectDescription;
  parentNumber;

  constructor(objectNumber, objectType, objectDescription, parentNumber) {
    this.objectNumber = objectNumber;
    this.objectType = objectType;
    this.objectDescription = objectDescription
    // This was added later, to test if I could append info
    this.parentNumber = parentNumber;
  }
}

// My solution during test time, not flexible, hardcoded information

/*
function parse(array) {
  let lastObjectNr;
  let lastOrder;
  let arrayOfObjects = [];

  array.forEach(item => {
    let substrings = item.split(":");

    let nr = substrings[0];
    let type = substrings[1];
    let description = substrings[2];

    if(type === "O") {
      lastOrder = nr;
      object = new InfoObject(nr, type, description, parseInt(lastObjectNr));
    }
    if (type === "S") {
      lastObjectNr = nr;
      object = new InfoObject(nr, type, description, 0);
    }
    if (type === "P") {
      object = new InfoObject(nr, type, description, parseInt(lastOrder));
    }
    arrayOfObjects.push(object);
      })
  return  arrayOfObjects;
}
*/

// My much better solution, flexible, expandable, sadly only done 1h after the interview
function parse(array) {
  let lastLevel = [null];
  let parentNr = ['0'];

  let objects = array.map(item => {
    let substrings = item.split(":");

    let nr = substrings[0];
    let type = substrings[1];
    let description = substrings[2];

	if (lastLevel.includes(type)) {
		parentNr[lastLevel.indexOf(type)] = nr;
	} else {
		lastLevel.push(type);
		parentNr.push(nr);
	}

  return new InfoObject(nr, type, description, parseInt(parentNr[lastLevel.indexOf(type)-1]));
  })
  
return objects;
}

console.log(parse(dataAsString));

