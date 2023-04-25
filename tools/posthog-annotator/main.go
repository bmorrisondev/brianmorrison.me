package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/dstotijn/go-notion"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	c := notion.NewClient(os.Getenv("NOTION_TOKEN"))
	r, err := c.QueryDatabase(context.TODO(), os.Getenv("NOTION_CMS_DBID"), &notion.DatabaseQuery{
		Filter: &notion.DatabaseQueryFilter{
			Property: "Status",
			And: []notion.DatabaseQueryFilter{
				{
					Property: "Status",
					DatabaseQueryPropertyFilter: notion.DatabaseQueryPropertyFilter{
						Status: &notion.StatusDatabaseQueryFilter{
							Equals: "Published",
						},
					},
				},
				{
					Property: "PostHog annotation ID",
					DatabaseQueryPropertyFilter: notion.DatabaseQueryPropertyFilter{
						Number: &notion.NumberDatabaseQueryFilter{
							IsEmpty: true,
						},
					},
				},
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}

	for _, el := range r.Results {
		props := el.Properties.(notion.DatabasePageProperties)
		content := fmt.Sprintf("Published \"%v\"", props["Title"].Title[0].PlainText)
		dateStr := props["Publish on"].Date.Start.Time.Format(time.RFC3339)

		annotationId := CreateAnnotation(content, dateStr)

		fl := float64(annotationId)

		updates := notion.UpdatePageParams{
			DatabasePageProperties: notion.DatabasePageProperties{
				"PostHog annotation ID": notion.DatabasePageProperty{
					Number: &fl,
				},
			},
		}

		_, err = c.UpdatePage(context.TODO(), el.ID, updates)
		if err != nil {
			log.Fatal(err)
		}

		log.Printf("%v @ %v -- %v", content, dateStr, annotationId)
	}

	log.Print("done!")
}

func CreateAnnotation(content string, dateString string) int {
	projectId := os.Getenv("PH_PROJECT_ID")
	apiKey := os.Getenv("PH_API_KEY")

	jbytes, err := json.Marshal(CreateAnnotationBody{
		Content:    content,
		DateMarker: dateString,
		Scope:      "project",
	})
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", fmt.Sprintf("https://app.posthog.com/api/projects/%v/annotations/", projectId), bytes.NewReader(jbytes))
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer "+apiKey)

	c := http.Client{}
	res, err := c.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	jbytes, err = ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	var responseBody CreatAnnotationResponse
	err = json.Unmarshal(jbytes, &responseBody)
	if err != nil {
		log.Fatal(err)
	}

	return responseBody.Id
}

type CreateAnnotationBody struct {
	Content    string `json:"content"`
	DateMarker string `json:"date_marker"`
	Scope      string `json:"scope"`
}

type CreatAnnotationResponse struct {
	Id int
}
