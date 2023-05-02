package main

import (
	"log"
	"time"
	"xposter/devto"
	"xposter/hashnode"
	"xposter/localdata"
	"xposter/notion"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	postMap := localdata.GetCachedPostMap("../../website/content/notionPost.json")

	posts := notion.GetNotionPosts()

	for idx, el := range posts {
		if idx > 4 {
			continue
		}

		didUpdate := false

		if !el.PostedToHashnode {
			log.Printf("posting '%v' to hashnode", postMap[el.Id].Title)
			err := hashnode.PublishPost(postMap[el.Id])
			if err != nil {
				log.Printf("ERROR: posting %v to hashnode: %v", el.Id, err)
			} else {
				el.PostedToHashnode = true
				didUpdate = true
			}
		}

		if !el.PostedToDevTo {
			log.Printf("posting '%v' to dev.to", postMap[el.Id].Title)
			err := devto.PublishPost(postMap[el.Id])
			if err != nil {
				log.Printf("ERROR: posting %v to dev.to: %v", el.Id, err)
			} else {
				el.PostedToDevTo = true
				didUpdate = true
			}
		}

		if didUpdate {
			notion.UpdateCrosspostStatus(el)
		}

		time.Sleep(time.Second * 15)
	}
}
