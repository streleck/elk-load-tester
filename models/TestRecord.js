// Require mongoose
var mongoose = require('mongoose');
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var TestRecordSchema = new Schema({
  description: {
    type: String
  },
  url: {
    type: String
  },
  notes: [{
    noteText: String
  }],
  startedAt: {
    type: Number
  },
  finishedAt: {
    type: Number
  },
  queries: [{
    wasSuccessful: Boolean,
    error: String
  }]
});

// Create the TestRecord model with the TestRecordSchema
var TestRecord = mongoose.model('TestRecord', TestRecordSchema);

// Export the model
module.exports = TestRecord;