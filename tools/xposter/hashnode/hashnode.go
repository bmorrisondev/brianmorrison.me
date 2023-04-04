package hashnode

import (
	"context"
	"fmt"
	"log"
	"os"
	"xposter/wordpress"

	"github.com/machinebox/graphql"
)

func PublishPost(post wordpress.Post) {
	baseQuery := `
		mutation {
			createStory(input: {
				title: "%v"
				isPartOfPublication:{
					publicationId: "%v"
				}
				contentMarkdown: "%v"
				tags:[]
				coverImageURL: "%v"
				isRepublished: {
					originalArticleURL: "%v"
				}
			}) {
				post {
					title
					dateAdded
				}
			}
		}
	`

	originalUrl := fmt.Sprintf("https://brianmorrison.me/blog/%v", post.Slug)
	query := fmt.Sprintf(baseQuery,
		post.Title.Rendered,
		os.Getenv("HASHNODE_PUB_ID"),
		post.MarkdownBody(),
		post.JetpackFeaturedMediaURL,
		originalUrl)

	client := graphql.NewClient("https://api.hashnode.com")
	request := graphql.NewRequest(query)
	request.Header.Add("Authorization", os.Getenv("HASHNODE_KEY"))
	var response interface{}
	err := client.Run(context.Background(), request, &response)
	if err != nil {
		log.Fatal(err)
	}
}
