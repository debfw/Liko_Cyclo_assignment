import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock OpenLayers modules
jest.mock('ol/Map', () => {
  return jest.fn().mockImplementation(() => ({
    setTarget: jest.fn(),
    addLayer: jest.fn(),
    getView: jest.fn(),
    addControl: jest.fn(),
  }));
});

jest.mock('ol/View', () => {
  return jest.fn().mockImplementation(() => ({}));
});

jest.mock('ol/layer/Tile', () => {
  return jest.fn().mockImplementation(() => ({
    setSource: jest.fn(),
  }));
});

jest.mock('ol/layer/Vector', () => {
  return jest.fn().mockImplementation(() => ({
    setSource: jest.fn(),
    setOpacity: jest.fn(),
    setVisible: jest.fn(),
  }));
});

jest.mock('ol/source/OSM', () => {
  return jest.fn().mockImplementation(() => ({}));
});

jest.mock('ol/source/Vector', () => {
  return jest.fn().mockImplementation(() => ({
    getFormat: jest.fn(() => ({
      readFeatures: jest.fn(() => []),
    })),
    addFeatures: jest.fn(),
  }));
});

jest.mock('ol/proj/proj4', () => ({
  register: jest.fn(),
}));

jest.mock('ol/control', () => ({
  defaults: jest.fn(() => ({
    extend: jest.fn(() => []),
  })),
}));

jest.mock('ol/control/MousePosition', () => {
  return jest.fn().mockImplementation(() => ({}));
});

jest.mock('ol/coordinate', () => ({
  createStringXY: jest.fn(() => jest.fn()),
}));

jest.mock('ol/format/GML', () => {
  return jest.fn().mockImplementation(() => ({}));
});

jest.mock('ol/loadingstrategy', () => ({
  bbox: jest.fn(() => jest.fn()),
}));

jest.mock('proj4', () => ({
  default: {
    defs: jest.fn(),
  },
  defs: jest.fn(),
}));

// Import component after mocks
import OpenLayersMap from '../OpenLayersMap';

describe('OpenLayersMap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<OpenLayersMap />);
    expect(container).toBeTruthy();
  });

  it('renders with custom height', () => {
    const { container } = render(<OpenLayersMap height="500px" />);
    const mapContainer = container.firstChild as HTMLElement;
    expect(mapContainer.style.height).toBe('500px');
  });

  it('renders WFS layer controls', () => {
    render(<OpenLayersMap />);
    expect(screen.getByText('WFS Layer Controls')).toBeInTheDocument();
    expect(screen.getByText('Show WFS Layer')).toBeInTheDocument();
    expect(screen.getByText(/Opacity:/)).toBeInTheDocument();
  });
});