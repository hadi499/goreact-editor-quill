package database

import (
	"goserver/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)
var DB *gorm.DB

func ConnectDatabase(){
    dsn := "hadi:admin123@tcp(127.0.0.1:3307)/goserver?charset=utf8mb4&parseTime=True&loc=Local"
    dbConnection, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
   if err != nil{
        panic(err)
    } 

    dbConnection.AutoMigrate(&models.User{}, &models.Post{})
    DB = dbConnection
}

