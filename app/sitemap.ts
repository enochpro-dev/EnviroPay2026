import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.enviropay.uk",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://www.enviropay.uk/privacy",
            lastModified: new Date("2025-12-23"),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: "https://www.enviropay.uk/terms",
            lastModified: new Date("2025-12-30"),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
