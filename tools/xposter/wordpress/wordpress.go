package wordpress

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	md "github.com/JohannesKaufmann/html-to-markdown"
	"github.com/JohannesKaufmann/html-to-markdown/plugin"
)

func GetLatestPosts() []Post {
	url := fmt.Sprintf("%v/wp-json/wp/v2/posts", os.Getenv("WP_URL"))
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}

	auth := os.Getenv("WP_USERNAME") + ":" + os.Getenv("WP_PASSWORD")
	authHeader := b64.StdEncoding.EncodeToString([]byte(auth))
	req.Header.Add("Authorization", fmt.Sprintf("Basic %v", authHeader))

	c := http.Client{}
	res, err := c.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	bbytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	var posts []Post
	err = json.Unmarshal(bbytes, &posts)
	if err != nil {
		log.Fatal(err)
	}

	return posts
}

type CustomTime struct {
	time.Time
}

func (t *CustomTime) UnmarshalJSON(b []byte) (err error) {
	date, err := time.Parse(`"2006-01-02T15:04:05"`, string(b))
	if err != nil {
		return err
	}
	t.Time = date
	return
}

type Post struct {
	ID int `json:"id"`
	// Date                    string  `json:"date"`
	DateGmt CustomTime `json:"date_gmt"`
	// GUID                    GUID    `json:"guid"`
	// Modified                string  `json:"modified"`
	// ModifiedGmt             string  `json:"modified_gmt"`
	Slug   string `json:"slug"`
	Status string `json:"status"`
	// Type                    string  `json:"type"`
	// Link                    string  `json:"link"`
	Title   Title   `json:"title"`
	Content Content `json:"content"`
	Excerpt Excerpt `json:"excerpt"`
	// Author                  int     `json:"author"`
	// FeaturedMedia int `json:"featured_media"`
	// CommentStatus           string  `json:"comment_status"`
	// PingStatus              string  `json:"ping_status"`
	// Sticky                  bool    `json:"sticky"`
	// Template                string  `json:"template"`
	// Format                  string  `json:"format"`
	// Meta                    []any   `json:"meta"`
	// Categories              []int   `json:"categories"`
	// Tags                    []any   `json:"tags"`
	// Series                  []any   `json:"series"`
	// Acf                     Acf     `json:"acf"`
	JetpackFeaturedMediaURL string `json:"jetpack_featured_media_url"`
	// Links                   Links   `json:"_links"`
}

func (p *Post) CanonicalUrl() string {
	return fmt.Sprintf("https://brianmorrison.me/blog/%v", p.Slug)
}

func (p *Post) MarkdownBody() string {
	converter := md.NewConverter("", true, nil)
	converter.Use(plugin.GitHubFlavored())
	markdown, err := converter.ConvertString(p.Content.Rendered)
	if err != nil {
		log.Fatal(err)
	}
	spl := strings.Split(markdown, "\n\n")
	rebuilt := ""
	for _, el := range spl {
		spl2 := strings.Split(el, "\n")
		if len(spl2) > 0 {
			for _, el2 := range spl2 {
				rebuilt += el2 + "\r"
			}
		} else {
			rebuilt += el
			rebuilt += "\r\r"
		}
	}
	return rebuilt
}

type GUID struct {
	Rendered string `json:"rendered"`
}
type Title struct {
	Rendered string `json:"rendered"`
}
type Content struct {
	Rendered  string `json:"rendered"`
	Protected bool   `json:"protected"`
}
type Excerpt struct {
	Rendered  string `json:"rendered"`
	Protected bool   `json:"protected"`
}
type Acf struct {
	Icon              string `json:"icon"`
	VideoURL          string `json:"video_url"`
	GithubURL         string `json:"github_url"`
	SeriesOrder       string `json:"series_order"`
	HideFeaturedImage bool   `json:"hide_featured_image"`
}
type Self struct {
	Href string `json:"href"`
}
type Collection struct {
	Href string `json:"href"`
}
type About struct {
	Href string `json:"href"`
}
type Author struct {
	Embeddable bool   `json:"embeddable"`
	Href       string `json:"href"`
}
type Replies struct {
	Embeddable bool   `json:"embeddable"`
	Href       string `json:"href"`
}
type VersionHistory struct {
	Count int    `json:"count"`
	Href  string `json:"href"`
}
type PredecessorVersion struct {
	ID   int    `json:"id"`
	Href string `json:"href"`
}
type WpFeaturedmedia struct {
	Embeddable bool   `json:"embeddable"`
	Href       string `json:"href"`
}
type WpAttachment struct {
	Href string `json:"href"`
}
type WpTerm struct {
	Taxonomy   string `json:"taxonomy"`
	Embeddable bool   `json:"embeddable"`
	Href       string `json:"href"`
}
type Curies struct {
	Name      string `json:"name"`
	Href      string `json:"href"`
	Templated bool   `json:"templated"`
}
type Links struct {
	Self               []Self               `json:"self"`
	Collection         []Collection         `json:"collection"`
	About              []About              `json:"about"`
	Author             []Author             `json:"author"`
	Replies            []Replies            `json:"replies"`
	VersionHistory     []VersionHistory     `json:"version-history"`
	PredecessorVersion []PredecessorVersion `json:"predecessor-version"`
	WpFeaturedmedia    []WpFeaturedmedia    `json:"wp:featuredmedia"`
	WpAttachment       []WpAttachment       `json:"wp:attachment"`
	WpTerm             []WpTerm             `json:"wp:term"`
	Curies             []Curies             `json:"curies"`
}
