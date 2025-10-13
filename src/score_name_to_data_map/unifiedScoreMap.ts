import { Platform } from "react-native";
import { Asset } from "expo-asset";

interface ScoreDataFiles {
  refAudio: {
    web: string; // Web path (public folder)
    ios: any; // iOS Expo asset require()
    android: any; // Android Expo asset require()
  };
  csvData: {
    web: string;
    ios: any;
    android: any;
  };
}

export const unifiedScoreMap: Record<string, ScoreDataFiles> = {
  air_on_the_g_string: {
    refAudio: {
      web: "/air_on_the_g_string/baseline/instrument_0.wav",
      ios: require("../../assets/air_on_the_g_string/baseline/instrument_0.wav"),
      android: require("../../assets/air_on_the_g_string/baseline/instrument_0.wav"),
    },
    csvData: {
      web: "/air_on_the_g_string/baseline/aotgs_solo_100bpm.csv",
      ios: require("../../assets/air_on_the_g_string/baseline/aotgs_solo_100bpm.csv"),
      android: require("../../assets/air_on_the_g_string/baseline/aotgs_solo_100bpm.csv"),
    },
  },

  schumann_melodyVLCduet: {
    refAudio: {
      web: "/schumann_melodyVLCduet/baseline/instrument_0.wav",
      ios: require("../../assets/schumann_melodyVLCduet/baseline/instrument_0.wav"),
      android: require("../../assets/schumann_melodyVLCduet/baseline/instrument_0.wav"),
    },
    csvData: {
      web: "/schumann_melodyVLCduet/baseline/schumann_melody_4sec.csv",
      ios: require("../../assets/schumann_melodyVLCduet/baseline/schumann_melody_4sec.csv"),
      android: require("../../assets/schumann_melodyVLCduet/baseline/schumann_melody_4sec.csv"),
    },
  },

  ode_to_joy: {
    refAudio: {
      web: "/ode_to_joy/baseline/instrument_0.wav",
      ios: require("../../assets/ode_to_joy/baseline/instrument_0.wav"),
      android: require("../../assets/ode_to_joy/baseline/instrument_0.wav"),
    },
    csvData: {
      web: "/ode_to_joy/baseline/ode_to_joy_300bpm.csv",
      ios: require("../../assets/ode_to_joy/baseline/ode_to_joy_300bpm.csv"),
      android: require("../../assets/ode_to_joy/baseline/ode_to_joy_300bpm.csv"),
    },
  },
};

const getPlatformAsset = (assets: {
  web: string;
  ios: any;
  android: any;
}): string | any => {
  if (Platform.OS === "web") {
    return assets.web;
  } else if (Platform.OS === "ios") {
    return Asset.fromModule(assets.ios).uri;
  } else if (Platform.OS === "android") {
    return Asset.fromModule(assets.android).uri;
  } else {
    return Asset.fromModule(assets.ios).uri;
  }
};

// Helper functions for cross-platform access
export const getScoreRefAudio = (scoreName: string): string | any => {
  const score = unifiedScoreMap[scoreName];
  if (!score) throw new Error(`Score not found: ${scoreName}`);
  return getPlatformAsset(score.refAudio);
};

export const getScoreCSVData = (scoreName: string): string | any => {
  const score = unifiedScoreMap[scoreName];
  if (!score) throw new Error(`Score not found: ${scoreName}`);
  return getPlatformAsset(score.csvData);
};
