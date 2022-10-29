import { writable } from "svelte/store";
import { browser } from "$app/environment";

let storageName = "disc-theme"; 
let defaultValue = 'dark';
const initialValue = browser ? window.localStorage.getItem(storageName) ?? defaultValue : defaultValue;

const theme = writable<string>(initialValue);

theme.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem(storageName, value);
    }
});

export default theme;