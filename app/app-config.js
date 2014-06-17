/* Ember Configuration */

var APP_CONFIG = {
  INIT: {
    LOG_TRANSITIONS:            false,
    LOG_TRANSITIONS_INTERNAL:   false,
  },
  DATA: {
    HOST:               'http://127.0.0.1:9090',
    NAMESPACE:          null, // e.g. 'v1'
    ADAPTER:            'rest', // or fixture
    FIXTURES_ENABLED: {
      STORAGE_SURVEYS:  false,
      USERS:            false,
      STORAGES:         false,
      SOURCES:          false,
      CONTENT_TYPES:    false
    }
  },
  SIMULATIONS_ENABLED: false
}