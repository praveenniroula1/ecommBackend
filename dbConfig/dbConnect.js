import mongoose from "mongoose";

export const dbConnect = () => {
  const conStr = process.env.MONGO_CLIENT;
  const connecting = mongoose.connect(conStr);
  if (conStr) {
    connecting && console.log("COnnected DAtabase");
  }
};
