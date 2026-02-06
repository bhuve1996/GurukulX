import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GurukulX",
    short_name: "GurukulX",
    description: "Learn AI — notes, shorts, quizzes, practice.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#171717",
    orientation: "portrait-primary",
    icons: [
      { src: "/icon", type: "image/png", sizes: "192x192", purpose: "any" },
      { src: "/icon", type: "image/png", sizes: "192x192", purpose: "maskable" },
    ],
  };
}
