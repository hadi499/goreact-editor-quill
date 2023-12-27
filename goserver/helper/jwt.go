package helper

import "github.com/golang-jwt/jwt/v4"
var JWT_KEY = []byte ("jlajljgljklgjg8998djdklh")

type JWTClaims struct{
    Username string
    jwt.RegisteredClaims
}
