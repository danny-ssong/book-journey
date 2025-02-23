"use client";
import { useTheme } from "next-themes";
import { useState, useEffect, useLayoutEffect } from "react";

export function usePrimaryColorHsl() {
  const { theme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState<string>("");
  const [darkerPrimaryColor, setDarkerPrimaryColor] = useState<string>("");

  useLayoutEffect(() => {
    setTimeout(() => {
      const computedPrimary = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();

      const colorParts = computedPrimary.split(" ");
      if (colorParts.length === 3) {
        const hue = colorParts[0].trim();
        const saturation = colorParts[1].trim();
        const lightness = colorParts[2].trim();

        const lightnessValue = parseFloat(lightness.replace("%", ""));

        const darkerLightnessValue = Math.max(0, lightnessValue - 20);

        const primaryColorString = `hsl(${hue}, ${saturation}, ${lightness})`;
        const darkerPrimaryColorString = `hsl(${hue}, ${saturation}, ${darkerLightnessValue}%)`;

        setPrimaryColor(primaryColorString);
        setDarkerPrimaryColor(darkerPrimaryColorString);
      }
    }, 0);
  }, [theme]);

  return { primaryColor, darkerPrimaryColor };
}
