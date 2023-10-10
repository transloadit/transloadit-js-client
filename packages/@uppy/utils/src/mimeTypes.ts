// ___Why not add the mime-types package?
//    It's 19.7kB gzipped, and we only need mime types for well-known extensions (for file previews).
// ___Where to take new extensions from?
//    https://github.com/jshttp/mime-db/blob/master/db.json

export default {
  md: 'text/markdown' as const,
  markdown: 'text/markdown' as const,
  mp4: 'video/mp4' as const,
  mp3: 'audio/mp3' as const,
  svg: 'image/svg+xml' as const,
  jpg: 'image/jpeg' as const,
  png: 'image/png' as const,
  webp: 'image/webp' as const,
  gif: 'image/gif' as const,
  heic: 'image/heic' as const,
  heif: 'image/heif' as const,
  yaml: 'text/yaml' as const,
  yml: 'text/yaml' as const,
  csv: 'text/csv' as const,
  tsv: 'text/tab-separated-values' as const,
  tab: 'text/tab-separated-values' as const,
  avi: 'video/x-msvideo' as const,
  mks: 'video/x-matroska' as const,
  mkv: 'video/x-matroska' as const,
  mov: 'video/quicktime' as const,
  dicom: 'application/dicom' as const,
  doc: 'application/msword' as const,
  docm: 'application/vnd.ms-word.document.macroenabled.12' as const,
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' as const,
  dot: 'application/msword' as const,
  dotm: 'application/vnd.ms-word.template.macroenabled.12' as const,
  dotx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.template' as const,
  xla: 'application/vnd.ms-excel' as const,
  xlam: 'application/vnd.ms-excel.addin.macroenabled.12' as const,
  xlc: 'application/vnd.ms-excel' as const,
  xlf: 'application/x-xliff+xml' as const,
  xlm: 'application/vnd.ms-excel' as const,
  xls: 'application/vnd.ms-excel' as const,
  xlsb: 'application/vnd.ms-excel.sheet.binary.macroenabled.12' as const,
  xlsm: 'application/vnd.ms-excel.sheet.macroenabled.12' as const,
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' as const,
  xlt: 'application/vnd.ms-excel' as const,
  xltm: 'application/vnd.ms-excel.template.macroenabled.12' as const,
  xltx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.template' as const,
  xlw: 'application/vnd.ms-excel' as const,
  txt: 'text/plain' as const,
  text: 'text/plain' as const,
  conf: 'text/plain' as const,
  log: 'text/plain' as const,
  pdf: 'application/pdf' as const,
  zip: 'application/zip' as const,
  '7z': 'application/x-7z-compressed' as const,
  rar: 'application/x-rar-compressed' as const,
  tar: 'application/x-tar' as const,
  gz: 'application/gzip' as const,
  dmg: 'application/x-apple-diskimage' as const,
}
