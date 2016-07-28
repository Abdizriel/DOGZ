/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Dog from '../api/dog/dog.model';
import Kennel from '../api/kennel/kennel.model';
import Exhibition from '../api/exhibition/exhibition.model';

let dogs, users, kennels, exhibitions;

createUsers()
  .then(() => createDogs())
  .then(() => createKennels())
  .then(() => createExhibitions())
  .then(() => updateDogs());


function createUsers() {
  return User.find({}).remove()
    .then(() => {
      User.collection.insert([{
        provider: 'local',
        name: 'Emilia Heller',
        location: {
          city: 'Paisley'
        },
        email: 'emilia.heller@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Karina Wilk',
        location: {
          city: 'Zawierc'
        },
        email: 'karina.wilk@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Magdalena Rajner',
        location: {
          city: 'Karsibór k/Świnoujścia '
        },
        email: 'magdalena.rajner@example.com',
        password: 'test'
      }, {
        provider: 'local',
        name: 'Bogusław Chmiel',
        email: 'boguslaw.chmiel@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }])
        .then(result => {
          users = result.ops;
          console.log('finished populating users');
        });
    });
}

function createDogs() {
  return Dog.find({}).remove()
    .then(() => {
      Dog.collection.insert([{
        fullName: 'SIMON Rügenaussies',
        name: 'Simon',
        sex: 'Male',
        birth: new Date('2011-07-10'),
        coat: 'Red Merle w/ White and Tan'
      }, {
        fullName: 'CAPPUCCINO Color Joy',
        name: 'Zoe',
        sex: 'Female',
        birth: new Date('2015-04-02'),
        coat: 'Red Merle w/ White and Tan'
      }, {
        fullName: 'CZEKOLADA Sfora z Krasnego Boru',
        name: 'Czekolada',
        sex: 'Female',
        birth: new Date('2012-11-09'),
        coat: 'Red Tricolor',
        toothing: 'pełne',
        occlusion: 'nożycowy',
        images: [{
          src: 'http://aussie.ekologia24.biz/psy/2013/05/czek5.jpg',
          isProfile: true
        }, {
          src: 'http://aussie.ekologia24.biz/psy/2016/02/czeko.jpg',
          isPedigree: true
        }]
      }, {
        fullName: 'COFFEE ARABICA Color Joy',
        name: 'Pestka',
        sex: 'Female',
        birth: new Date('2015-04-02'),
        coat: 'Red Tricolor',
        eyes: 'Bursztynowe',
        height: '53cm',
        weight: '27kg',
        toothing: 'pełne',
        occlusion: 'nożycowy',
        images: [{
          src: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13124835_1186162651407742_3308150279136520791_n.jpg?oh=fbca6c9a864e2fb3106fe6666e5a9e73&oe=5812E106',
          isProfile: true
        }, {
          src: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13267858_1203575942999746_7679413730571881506_n.jpg?oh=23648344df850ac6a644fa2b9be8251b&oe=581E0DED',
          isPedigree: true
        }]
      }, {
        fullName: 'COFFEE LATTE Color Joy',
        name: 'Antek',
        sex: 'Male',
        birth: new Date('2015-04-02'),
        coat: 'Red Merle w/ White and Tan',
        images: [{
          src: 'http://aussie.ekologia24.biz/psy/2016/02/antek.jpg',
          isProfile: true
        }, {
          src: 'http://aussie.ekologia24.biz/psy/2016/02/antek2.jpg',
          isPedigree: true
        }]
      }])
        .then(result => {
          dogs = result.ops;
          console.log('finished populating dogs');
        });
    });
}

function updateDogs() {
  Dog.collection.updateOne(
    { "_id" : dogs[0]._id },
    { $set: { "offspring" : [dogs[1]._id, dogs[3]._id, dogs[4]._id], "owner": users[2]._id } }
  )
    .then(() => {
      Dog.collection.updateOne(
        { "_id" : dogs[1]._id },
        { $set: { "siblings" : [dogs[3]._id, dogs[4]._id], "kennel": kennels[0]._id, "dam": dogs[2]._id, "sire": dogs[0]._id } }
      );
    })
    .then(() => {
      Dog.collection.updateOne(
        { "_id" : dogs[2]._id },
        { $set: { "offspring" : [dogs[1]._id, dogs[3]._id, dogs[4]._id], "kennel": kennels[0]._id, "owner": users[1]._id, "exhibitions": [exhibitions[0]._id] } }
      );
    })
    .then(() => {
      Dog.collection.updateOne(
        { "_id" : dogs[3]._id },
        { $set: { "siblings" : [dogs[1]._id, dogs[4]._id], "kennel": kennels[0]._id, "owner": users[0]._id, "dam": dogs[2]._id, "sire": dogs[0]._id } }
      );
    })
    .then(() => {
      Dog.collection.updateOne(
        { "_id" : dogs[4]._id },
        { $set: { "siblings" : [dogs[1]._id, dogs[3]._id], "kennel": kennels[0]._id, "owner": users[1]._id, "dam": dogs[2]._id, "sire": dogs[0]._id } }
      );
    })
    .then(() => {
      console.log('finished updating dogs');
    });
}

function createKennels() {
  return Kennel.find({}).remove()
    .then(() => {
      Kennel.collection.insert([{
        name: 'Color Joy',
        location: {
          city: 'Dąbrowa Górnicza'
        },
        website: 'http://www.colorjoy.eu/',
        contact: {
          email: 'colorjoy@onet.pl'
        },
        dogs: [dogs[2]._id, dogs[4]._id],
        owner: users[1]._id,
        active: true
      }, {
        name: 'Sfora z Krasnego Boru',
        location: {
          city: 'Karsibór k/Świnoujścia'
        },
        website: 'http://www.krasnybor.pl/',
        dogs: [dogs[0]._id],
        owner: users[2]._id,
        active: true
      }, {
        name: 'Rügenaussies',
        location: {
          city: 'Garz/Rügen'
        },
        website: 'http://www.xn--rgenaussies-thb.com/',
        active: true
      }])
        .then(result => {
          kennels = result.ops;
          console.log('finished populating kennels');
        });
    });
}

function createExhibitions() {
  return Exhibition.find({}).remove()
    .then(() => {
      Exhibition.collection.insert([{
        date: new Date('12.10.2014'),
        location: {
          city: 'Zabrze'
        },
        type: 'Krajowa',
        dogs: [{
          dog: dogs[2]._id,
          grade: 'Pośrednia',
          result: '1 dosk. CWC, NDS'
        }],
        judge: users[3]._id,
        active: true
      }])
        .then(result => {
          exhibitions = result.ops;
          console.log('finished populating exhibitions');
        });
    });
}
