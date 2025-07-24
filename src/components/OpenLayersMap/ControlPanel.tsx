import React from "react";
import {
  Paper,
  Title,
  Stack,
  Switch,
  Slider,
  Group,
  Text,
  Loader,
  Alert,
} from "@mantine/core";
import { CONTROL_PANEL_WIDTH } from "./constants";
import { useMapContext } from "./context/MapContext";

export const ControlPanel = () => {
  const {
    showBuildings,
    setShowBuildings,
    showHighBuildings,
    setShowHighBuildings,
    opacity,
    setOpacity,
    isLoading,
    featureCount,
  } = useMapContext();

  return (
    <Paper
      shadow="xl"
      radius="lg"
      p="xl"
      style={{
        width: CONTROL_PANEL_WIDTH,
        background: "#181A1B",
        color: "#fff",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Stack gap="md">
        <Title order={2} size="h4" style={{ color: "#fff" }}>
          Layer Controls
        </Title>

        {isLoading && showBuildings && (
          <Alert
            variant="light"
            color="blue"
            title="Loading Building Data"
            icon={<Loader size="sm" />}
            style={{ background: "#1E3A8A", border: "1px solid #3B82F6" }}
          >
            <Text size="sm" c="blue.2">
              Fetching building data from PDOK WFS service...
            </Text>
          </Alert>
        )}

        <Paper radius="md" p="md" style={{ background: "#23272A" }}>
          <Stack gap="xs">
            <Title order={3} size="h5" style={{ color: "#fff" }}>
              WFS Buildings
            </Title>

            {featureCount > 0 && (
              <Text size="xs" c="dimmed">
                Buildings loaded: {featureCount.toLocaleString()}
              </Text>
            )}

            <Switch
              label={<Text c="#fff">Show Buildings</Text>}
              checked={showBuildings}
              onChange={(event) =>
                setShowBuildings(event.currentTarget.checked)
              }
              color="blue"
              size="md"
              mt="md"
            />

            <Switch
              label={<Text c="#fff">High buildings only (&gt;10 floors)</Text>}
              checked={showHighBuildings}
              onChange={(event) =>
                setShowHighBuildings(event.currentTarget.checked)
              }
              color="red"
              size="md"
              disabled={!showBuildings}
            />

            <Group justify="space-between" mt="md" mb={-8}>
              <Text size="sm" c="#fff">
                Transparency
              </Text>
              <Text size="sm" c="blue.4" fw={700}>
                {Math.round(opacity * 100)}%
              </Text>
            </Group>

            <Slider
              min={0}
              max={1}
              step={0.05}
              value={opacity}
              onChange={setOpacity}
              color="blue"
              marks={[
                { value: 0, label: "0%" },
                { value: 0.5, label: "50%" },
                { value: 1, label: "100%" },
              ]}
              styles={{
                markLabel: { color: "#aaa", fontWeight: 500 },
                thumb: { borderColor: "#3B82F6", background: "#3B82F6" },
                track: { background: "#222" },
              }}
            />
          </Stack>
        </Paper>
      </Stack>
    </Paper>
  );
};
