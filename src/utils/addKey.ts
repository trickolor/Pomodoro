import { generateRandomString } from "./generateRandomString";
import { merger } from "./merger";

export function addKey<T>(obj: T): T & Record<'key', string> {
    const randomString = generateRandomString();
    return merger(obj, 'key', randomString);
}