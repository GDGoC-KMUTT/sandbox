package table

import "time"

type ProxyLog struct {
	Id        *uint64    `gorm:"primaryKey"`
	DomainId  *uint64    `gorm:"not null"`
	Path      *string    `gorm:"type:VARCHAR(255); not null"`
	CreatedAt *time.Time `gorm:"not null"`
	UpdatedAt *time.Time `gorm:"not null"`
}
