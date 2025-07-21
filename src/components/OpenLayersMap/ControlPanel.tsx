import React from "react";
import {
  Paper,
  Title,
  Stack,
  Switch,
  Slider,
  Group,
  Text,
} from "@mantine/core";
import { CONTROL_PANEL_WIDTH } from "./constants";

interface ControlPanelProps {
  showBuildings: boolean;
  setShowBuildings: (value: boolean) => void;
  showHighBuildings: boolean;
  setShowHighBuildings: (value: boolean) => void;
  opacity: number;
  setOpacity: (value: number) => void;
  isLoading: boolean;
  featureCount: number;
}

export const ControlPanel = ({
  showBuildings,
  setShowBuildings,
  showHighBuildings,
  setShowHighBuildings,
  opacity,
  setOpacity,
  isLoading,
  featureCount,
}: ControlPanelProps) => {
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

            {isLoading && showBuildings && (
              <Text size="xs" c="dimmed" style={{ marginTop: -8 }}>
                Loading building data...
              </Text>
            )}

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

        <Text size="xs" c="dimmed">
          Blue borders: All buildings
          <br />
          Red borders: Buildings with &gt;10 floors
          <br />
          Data source: PDOK BAG WFS service
        </Text>
      </Stack>
    </Paper>
  );
};
