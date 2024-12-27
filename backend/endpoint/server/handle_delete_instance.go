package serverEndpoint

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/lxc/incus/shared/api"

	"time"
)

func (r *Handler) HandleDeleteInstance(c *fiber.Ctx, hostname string) error {
	state := api.InstanceStatePut{
		Action:   "stop",
		Timeout:  30,
		Force:    true,
		Stateful: false,
	}
	// stop instance
	op, err := r.incus.UpdateInstanceState(hostname, state, "etag123")
	if err != nil {
		return fmt.Errorf("failed to stop instance: %w", err)
	}
	if err := op.Wait(); err != nil {
		return fmt.Errorf("instance stopping operation failed: %w", err)
	}

	time.Sleep(2 * time.Second)

	// delete instance
	op, err = r.incus.DeleteInstance(hostname)
	if err != nil {
		return fmt.Errorf("failed to delete instance: %w", err)
	}
	if err := op.Wait(); err != nil {
		return fmt.Errorf("instance deletion operation failed: %w", err)
	}
	time.Sleep(1 * time.Second)

	return nil

}
