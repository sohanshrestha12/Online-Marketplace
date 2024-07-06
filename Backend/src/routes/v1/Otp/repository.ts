import { OtpModel } from "./model";

export const storeUserOtp = (code: string, userId: string) => {
  const expiration = new Date(Date.now() + 1 * 60 * 1000);
  const otp = OtpModel.findOneAndUpdate(
    { user_id: userId },
    { code, expiration },
    { new: true, upsert: true }
  );
  return otp;
};

export const findUserOtp = (id: string) => {
  return OtpModel.findOne({ user_id: id });
};

export const deleteOtp = (id: string) => {
  return OtpModel.findOneAndDelete({ _id: id }, { new: true });
};
