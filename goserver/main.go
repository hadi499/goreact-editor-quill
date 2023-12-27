package main


import(
  "goserver/database"
  "goserver/controllers"
  "github.com/gin-gonic/gin"
)

func main(){
  database.ConnectDatabase()
  r := gin.Default()

  r.POST("/api/users/register", controllers.Register)
  r.POST("/api/users/login", controllers.Login)
  r.POST("/api/users/logout", controllers.Logout)
  r.GET("/api/posts", controllers.Index)
  r.POST("/api/posts/create", controllers.Create)
  r.GET("/api/posts/:id", controllers.Detail)
  r.Run()
}
