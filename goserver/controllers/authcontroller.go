package controllers

import (
	"goserver/database"
	"goserver/helper"
	"goserver/models"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func isEmailUnique(email string)bool {
    var user models.User
    result := database.DB.Where("email = ?", email).First(&user)
    return result.Error == gorm.ErrRecordNotFound

}

func Register(ctx *gin.Context){
    var user models.User

    //decode json request body
    if err := ctx.ShouldBindJSON(&user); err != nil{
        ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
        return 
    }

    if _,err := govalidator.ValidateStruct(&user); err != nil{

        ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
        return 
    }

    if !isEmailUnique(user.Email){

        ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "email is already use"})
        return 
    }

    hashPassword,_ := bcrypt.GenerateFromPassword([]byte (user.Password), bcrypt.DefaultCost)
    user.Password = string(hashPassword)

    database.DB.Create(&user)
    ctx.JSON(http.StatusOK, gin.H{"message": "register succsessfully"})


}

func Login(ctx *gin.Context){
    var userInput models.User
    if err := ctx.ShouldBindJSON(&userInput); err  != nil{
        ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
        return 
    }

    var user models.User

    if err := database.DB.Where("email = ?", userInput.Email).First(&user).Error; err !=  nil{
        switch err{
        case gorm.ErrRecordNotFound:

            ctx.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
            return
        default:
            ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
            return
        }
    }

    if err := bcrypt.CompareHashAndPassword([]byte (user.Password), []byte (userInput.Password));err != nil{
        ctx.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
        return
    }
    
    extTime := time.Now().Add(time.Minute * 1) 
    claims := &helper.JWTClaims{
        Username: user.Username,
        RegisteredClaims: jwt.RegisteredClaims{
            Issuer: "goserver",
            ExpiresAt: jwt.NewNumericDate(extTime),
        },
    } 

    // chose algoritma JWT 
    tokenAlgo := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    token, err := tokenAlgo.SignedString(helper.JWT_KEY)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
        return
    }

    http.SetCookie(ctx.Writer, &http.Cookie{
        Name: "token",
        Path: "/",
        Value: token,
        HttpOnly: true,
    })

    ctx.JSON(http.StatusOK, gin.H{"id": user.Id, "username": user.Username, "email": user.Email})
}

func Logout(ctx *gin.Context){
    //delete Cookie
    http.SetCookie(ctx.Writer, &http.Cookie{
        Name: "token",
        Path: "/",
        Value: "",
        HttpOnly: true,
        MaxAge: -1,
    })
    ctx.JSON(http.StatusOK, gin.H{"message": "logout succsessfully"})
}

