const mongoose = require('mongoose')

const PermissionSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, dropDups: true },
    title: { type: String, required: true, unique: true, dropDups: true },
    group: { type: String, required: true },
    roles: [{
        type: mongoose.Types.OnjectId,
        ref: 'Role'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);