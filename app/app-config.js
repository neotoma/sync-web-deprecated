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
      USERS:            false,
      STORAGES:         false,
      SOURCES:          false,
      CONTENT_TYPES:    false
    }
  },
  SIMULATIONS_ENABLED: true
}