package devto

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"xposter/localdata"

	"github.com/pkg/errors"
)

func PublishPost(post localdata.CachedPost) error {
	bodyMarkdown := post.MarkdownBody(true)

	body := PublishPostRequestBody{
		Article: Article{
			Title:        post.Title,
			Published:    true,
			BodyMarkdown: bodyMarkdown,
			MainImage:    post.FeaturedImageUrl(),
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
		return err
	}
	defer res.Body.Close()

	if res.StatusCode < 200 || res.StatusCode > 299 {
		jbytes, err := ioutil.ReadAll(res.Body)
		if err != nil {
			return err
		}

		return errors.New(fmt.Sprintf("non success code %v returned: %v", res.StatusCode, string(jbytes)))
	}

	return nil
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
