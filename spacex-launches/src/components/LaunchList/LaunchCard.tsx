import { Card, Image, Text, Group, Button } from "@mantine/core";
import { Launch } from "../../types/launch";

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: (launch: Launch) => void;
}

export function LaunchCard({ launch, onSeeMore }: LaunchCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
        <Image
          src={launch.links?.mission_patch_small || "/placeholder-rocket.png"}
          height={160}
          alt={launch.mission_name}
          fit="contain"
          p="md"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{launch.mission_name}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        Rocket: {launch.rocket?.rocket_name}
      </Text>

      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => onSeeMore(launch)}
      >
        See more
      </Button>
    </Card>
  );
}
