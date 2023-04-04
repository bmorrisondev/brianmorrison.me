package main

import (
	"time"
	"xposter/devto"
	"xposter/wordpress"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	// get posts before date
	posts := wordpress.GetLatestPosts()
	filtered := []wordpress.Post{}
	past24hrs := time.Now().Add(time.Hour * 24 * -1)
	for _, el := range posts {
		if el.DateGmt.Time.Unix() > past24hrs.Unix() {
			filtered = append(filtered, el)
		}
	}

	for _, el := range filtered {
		// hashnode.PublishPost(el)
		devto.PublishPost(el)
	}
}
