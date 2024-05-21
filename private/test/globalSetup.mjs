import { vi } from 'vitest' // eslint-disable-line import/no-extraneous-dependencies
import { webcrypto } from 'node:crypto'
import EventSource from 'eventsource';

global.EventSource = EventSource;

vi.stubGlobal('crypto', webcrypto)
