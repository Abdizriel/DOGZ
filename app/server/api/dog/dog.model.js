'use strict';

  /**
   * @description MongoDB connector
   * @param mongoose
   */
import mongoose from 'mongoose';

  /**
   * @description Promise library
   * @param Promise
   */
import Promise from 'bluebird';

  /**
   * @description MongoDB Schema
   * @param Schema
   */
import { Schema } from 'mongoose';

// Apply bluebird Promise as Mongoose Promise library
mongoose.Promise = Promise;

/**
 * @description Dog MongoDB Schema
 * @param DogSchema
 * @const
 */
const DogSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  images: [{
    src: {
      type: String
    },
    isProfile: {
      type: Boolean
    }
  }],
  sex: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  birth: {
    type: Date,
    required: true
  },
  coat: {
    type: String,
    required: true
  },
  toothing: {
    type: String
  },
  occlusion: {
    type: String
  },
  eyes: {
    type: String
  },
  height: {
    type: String
  },
  weight: {
    type: String
  },
  inbreed: {
    type: Number
  },
  kennel: {
      type: Schema.Types.ObjectId,
      ref: 'Kennel'
  },
  // owner: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  // },
  // siblings: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Dog'
  // }],
  // offspring: [{
  //     type: Schema.Types.ObjectId,
  //     ref: 'Dog'
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

/**
 * @description Validate if fullName field is not empty
 */
DogSchema
  .path('fullName')
  .validate(fullName => fullName.length, 'Full name cannot be empty');

/**
 * @description Validate if sex field is not empty
 */
DogSchema
  .path('sex')
  .validate(sex => sex.length, 'Sex cannot be empty');

/**
 * @description Validate if sex field is not empty
 */
DogSchema
  .path('birth')
  .validate(birth => birth.length, 'Date of Birth cannot be empty');

/**
 * @description Validate if sex field is not empty
 */
DogSchema
  .path('coat')
  .validate(coat => coat.length, 'Coat cannot be empty');

/**
 * @description Every update set new updatedAt date
 */
DogSchema
  .post('update', () =>{
    this.update({},{
    $set: {
      updatedAt: new Date()
    }
  });
});

/**
 * @exports serviceSchema
 * @default
 */
export default mongoose.model('Dog', DogSchema);
