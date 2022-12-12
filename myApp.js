require('dotenv').config();
const mongoose = require('mongoose');
// set mongoose package to variable
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}); 
//set up mongoose package 
const personSchema = new mongoose.Schema({
  name:
    {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});
// create schema 
const Person = mongoose.model('Person', personSchema);
// set schema to a model 
const createAndSavePerson = (done) => {
  const person = new Person({name: 'Ira', age: 46, favoriteFoods: ['Cheburek', 'Lentils']});
 person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
//create person and save them in db 

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => {
    if(error){
      done(error); 
    }
    done(null, data) 
  } )
};
// use model to create multiple people 

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (error, personFound) {
    if (error) return console.log(error);
    done(null, personFound);
  });
};
// search database for users using .find() method
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods : food}, function(error, data){
    if(error) return console.log(error)
  done(null, data);
  })
};
//return one specific matching document using .findOne() method

const findPersonById = (personId, done) => {
  Person.findById(personId, function(error, data){
  if(error) console.log(error)
  done(null, data);
  })
};
//find person using id with .findById() method

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
Person.findById(personId, (error, person) => {
  if(error) console.log(error)
  person.favoriteFoods.push(foodToAdd)
  person.save((error, updatedPerson) => {
    if(error) console.log(error)
    done(null, updatedPerson)
  })
})
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (error, updatedDoc) => {
    if(error) return console.log(error)
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
