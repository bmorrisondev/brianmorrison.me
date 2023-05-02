package localdata

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	md "github.com/JohannesKaufmann/html-to-markdown"
	"github.com/JohannesKaufmann/html-to-markdown/plugin"
)

func GetCachedPostMap(path string) map[string]CachedPost {
	jbytes, err := os.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}

	var cachedPosts []CachedPost
	err = json.Unmarshal(jbytes, &cachedPosts)
	if err != nil {
		log.Fatal(err)
	}

	postMap := map[string]CachedPost{}
	for _, el := range cachedPosts {
		postMap[el.NotionID] = el
	}
	return postMap
}

type CachedPost struct {
	ID                  string    `json:"id"`
	NotionID            string    `json:"notion_id"`
	Status              string    `json:"status"`
	Slug                string    `json:"slug"`
	RelationSeries      []any     `json:"relation_series"`
	PublishOn           time.Time `json:"publishOn"`
	CodeURL             any       `json:"codeURL"`
	SeriesOrder         any       `json:"seriesOrder"`
	PostHogAnnotationID any       `json:"postHogAnnotationID"`
	Category            string    `json:"category"`
	YouTubeURL          any       `json:"youTubeURL"`
	Title               string    `json:"title"`
	HTML                string    `json:"html"`
	Excerpt             string    `json:"excerpt"`
	CachedOn            int       `json:"cachedOn"`
	FeaturedImage       string    `json:"featuredImage"`
}

func (p *CachedPost) CanonicalUrl() string {
	return fmt.Sprintf("https://brianmorrison.me/blog/%v", p.Slug)
}

func (p *CachedPost) FeaturedImageUrl() string {
	if p.FeaturedImage != "" {
		return fmt.Sprintf("https://brianmorrison.me%v", p.FeaturedImage)
	}
	return "https://brianmorrison.me/img/social.png"
}

func (p *CachedPost) MarkdownBody(includePostdateQuote bool) string {
	converter := md.NewConverter("", true, nil)
	converter.Use(plugin.GitHubFlavored())
	markdown, err := converter.ConvertString(p.HTML)
	if err != nil {
		log.Fatal(err)
	}
	spl := strings.Split(markdown, "\n\n")
	rebuilt := ""
	if includePostdateQuote {
		rebuilt = fmt.Sprintf("> This article was originally posted to [my personal blog](https://brianmorrison.me/blog) on %v.\r\r",
			p.PublishOn.Format("01/02/2006"))
	}
	for _, el := range spl {
		if strings.HasPrefix(el, "![](") {
			el = strings.Replace(el, "![](", "![](https://brianmorrison.me", 1)
		}
		el = strings.Replace(el, `"`, `\"`, -1)
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
