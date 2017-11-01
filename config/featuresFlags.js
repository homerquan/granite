"use strict";

/**
 * Feature flags
 * Toggle features
 */

var featureToggles = require('feature-toggles');

var flags = {
	widgetAuthCheckHost: false
};

featureToggles.load(flags);

module.exports = {
  featureFlags: featureToggles
} 
