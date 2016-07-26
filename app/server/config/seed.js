/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Dog from '../api/dog/dog.model';

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Dog.find({}).remove()
  .then(() => {
    Dog.create({
      fullName: 'BEZA Regalia',
      name: 'Nel',
      sex: 'Female',
      birth: new Date('2008-03-22'),
      coat: 'blue merle z podpalaniem i białymi znaczeniami (blue merle c/w)',
      images: [{
        src: 'http://aussie.ekologia24.biz/fotki-aussie/Nel5,5m2.jpg'
      }, {
        src: 'http://aussie.ekologia24.biz/fotki-aussie/Nel5,5m4.jpg',
        isProfile: true
      }]
    }, {
      fullName: 'BIG BEN Gorzowska Panorama',
      name: 'Toffee',
      sex: 'Male',
      birth: new Date('2008-03-26'),
      coat: 'red merle z podpalaniem i białymi znaczeniami (red merle c/w)',
      toothing: 'pełne',
      occlusion: 'nożycowy',
      eyes: 'P:brązowe L:niebieskie',
      height: '57 cm',
      weight: '24.75 kg'
    })
    .then(() => {
      console.log('finished populating dogs');
    });
  });
