package table

type UserProject struct {
	UserId    *uint64   `gorm:"not null"`
	ProjectId *uint64   `gorm:"not null"`
	User      *User     `gorm:"foreignKey:UserId;references:Id"`
	Project   *Project  `gorm:"foreignKey:ProjectId;references:Id"`
}
