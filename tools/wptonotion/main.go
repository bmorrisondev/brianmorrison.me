package main

import (
	"fmt"
	"log"
	"os"
	"wptonotion/wordpress"

	"github.com/joho/godotenv"
)

func main() {
	log.Println("go!")
	godotenv.Load()

	maxPages := 8
	page := 0
	for {
		page++
		log.Printf("getting page %v", page)
		posts := wordpress.GetPostsByPage(page)

		for _, el := range posts {
			output := el.FrontMatter()
			output += "\n"
			output += el.MarkdownBody()

			timestr := el.DateGmt.Format("2006-01-02")
			filename := fmt.Sprintf("./output/%v-%v.md", timestr, el.Slug)
			err := os.WriteFile(filename, []byte(output), 0644)
			if err != nil {
				log.Fatal(err)
			}
		}

		if page >= maxPages {
			return
		}
	}

	// get posts before date

	// for _, el := range filtered {
	// 	// hashnode.PublishPost(el)
	// 	devto.PublishPost(el)
	// }
}
