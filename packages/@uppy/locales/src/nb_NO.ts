import type { Locale } from '@uppy/utils/lib/Translator'

const nb_NO: Locale<0 | 1> = {
  strings: {},
  pluralize(count) {
    if (count === 1) {
      return 0
    }
    return 1
  },
}

nb_NO.strings = {
  addBulkFilesFailed: {
    '0': 'Kunne ikke legge til %{smart_count} fil på grunn av en intern feil',
    '1': 'Kunne ikke legge til %{smart_count} filer på grunn av en intern feil',
  },
  addMore: 'Legg til',
  addMoreFiles: 'Legg til filer',
  addingMoreFiles: 'Legger til flere filer',
  allowAccessDescription:
    'For å kunne ta bilder eller spille inn video må du gi siden tilgang til å bruke ditt kamera.',
  allowAccessTitle: 'Vennligst gi tilgang til ditt kamera',
  authAborted: 'Autentisering avbrutt',
  aspectRatioLandscape: 'Beskjær landskap (16:9)',
  aspectRatioPortrait: 'Beskjær portrett (9:16)',
  aspectRatioSquare: 'Beskjær kvadrat',
  authenticateWith: 'Koble til %{pluginName}',
  authenticateWithTitle: 'Koble til %{pluginName} for å velge filer',
  back: 'Tilbake',
  backToSearch: 'Tilbake til Søk',
  browse: 'velg',
  browseFiles: 'velg filer',
  browseFolders: 'velg mapper',
  cancel: 'Avbryt',
  cancelUpload: 'Avbryt opplasting',
  chooseFiles: 'Velg filer',
  closeModal: 'Lukk vindu',
  companionError: 'Kobling til Companion feilet',
  companionUnauthorizeHint:
    'For å logge ut av din %{provider}-konto, gå til %{url}',
  complete: 'Fullført',
  connectedToInternet: 'Koblet til internett',
  copyLink: 'Kopier lenke',
  copyLinkToClipboardFallback: 'Kopier URL under',
  copyLinkToClipboardSuccess: 'Lenke kopiert',
  creatingAssembly: 'Forbereder opplasting...',
  creatingAssemblyFailed: 'Transloadit: Kunne ikke opprette Assembly',
  dashboardTitle: 'Filopplaster',
  dashboardWindowTitle: 'Opplastingsvindu (Trykk Esc-knappen for å lukke)',
  dataUploadedOfTotal: '%{complete} av %{total}',
  done: 'Ferdig',
  dropHereOr: 'Dra filer hit eller %{browse}',
  dropHint: 'Dra filer hit',
  dropPasteBoth: 'Dra filer hit, %{browseFiles} eller %{browseFolders}',
  dropPasteFiles: 'Dra filer hit eller %{browseFiles}',
  dropPasteFolders: 'Dra filer hit eller %{browseFolders}',
  dropPasteImportBoth:
    'Dra filer hit %{browseFiles}, %{browseFolders} eller importer fra:',
  dropPasteImportFiles: 'Dra filer hit %{browseFiles} eller importer fra:',
  dropPasteImportFolders: 'Dra filer hit %{browseFolders} eller importer fra:',
  editFile: 'Rediger fil',
  editImage: 'Rediger bilde',
  editing: 'Redigerer %{file}',
  emptyFolderAdded: 'Ingen filer ble lagt til fra tom mappe',
  encoding: 'Koder...',
  enterCorrectUrl:
    'Ugyldig URL: Kontroller at adressen du angir er en direkte lenke til ei fil',
  enterTextToSearch: 'Skriv tekst for å søke etter bilder',
  enterUrlToImport: 'Angi URL for å importere fil',
  exceedsSize: 'Fila er større enn tillatt størrelse på %{size}',
  failedToFetch:
    'Companion kunne ikke hente denne URLen, kontroller at den er riktig',
  failedToUpload: 'Opplasting feilet for %{file}',
  fileSource: 'Filkilde: %{name}',
  filesUploadedOfTotal: {
    '0': '%{complete} av %{smart_count} fil opplastet',
    '1': '%{complete} av %{smart_count} filer opplastet',
  },
  filter: 'Filtrer',
  finishEditingFile: 'Avslutt redigering av fil',
  flipHorizontal: 'Snu horisontalt',
  folderAdded: {
    '0': 'La til %{smart_count} fil fra %{folder}',
    '1': 'La til %{smart_count} filer fra %{folder}',
  },
  generatingThumbnails: 'Genererer miniatyrbilde...',
  import: 'Importer',
  importFrom: 'Importer fra %{name}',
  inferiorSize: 'Fila er mindre enn tillatt størrelse på %{size}',
  loading: 'Laster...',
  logOut: 'Logg ut',
  micDisabled: 'Mikrofontilgang nektet av bruker',
  myDevice: 'Min Enhet',
  noCameraDescription: 'Koble til kamera for å ta bilder eller ta opp video',
  noCameraTitle: 'Kamera ikke tilgjengelig',
  noDuplicates: "Kan ikke legge til '%{fileName}', da den allerede eksisterer",
  noFilesFound: 'Du har ingen filer eller mapper her',
  noInternetConnection: 'Ingen internettilgang',
  noMoreFilesAllowed: 'Kan ikke legge til nye filer mens opplasting pågår',
  openFolderNamed: 'Åpne mappe %{name}',
  pause: 'Pause',
  pauseUpload: 'Stopp opplasting midlertidig',
  paused: 'Midlertidig stoppet',
  poweredBy: 'Drevet av %{uppy}',
  processingXFiles: {
    '0': 'Prosesserer %{smart_count} fil',
    '1': 'Prosesserer %{smart_count} filer',
  },
  recording: 'Opptak pågår',
  recordingLength: 'Lengde på opptak: %{recording_length}',
  recordingStoppedMaxSize:
    'Opptak stoppet fordi fila er i ferd med å overskride tillatt størrelse',
  removeFile: 'Fjern fil',
  resetFilter: 'Nullstill filter',
  resume: 'Fortsett',
  resumeUpload: 'Fortsett opplasting',
  retry: 'Prøv igjen',
  retryUpload: 'Prøv igjen',
  revert: 'Tilbakestill',
  rotate: 'Roter',
  save: 'Lagre',
  saveChanges: 'Lagre endringer',
  searchImages: 'Søk etter bilder',
  selectFileNamed: 'Velg fil %{name}',
  selectX: {
    '0': 'Velg %{smart_count}',
    '1': 'Velg %{smart_count}',
  },
  smile: 'Smil!',
  startCapturing: 'Start skjermopptak',
  startRecording: 'Start videoopptak',
  stopCapturing: 'Stopp skjermopptak',
  stopRecording: 'Stopp videoopptak',
  streamActive: 'Strøm aktiv',
  streamPassive: 'Strøm passiv',
  submitRecordedFile: 'Send inn opptak',
  takePicture: 'Ta bilde',
  timedOut: 'Opplasting stoppet for %{seconds} sekunder, avbryter.',
  unselectFileNamed: 'Fjern markering for %{name}',
  upload: 'Last opp',
  uploadComplete: 'Opplasting ferdig',
  uploadFailed: 'Opplasting feilet',
  uploadPaused: 'Opplasting midlertidig stoppet',
  uploadXFiles: {
    '0': 'Last opp %{smart_count} fil',
    '1': 'Last opp %{smart_count} filer',
  },
  uploadXNewFiles: {
    '0': 'Last opp +%{smart_count} fil',
    '1': 'Last opp +%{smart_count} filer',
  },
  uploading: 'Laster opp',
  uploadingXFiles: {
    '0': 'Laster opp %{smart_count} fil',
    '1': 'Laster opp %{smart_count} filer',
  },
  xFilesSelected: {
    '0': '%{smart_count} fil valgt',
    '1': '%{smart_count} filer valgt',
  },
  xMoreFilesAdded: {
    '0': '%{smart_count} fil lagt til',
    '1': '%{smart_count} filer lagt til',
  },
  xTimeLeft: '%{time} igjen',
  youCanOnlyUploadFileTypes: 'Du kan bare laste opp: %{types}',
  youCanOnlyUploadX: {
    '0': 'Du kan bare laste opp %{smart_count} fil',
    '1': 'Du kan bare laste opp %{smart_count} filer',
  },
  youHaveToAtLeastSelectX: {
    '0': 'Du må velge minst %{smart_count} fil',
    '1': 'Du må velge minst %{smart_count} filer',
  },
  zoomIn: 'Zoom inn',
  zoomOut: 'Zoom ut',
}

// TODO: remove this in the next major?
// @ts-expect-error Uppy can be a global in legacy bundle
if (typeof Uppy !== 'undefined') {
  // @ts-expect-error Uppy can be a global in legacy bundle
  globalThis.Uppy.locales.nb_NO = nb_NO
}

export default nb_NO
