/* Ember Configuration */

var APP_CONFIG = {
  INIT: {
    LOG_TRANSITIONS:            false,
    LOG_TRANSITIONS_INTERNAL:   false,
  },
  DATA: {
    API_NAMESPACE: 'v1',
    ADAPTER: 'fixture', // or, rest
    FIXTURES_ENABLED: {
      STORAGE_SURVEYS:  false,
      USERS:            true,
      STORAGES:         true,
      SOURCES:          true,
      CONTENT_TYPES:    true
    }
  },
  SIMULATIONS_ENABLED: true
}