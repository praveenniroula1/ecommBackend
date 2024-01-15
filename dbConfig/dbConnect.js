import mongoose from "mongoose";

export const dbConnect = () => {
  const connectionProtocol = process.env.MONGO_CLIENT;
  const conStr = mongoose.connect(connectionProtocol);
  if (conStr) {
    connecting && console.log("COnnected DAtabase");
  }
};
