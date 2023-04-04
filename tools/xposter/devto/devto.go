package devto

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"xposter/wordpress"
)

func PublishPost(post wordpress.Post) {
	body := PublishPostRequestBody{
		Article: Article{
			Title:        post.Title.Rendered,
			Published:    true,
			BodyMarkdown: post.MarkdownBody(),
			MainImage:    post.JetpackFeaturedMediaURL,
			CanonicalUrl: post.CanonicalUrl(),
		},
	}
	jsonData, err := json.Marshal(body)
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", "https://dev.to/api/articles", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Add("api-key", os.Getenv("DEV_TO_KEY"))
	req.Header.Set("Content-Type", "application/json; charset=UTF-8")

	c := http.Client{}
	res, err := c.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	bbytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Panic(err)
	}
	log.Println(string(bbytes))

	log.Println("done!")
}

type PublishPostRequestBody struct {
	Article Article `json:"article"`
}
type Article struct {
	Title        string   `json:"title"`
	Published    bool     `json:"published"`
	BodyMarkdown string   `json:"body_markdown"`
	Tags         []string `json:"tags"`
	Series       string   `json:"series"`
	MainImage    string   `json:"main_image"`
	CanonicalUrl string   `json:"canonical_url"`
	Description  string   `json:"description"`
}
