import { resourceCleanupQueue, ResourceCleanupQueueType } from "@jobs/index";

export function removeLocalFile(filePath: string, resourceName: string): void {
  resourceCleanupQueue.add(ResourceCleanupQueueType.DeleteLocalFiles, {
    resourcePath: filePath,
    resource: resourceName,
  });
}
