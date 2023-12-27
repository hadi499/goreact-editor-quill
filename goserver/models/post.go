package models

import "time"

type Post struct{
    Id  int64   `gorm:"primaryKey" json:"id"`
    Title   string  `gorm:"varchar(255)" json:"title" valid:"required~Title must not empty"`
    Content   string  `json:"content" valid:"required~Content must not empty"`
    UserId  int64   `json:"user_id"`
    User    User    `gorm:"foreignKey:UserId" json:"user"` 
    CreatedAt time.Time
    Updatedat time.Time
}
