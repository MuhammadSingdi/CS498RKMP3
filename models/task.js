var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	 name: String, 
	 description: String, 
	 deadline: Date,
	 completed: Boolean,
	 assignedUser: String,
	 assignedUserName: String, 
	 dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('task', taskSchema);
