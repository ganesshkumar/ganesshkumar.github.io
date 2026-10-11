import { getFeaturedSeries } from "@/lib/series";
import { FeaturedSeriesComponent } from "./featured-series-component";

export function FeaturedSeriesContainer() {
  const series = getFeaturedSeries();
  if (!series) return null;
  return <FeaturedSeriesComponent data={series} />;
}
