
import { KeyValuePair } from "./IKeyValuePair";
import { Contact } from "./IContact";

export interface Vehicle {
    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;
}

