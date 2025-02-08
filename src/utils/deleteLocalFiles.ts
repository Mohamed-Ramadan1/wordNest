import { resourceCleanupQueue, ResourceCleanupQueueJobs } from "@jobs/index";

export function removeLocalFile(filePath: string, resourceName: string): void {
  resourceCleanupQueue.add(ResourceCleanupQueueJobs.DeleteLocalFiles, {
    resourcePath: filePath,
    resource: resourceName,
  });
}
