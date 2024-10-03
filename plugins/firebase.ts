import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Firebase configuration
  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN,
    projectId: config.public.FIREBASE_PROJECT_ID,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.FIREBASE_APP_ID,
    measurementId: config.public.FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Only initialize analytics on the client-side
  let analytics = null;
  if (process.client) {
    analytics = getAnalytics(app);
  }

  const provision = {
    app,
    analytics,
  }

  nuxtApp.vueApp.provide("firebase", provision);
  // Inject $firebase into the Nuxt context
  nuxtApp.provide("firebase", provision);
});
