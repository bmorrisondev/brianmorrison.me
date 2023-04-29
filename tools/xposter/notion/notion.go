package notion

import (
	"context"
	"log"
	"os"

	"github.com/dstotijn/go-notion"
)

func GetNotionPosts() []NotionPostDTO {
	c := notion.NewClient(os.Getenv("NOTION_TOKEN"))
	t := true
	r, err := c.QueryDatabase(context.TODO(), os.Getenv("NOTION_CMS_DBID"), &notion.DatabaseQuery{
		Sorts: []notion.DatabaseQuerySort{
			{
				Property:  "Publish on",
				Direction: notion.SortDirAsc,
			},
		},
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
					Or: []notion.DatabaseQueryFilter{
						{
							Property: "Posted to Hashnode",
							DatabaseQueryPropertyFilter: notion.DatabaseQueryPropertyFilter{
								Checkbox: &notion.CheckboxDatabaseQueryFilter{
									DoesNotEqual: &t,
								},
							},
						},
						{
							Property: "Posted to DevTo",
							DatabaseQueryPropertyFilter: notion.DatabaseQueryPropertyFilter{
								Checkbox: &notion.CheckboxDatabaseQueryFilter{
									DoesNotEqual: &t,
								},
							},
						},
					},
				},
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}

	retval := []NotionPostDTO{}

	for _, record := range r.Results {
		dto := NotionPostDTO{}
		props := record.Properties.(notion.DatabasePageProperties)
		dto.Id = record.ID
		dto.PostedToHashnode = *props["Posted to Hashnode"].Checkbox
		dto.PostedToDevTo = *props["Posted to DevTo"].Checkbox
		retval = append(retval, dto)
	}

	return retval
}

type NotionPostDTO struct {
	Id               string
	PostedToHashnode bool
	PostedToDevTo    bool
}

func UpdateCrosspostStatus(dto NotionPostDTO) {
	c := notion.NewClient(os.Getenv("NOTION_TOKEN"))

	updates := notion.UpdatePageParams{
		DatabasePageProperties: notion.DatabasePageProperties{
			"Posted to Hashnode": notion.DatabasePageProperty{
				Checkbox: &dto.PostedToHashnode,
			},
			"Posted to DevTo": notion.DatabasePageProperty{
				Checkbox: &dto.PostedToDevTo,
			},
		},
	}

	_, err := c.UpdatePage(context.TODO(), dto.Id, updates)
	if err != nil {
		log.Fatal(err)
	}
}
