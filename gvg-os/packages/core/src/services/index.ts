/**
 * @gvg/core/services — platform service façades
 *
 * AuditService · StorageService · CacheService
 * MailService · NotificationService · SearchService
 */

export { AuditService, createAuditService } from "./AuditService";
export { StorageService, createStorageService } from "./StorageService";
export { CacheService, createCacheService } from "./CacheService";
export {
  MailService,
  MemoryMailTransport,
  createMailService,
} from "./MailService";
export type {
  MailAddress,
  MailMessage,
  SendMailInput,
  MailTransport,
} from "./MailService";
export {
  NotificationService,
  createNotificationService,
} from "./NotificationService";
export { SearchService, createSearchService } from "./SearchService";
export type {
  SearchDocument,
  SearchHit,
  SearchQuery,
} from "./SearchService";
