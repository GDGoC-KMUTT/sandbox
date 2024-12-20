package table

type Server struct {
	Id        *uint64   `gorm:"primaryKey"`
	ProjectId *uint64   `gorm:"not null"`
	Project   *Project  `gorm:"foreignKey:ProjectId;references:Id"`
	Hostname  *string   `gorm:"type:VARCHAR(255); not null"`
	Username  *string   `gorm:"type:VARCHAR(255); not null"`
	Password  *string   `gorm:"type:VARCHAR(255); not null"`
	IP        *string   `gorm:"type:VARCHAR(255); not null"`
	OS        *string   `gorm:"type:VARCHAR(255); not null"`
	VCPU      *int      `gorm:"not null"`
	Memory    *int      `gorm:"not null"`
}
