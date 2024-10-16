import type { Analytics } from "firebase/analytics"
import type { FirebaseApp } from "firebase/app"

/** Strongly typed plugin declarations */

interface Firebase {
  app: FirebaseApp
  analytics: Analytics
}

declare module '#app' {
  interface NuxtApp {
    $firebase: Firebase
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $firebase: Firebase
  }
}

export {}