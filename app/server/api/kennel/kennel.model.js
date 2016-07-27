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
 * @description Kennel MongoDB Schema
 * @param KennelSchema
 * @const
 */
const KennelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    }
  },
  website: {
    type: String
  },
  contact: {
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  dogs: [{
    type: ObjectId,
    ref: 'Dog'
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
KennelSchema
  .path('name')
  .validate(name => name.length, 'Name cannot be empty');

/**
 * @description Validate if sex field is not empty
 */
KennelSchema
  .path('location.city')
  .validate(city => city.length, 'City cannot be empty');

/**
 * @description Every update set new updatedAt date
 */
KennelSchema
  .pre('save', function (next) {
    this.updatedAt = new Date();
    return next();
  });

/**
 * @exports serviceSchema
 * @default
 */
export default mongoose.model('Kennel', KennelSchema);
