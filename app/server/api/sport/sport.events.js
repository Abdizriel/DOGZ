/**
 * Sport model events
 */

'use strict';

import {EventEmitter} from 'events';
import Sport from './sport.model';
var SportEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SportEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Sport.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SportEvents.emit(event + ':' + doc._id, doc);
    SportEvents.emit(event, doc);
  }
}

export default SportEvents;
