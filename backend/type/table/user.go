package table

import "time"

type User struct {
	Id        *uint64    `gorm:"primaryKey"`
	Oid       *string    `gorm:"type:VARCHAR(255); index:idx_user_oid,unique; not null"`
	Firstname *string    `gorm:"type:VARCHAR(255); not null"`
	Lastname  *string    `gorm:"type:VARCHAR(255); not null"`
	Email     *string    `gorm:"type:VARCHAR(255); index:idx_user_email,unique; not null"`
	PhotoUrl  *string    `gorm:"type:TEXT; null"`
	Projects  []Project  `gorm:"many2many:user_projects;" json:"projects"`
	CreatedAt *time.Time `gorm:"not null"`
	UpdatedAt *time.Time `gorm:"not null"`
}
