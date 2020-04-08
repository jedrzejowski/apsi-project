/**
 * To jak ma wyglądać API
 *
 * Cała komunikacja będzie odbywała się po REST Api, a argumenty będą przekazywane metodą POST
 *
 */
export interface ApiSchema {
    "/get-device": (id: string) => Device
}

interface Device {
    device_id: string
    battery_state: number
    name: string
}