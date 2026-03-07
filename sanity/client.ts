
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "1bb4q5gv",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});