export default interface Locations {
    _id:any,
    location: LocationsDetail
}

interface LocationsDetail {
    properties: Properties,
    geometry: any,
}

interface Properties {
    name: number,
    address: number,
    date: any,
    working_days: any,
    working_hours_end: any,
    remark: any,
    price: any,
    tel: any,
    capability: any,
    available: any
    contacts: any,
    status: any,
    other: any,
    status_text: string,
    updated_at: any,
    created_at: any,
}