// Simplified events tracking (can be expanded later)
export interface Event {
  name: string
  properties?: Record<string, any>
}

export function trackEvent(event: Event | string, properties?: Record<string, any>) {
  if (typeof event === "string") {
    console.log("Event tracked:", event, properties)
  } else {
    console.log("Event tracked:", event.name, event.properties)
  }
}