import { useState, useRef } from "react";
import { Animated } from "react-native";
export type ThemeMode = "light" | "dark";

export interface ThemeAnimations {
  // Define interface for the return type
  theme: ThemeMode;
  containerBackgroundColor: Animated.AnimatedInterpolation<string>;
  textColor: Animated.AnimatedInterpolation<string>;
  invertTextColor: Animated.AnimatedInterpolation<string>;
  sidebarBackgroundColor: Animated.AnimatedInterpolation<string>;
  mainContentBackgroundColor: Animated.AnimatedInterpolation<string>;
  buttonBackgroundColor: Animated.AnimatedInterpolation<string>;
  borderBottomColor: Animated.AnimatedInterpolation<string>;
  toggleTheme: () => void;
}

/**
 * React hook for managing and animating light/dark theme transitions.
 *
 * This hook:
 * - Maintains the current theme mode ("light" or "dark") in state.
 * - Creates and stores `Animated.Value` references for animating UI colors.
 * - Interpolates multiple themed color values (backgrounds, text, buttons, borders)
 *   from light to dark mode and vice versa.
 * - Provides a `toggleTheme` function that smoothly animates between modes.
 *
 * @returns {ThemeAnimations} An object containing:
 *   - `theme`: The current theme mode ("light" or "dark").
 *   - `containerBackgroundColor`: Animated color for main container.
 *   - `textColor`: Animated color for standard text.
 *   - `invertTextColor`: Animated inverted text color.
 *   - `sidebarBackgroundColor`: Animated color for sidebar areas.
 *   - `mainContentBackgroundColor`: Animated color for main content areas.
 *   - `buttonBackgroundColor`: Animated color for buttons.
 *   - `borderBottomColor`: Animated color for bottom borders.
 *   - `toggleTheme()`: Function to toggle the theme with animation.
 */
export function useThemeAnimations(): ThemeAnimations {
  // State to conditionally render the style type of the components (can only be "light" or "dark")
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Creating animated values using useRef for UI animation
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const textColorAnim = useRef(new Animated.Value(0)).current;
  const borderBottomAnim = useRef(new Animated.Value(0)).current;

  // Interpolate background color based on light or dark mode
  const containerBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F5F5F5", "#1A1A1A"], // Light to dark
  });
  // Interpolate text color based on light or dark mode
  const textColor = textColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#2C3E50", "#FFFFFF"], // Light to dark
  });
  // Interpolate text color based on light or dark mode
  const invertTextColor = textColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#2C3E50"], // Light to dark
  });
  // Interpolate sidebar bg color based on light or dark mode
  const sidebarBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ECF0F1", "#4A627A"], // Light to dark
  });
  // Interpolate mainContent container bg color based on light or dark mode
  const mainContentBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#A3B9D3"], // Light to dark
  });
  // Interpolate button bg color based on light or dark mode
  const buttonBackgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#2C3E50", "#FFFFFF"], // Light to dark
  });
  // Interpolate border bottom color based on light or dark mode
  const borderBottomColor = borderBottomAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#2C3E50", "#FFFFFF"], // Light to dark transition
  });

  // Toggles between light and dark mode by animating background, text, and border properties smoothly
  const toggleTheme = () => {
    const toValue = theme === "light" ? 1 : 0;
    Animated.parallel([
      Animated.timing(backgroundColorAnim, {
        toValue,
        duration: 500,
        useNativeDriver: false, // `backgroundColor` is not supported by native driver
      }),
      Animated.timing(textColorAnim, {
        toValue,
        duration: 500,
        useNativeDriver: false, // `color` is not supported by native driver
      }),
      Animated.timing(borderBottomAnim, {
        toValue,
        duration: 500,
        useNativeDriver: false, // Can't use native driver for border properties
      }),
    ]).start(() => {
      setTheme(theme === "light" ? "dark" : "light");
    });
  };

  return {
    theme,
    containerBackgroundColor,
    textColor,
    invertTextColor,
    sidebarBackgroundColor,
    mainContentBackgroundColor,
    buttonBackgroundColor,
    borderBottomColor,
    toggleTheme,
  };
}
