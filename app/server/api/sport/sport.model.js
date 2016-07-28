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
 * @description Sport MongoDB Schema
 * @param SportSchema
 * @const
 */
const SportSchema = new Schema({
  location: {
    city: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  subtype: {
    type: String
  },
  rank: {
    type: String,
    default: '-'
  },
  date: {
    type: Date,
    required: true
  },
  judges: [{
    type: ObjectId,
    ref: 'User'
  }],
  dogs: [{
    dog: {
      type: ObjectId,
      ref: 'Dog'
    },
    guide: {
      type: ObjectId,
      ref: 'User'
    },
    position: {
      type: Number
    },
    grade: {
      type: String
    },
    result: {
      type: String
    },
    rating: {
      type: String,
      default: '-'
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
SportSchema
  .path('location.city')
  .validate(city => city.length, 'City cannot be empty');

/**
 * @description Validate if name field is not empty
 */
SportSchema
  .path('name')
  .validate(name => name.length, 'Name cannot be empty');

/**
 * @description Validate if type field is not empty
 */
SportSchema
  .path('type')
  .validate(type => type.length, 'Type cannot be empty');

/**
 * @description Validate if date field is not empty
 */
SportSchema
  .path('date')
  .validate(date => date.length, 'Date cannot be empty');

/**
 * @description Validate if rank field is not empty
 */
SportSchema
  .path('rank')
  .validate(rank => rank.length, 'Rank cannot be empty');

/**
 * @description Every update set new updatedAt date
 */
SportSchema
  .pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
  });

/**
 * @exports SportSchema
 * @default
 */
export default mongoose.model('Sport', SportSchema);
