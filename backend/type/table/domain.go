package table

type Domain struct {
	Id        *uint64   `gorm:"primaryKey"`
	ProjectId *uint64   `gorm:"not null"`
	Project   *Project  `gorm:"foreignKey:ProjectId;references:Id"`
	ServerId  *uint64   `gorm:"null"`
	Server    *Server   `gorm:"foreignKey:ServerId;references:Id"`
	Hostname  *string   `gorm:"type:VARCHAR(255); not null"`
	Service   *string   `gorm:"type:VARCHAR(10); not null"`
	DNSType   *string   `gorm:"type:VARCHAR(6); not null"`
	Target    *string   `gorm:"type:VARCHAR(255); not null"`
	Port      *int      `gorm:"null"`
}
