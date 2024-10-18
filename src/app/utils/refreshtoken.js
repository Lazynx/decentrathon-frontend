// /utils/refreshToken.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${process.env.ORIGIN}/api/auth/refresh-token`,
      { token: refreshToken }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    return null;
  }
}
