import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
  // Fields
  testFields: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model('test', TestSchema);
export default Test;