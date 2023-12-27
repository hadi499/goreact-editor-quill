package models


type User struct{
    Id int64 `gorm:"primaryKey" json:"id"`
    Username string `gorm:"varchar(255)" json:"username" valid:"required~username must not be empty"`
    Email string `gorm:"varchar(255)" json:"email" valid:"required~email must not be empty"`
    Password string `gorm:"varchar(255)" json:"password" valid:"required~password must not be empty"`
}
