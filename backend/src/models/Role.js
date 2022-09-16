const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    title: { type: String, required: true, unique: true, dropDups: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    permissions: [{
        type: mongoose.Types.ObjectId,
        ref: 'Permission'
    }]
}, { timestamps: true });

RoleSchema.methods.created = function(){
    //
}

module.exports = mongoose.model('Role', RoleSchema);