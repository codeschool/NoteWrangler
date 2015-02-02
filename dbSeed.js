// This would normally be in a grunt task or something similar and ran separately 
// when you setup the app, but it makes for a simpler demo app to just run this here.
// We use find_or_create calls so that data doesn't get overwritten if it exists.
require('./app/server/modules/dataSeeds').seed();
