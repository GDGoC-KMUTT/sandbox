package table

import "time"

type Project struct {
	Id        *uint64    `gorm:"primaryKey"`
	Name      *string    `gorm:"type:VARCHAR(255); not null"`
	Domain    *string    `gorm:"type:VARCHAR(255); not null"`
	Users     []User     `gorm:"many2many:user_projects;" json:"users"`
	CreatedAt *time.Time `gorm:"not null; default:CURRENT_TIMESTAMP"`
}
