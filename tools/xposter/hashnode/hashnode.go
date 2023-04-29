package hashnode

import (
	"context"
	"fmt"
	"os"
	"xposter/localdata"

	"github.com/machinebox/graphql"
)

func PublishPost(post localdata.CachedPost) error {
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

	body := post.MarkdownBody(true)

	query := fmt.Sprintf(baseQuery,
		post.Title,
		os.Getenv("HASHNODE_PUB_ID"),
		body,
		post.FeaturedImageUrl(),
		post.CanonicalUrl())

	client := graphql.NewClient("https://api.hashnode.com")
	request := graphql.NewRequest(query)
	request.Header.Add("Authorization", os.Getenv("HASHNODE_KEY"))
	var response interface{}
	err := client.Run(context.Background(), request, &response)
	if err != nil {
		return err
	}
	return nil
}
