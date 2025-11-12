import { execSync } from "child_process";

export default async function resetDB() {
  console.log("resetting Database ...");
  try {
    execSync(`cat ./tests/e2e/fixture/drop-tables.sql | docker exec -i local-postgres psql -U postgres -d bookjourney`, {
      stdio: "inherit",
    });
    execSync(`cat ./tests/e2e/fixture/test-dump.sql | docker exec -i local-postgres psql -U postgres -d bookjourney`, { stdio: "inherit" });
    console.log("✅ Database reset complete!");
  } catch (error) {
    console.error("❌ Failed to reset database:", error);
    throw error;
  }
}
