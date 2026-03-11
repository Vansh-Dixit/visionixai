import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    razorPayId: { type: String, required: true, unique: true },
    plan: {type: String},
    credits: {type: Number},
    buyer: { type: Schema.Types.ObjectId, ref: "User"},
});

const Transaction = models.Transaction || model("Transaction", TransactionSchema);
export default Transaction;