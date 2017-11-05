var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	 name: {
	 	type: String,
	 	required: [true, "Name is required"]
	 }, 
	 description: String, 
	 deadline: {
	 	type: Date,
	 	required: [true, "Deadline is required"]
	 },
	 completed: {
	 	type: Boolean,
	 	default: false
	 },
	 assignedUser: {
	 	type: String,
	 	default: ''
	 },
	 assignedUserName: {
	 	type: String,
	 	default: ''
	 }, 
	 dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('task', taskSchema);
