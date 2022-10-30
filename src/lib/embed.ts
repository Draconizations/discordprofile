export default interface EmbedSettings {
    dprofileVersion: number,
    theme: Theme,
    colors: {
        primary?: string,
        secondary?: string,
        banner?: string,
    },
    banner: string,
    avatar: string,
}

export enum Theme {
    light = 'Light', dark = 'Dark'
}

export const defaultEmbed: EmbedSettings = {
    dprofileVersion: 1,
    theme: Theme.dark,
    colors: {},
    banner: "",
    avatar: "",
}