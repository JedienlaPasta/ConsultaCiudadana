import axios from "axios";

export const claveUnicaConfig = {
  clientId: process.env.CLAVEUNICA_CLIENT_ID!,
  clientSecret: process.env.CLAVEUNICA_CLIENT_SECRET!,
  redirectUri: process.env.CLAVEUNICA_REDIRECT_URI!,
  authUrl: process.env.CLAVEUNICA_AUTH_URL!,
  tokenUrl: process.env.CLAVEUNICA_TOKEN_URL!,
  userInfoUrl: process.env.CLAVEUNICA_USERINFO_URL!,
};

export async function getClaveUnicaToken(code: string) {
  const params = new URLSearchParams();
  params.append("client_id", claveUnicaConfig.clientId);
  params.append("client_secret", claveUnicaConfig.clientSecret);
  params.append("redirect_uri", claveUnicaConfig.redirectUri);
  params.append("grant_type", "authorization_code");
  params.append("code", code);

  const response = await axios.post(claveUnicaConfig.tokenUrl, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
}

export async function getClaveUnicaUserInfo(accessToken: string) {
  const response = await axios.post(claveUnicaConfig.userInfoUrl, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
