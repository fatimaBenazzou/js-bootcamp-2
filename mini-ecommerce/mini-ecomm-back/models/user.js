import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        firstName: { type: String, minLength: 3, maxLength: 20, required: true },
        lastName: { type: String, minLength: 3, maxLength: 20, required: true },
        email: {
            type: String,
            required: true,
            validate: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "not valid email"],
            unique: true,
        },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (this.isNew || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.toSimpleUser = function () {
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
    };
};

const userModel = model("User", userSchema);
export default userModel;
