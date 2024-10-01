import { Schema, model, models } from 'mongoose';

const healthSchema = new Schema({
    sleepTime: {
        type: Date,
        required: true
    },
    wakeTime: {
        type: Date,
        required: true
    },
    foodIntake: {
        type: String,
        required: true
    },
    waterIntake: {
        type: Number,
        required: true
    },
    additionalHealthData: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Health = models.Health || model('Health', healthSchema);

export default Health;
