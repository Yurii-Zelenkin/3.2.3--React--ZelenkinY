import {
  Grid,
  Text,
  Container,
  Title,
  Card,
  Button,
  Loader,
} from "@mantine/core";
import { useSpaceXLaunches } from "../../hooks/useSpaceXLaunches";
import { LaunchModal } from "./LaunchModal";
import type { Launch } from "../../types/launch";

export function LaunchList() {
  const {
    launches,
    loading,
    error,
    selectedLaunch,
    modalOpen,
    openModal,
    closeModal,
  } = useSpaceXLaunches();

  if (error) {
    return (
      <Container>
        <Text c="red">Error: {error}</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl" ta="center">
        SpaceX Launches 2020
      </Title>

      <div style={{ position: "relative", minHeight: "400px" }}>
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Loader size="xl" variant="bars" />
            <Text size="xl" fw={600}>
              Loading SpaceX Launches
            </Text>
            <Text size="sm" c="dimmed">
              Fetching data from SpaceX API...
            </Text>
          </div>
        )}

        {!loading && (
          <Grid>
            {launches.map((launch: Launch) => (
              <Grid.Col
                key={launch.flight_number}
                span={{ base: 12, sm: 6, md: 4 }}
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    height: "320px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      marginBottom: "16px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {launch.links?.mission_patch_small && (
                      <img
                        src={launch.links.mission_patch_small}
                        alt={launch.mission_name}
                        style={{
                          height: "100px",
                          objectFit: "contain",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  <Text
                    fw={700}
                    size="lg"
                    mb="xs"
                    style={{ flex: "0 0 auto", width: "100%" }}
                  >
                    {launch.mission_name}
                  </Text>

                  <Text
                    size="md"
                    c="dimmed"
                    mb="md"
                    style={{ flex: "0 0 auto", width: "100%" }}
                  >
                    {launch.rocket?.rocket_name}
                  </Text>

                  <div
                    style={{
                      marginTop: "auto",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => openModal(launch)}
                      size="md"
                      style={{
                        minWidth: "120px",
                      }}
                    >
                      See more
                    </Button>
                  </div>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}

        {launches.length === 0 && !loading && (
          <Text ta="center" c="dimmed" mt="xl">
            No launches found
          </Text>
        )}
      </div>

      <LaunchModal
        launch={selectedLaunch}
        isOpen={modalOpen}
        onClose={closeModal}
      />
    </Container>
  );
}
