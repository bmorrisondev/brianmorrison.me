import jwt from "jsonwebtoken";
import jwksClient from 'jwks-rsa';

type ValidateTokenResponse = {
  isValid: boolean
  isAdmin?: boolean
  claims?: jwt.JwtPayload
}

export async function validateSession(event): Promise<ValidateTokenResponse> {
  const cookies = {}
  event.headers.cookie.split(';').forEach(c => {
    const [key, value] = c.split('=');
    cookies[key.trim()] = value;
  });
  const token = cookies["__session"];

  return new Promise((resolve, reject) => {
    var client = jwksClient({
      jwksUri: process.env.JWKS_URI as string
    });

    function getKey(header, callback){
      client.getSigningKey(header.kid, function(err, key) {
        // @ts-ignore
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
    }

    jwt.verify(token, getKey, function(err, decoded) {
      if(err) reject({
        isValid: false
      })
      let claims: jwt.JwtPayload = decoded as jwt.JwtPayload;
      let isAdmin = false
      if(claims["metadata"] && claims["metadata"]["is_admin"] === "true") {
        isAdmin = true
      }

      resolve({
        isValid: true,
        isAdmin,
        claims
      })
    });
  })
}