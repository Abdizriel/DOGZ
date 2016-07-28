/**
 * Exhibition model events
 */

'use strict';

import {EventEmitter} from 'events';
import Exhibition from './exhibition.model';
var ExhibitionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ExhibitionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Exhibition.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ExhibitionEvents.emit(event + ':' + doc._id, doc);
    ExhibitionEvents.emit(event, doc);
  }
}

export default ExhibitionEvents;
