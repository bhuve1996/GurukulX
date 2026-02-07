import type { MetadataRoute } from "next";
import { ui } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ui.site.name,
    short_name: ui.site.name,
    description: ui.site.description,
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
