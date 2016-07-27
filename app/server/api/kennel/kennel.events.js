/**
 * Kennel model events
 */

'use strict';

import {EventEmitter} from 'events';
import Kennel from './kennel.model';
var KennelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KennelEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Kennel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    KennelEvents.emit(event + ':' + doc._id, doc);
    KennelEvents.emit(event, doc);
  }
}

export default KennelEvents;
