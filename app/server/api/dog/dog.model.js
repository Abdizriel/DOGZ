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

const ObjectId = Schema.Types.ObjectId;

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
      type: Boolean,
      default: false
    },
    isPedigree: {
      type: Boolean,
      default: false
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
    enum: [
      'Self Black',
      'Black and Tan',
      'Black Bicolor',
      'Black Tricolor',
      'Self Blue Merle',
      'Blue Merle and Tan',
      'Blue Merle and White',
      'Blue Merle w/ White and Tan',
      'Self Red',
      'Red and Tan',
      'Red Bicolor',
      'Red Tricolor',
      'Self Red Merle',
      'Red Merle and Tan',
      'Red Merle and White',
      'Red Merle w/ White and Tan'
    ],
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
    type: ObjectId,
    ref: 'Kennel'
  },
  sire: {
    type: ObjectId,
    ref: 'Dog'
  },
  dam: {
    type: ObjectId,
    ref: 'Dog'
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  siblings: [{
    type: ObjectId,
    ref: 'Dog'
  }],
  offspring: [{
    type: ObjectId,
    ref: 'Dog'
  }],
  exhibitions: [{
    type: ObjectId,
    ref: 'Exhibition'
  }],
  sports: [{
    type: ObjectId,
    ref: 'Sport'
  }],
  active: {
    type: Boolean,
    default: false
  },
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
  .pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
  });

/**
 * @exports serviceSchema
 * @default
 */
export default mongoose.model('Dog', DogSchema);
