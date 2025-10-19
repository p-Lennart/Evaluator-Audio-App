import { Platform } from "react-native";
import { Asset } from "expo-asset";

interface AssetMap {
  web: string;           // Web path (public folder)
  ios: any;              // iOS Expo asset require()
  android: any;          // Android Expo asset require()
}

interface ScoreDataFiles {
  refAudio: AssetMap;
  csvData: AssetMap;
}

export const unifiedScoreMap: Record<string, ScoreDataFiles> = {
  schumann_melody: {
    refAudio: {
      web: "/schumann_melody/live.wav",
      ios: require("../../assets/schumann_melody/live.wav"),
      android: require("../../assets/schumann_melody/live.wav"),
    },
    csvData: {
      web: "/schumann_melody/schumann_melody_4sec.csv",
      ios: require("../../assets/schumann_melody/schumann_melody_4sec.csv"),
      android: require("../../assets/schumann_melody/schumann_melody_4sec.csv"),
    },
  },

  go_tell_aunt_rhody: {
    refAudio: {
      web: "/go_tell_aunt_rhody/5_go_tell_aunt_rhody-Violoncello50_ref.wav",
      ios: require("../../assets/go_tell_aunt_rhody/5_go_tell_aunt_rhody-Violoncello50_ref.wav"),
      android: require("../../assets/go_tell_aunt_rhody/5_go_tell_aunt_rhody-Violoncello50_ref.wav"),
    },
    csvData: {
      web: "/go_tell_aunt_rhody/5_go_tell_aunt_rhody_50_performance.csv",
      ios: require("../../assets/go_tell_aunt_rhody/5_go_tell_aunt_rhody_50_performance.csv"),
      android: require("../../assets/go_tell_aunt_rhody/5_go_tell_aunt_rhody_50_performance.csv"),
    },
  },

  air_on_the_g_string: {
    refAudio: {
      web: "/air_on_the_g_string/aotgs_solo_ref.wav",
      ios: require("../../assets/air_on_the_g_string/aotgs_solo_ref.wav"),
      android: require("../../assets/air_on_the_g_string/aotgs_solo_ref.wav"),
    },
    csvData: {
      web: "/air_on_the_g_string/aotgs_solo_100bpm.csv",
      ios: require("../../assets/air_on_the_g_string/aotgs_solo_100bpm.csv"),
      android: require("../../assets/air_on_the_g_string/aotgs_solo_100bpm.csv"),
    },
  },

  ode_to_joy: {
    refAudio: {
      web: "/ode_to_joy/o2j_ref.wav",
      ios: require("../../assets/ode_to_joy/o2j_ref.wav"),
      android: require("../../assets/ode_to_joy/o2j_ref.wav"),
    },
    csvData: {
      web: "/ode_to_joy/ode_to_joy_300bpm_NEW.csv",
      ios: require("../../assets/ode_to_joy/ode_to_joy_300bpm_NEW.csv"),
      android: require("../../assets/ode_to_joy/ode_to_joy_300bpm_NEW.csv"),
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
