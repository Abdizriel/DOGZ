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

const ObjectId = Schema.Types.ObjectId;

// Apply bluebird Promise as Mongoose Promise library
mongoose.Promise = Promise;

/**
 * @description Exhibition MongoDB Schema
 * @param ExhibitionSchema
 * @const
 */
const ExhibitionSchema = new Schema({
  location: {
    city: {
      type: String,
      required: true
    }
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  judge: {
    type: ObjectId,
    ref: 'User'
  },
  dogs: [{
    dog: {
      type: ObjectId,
      ref: 'Dog'
    },
    grade: {
      type: String
    },
    result: {
      type: String
    },
    comments: {
      type: String
    }
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
 * @description Validate if city field is not empty
 */
ExhibitionSchema
  .path('location.city')
  .validate(city => city.length, 'City cannot be empty');

/**
 * @description Validate if type field is not empty
 */
ExhibitionSchema
  .path('type')
  .validate(type => type.length, 'Type cannot be empty');

/**
 * @description Validate if date field is not empty
 */
ExhibitionSchema
  .path('date')
  .validate(date => date.length, 'Date cannot be empty');

/**
 * @description Every update set new updatedAt date
 */
ExhibitionSchema
  .pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
  });

/**
 * @exports ExhibitionSchema
 * @default
 */
export default mongoose.model('Exhibition', ExhibitionSchema);
