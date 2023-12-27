package controllers

import (
	"goserver/database"
	"goserver/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Index(ctx *gin.Context){
    var posts []models.Post
    database.DB.Preload("User").Find(&posts)
    ctx.JSON(http.StatusOK, gin.H{"posts": posts})
}

func Create(ctx *gin.Context){
    var post models.Post

    if err := ctx.ShouldBindJSON(&post); err != nil{
        ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
        return 
    }

    database.DB.Create(&post)
    ctx.JSON(http.StatusOK, gin.H{"post": post})

  
}

func Detail(ctx *gin.Context){
  var post models.Post
  id := ctx.Param("id")
  if err := database.DB.First(&post,id).Error; err != nil{
    switch err{
    case gorm.ErrRecordNotFound:
      ctx.JSON(http.StatusUnauthorized, gin.H{"err": err.Error()})
    default:
      ctx.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
      return

  }
  }
  ctx.JSON(http.StatusOK, gin.H{"post": post}) 
}



