import http from "@/request";
export const getCameraData = (): Promise<GeoJSON.FeatureCollection> => {
  return http({
    url: "/geo/cameraData",
    method: "GET",
  });
};
