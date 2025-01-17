const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    sender_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		receiver_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		sender_avatar : String,
		receiver_avatar : String,

		message: {
			type: String,
			required: true,
		}
},{ timestamps: true })

const Message = mongoose.model("Message",messageSchema)
module.exports = Message 