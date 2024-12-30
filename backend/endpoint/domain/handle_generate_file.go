package domainEndpoint

import (
	"fmt"
	"os"
	"sandbox-skeleton/type/table"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
)

func (r *Handler) HandleGenerateFile(c *fiber.Ctx) error {
	var domains []table.Domain
	if err := r.database.Preload("Project").Find(&domains).Error; err != nil {
		return gut.Err(false, "Failed to query all records in Domain table", err)
	}

	// Open a file for writing
	file, err := os.Create("output.txt")
	if err != nil {
		return gut.Err(false, "Failed to create file", err)
	}
	defer file.Close()

	for _, domain := range domains {
		// Check if required fields are nil or empty
		if domain.Project == nil || domain.Project.Domain == nil || domain.Hostname == nil {
			return gut.Err(false, "Missing critical fields (Project, Domain, or Hostname)", nil)
		}

		// Now build the line since all required fields are non-nil
		hostname := *domain.Project.Domain + "-" + *domain.Hostname + ".scnn.me"
		dnsType := "CNAME"
		if domain.DNSType != nil {
			dnsType = *domain.DNSType
		}

		target := "server1.scnn.net"
		if domain.Target != nil {
			target = *domain.Target
		}

		line := fmt.Sprintf("%s %s %s\n", hostname, dnsType, target)
		if _, err := file.WriteString(line); err != nil {
			return gut.Err(false, "Failed to write to file", err)
		}
	}
	fmt.Println("Data written to output.txt successfully!")
	return nil
}
