export default interface EmbedSettings {
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
    theme: Theme.dark,
    colors: {},
    banner: "",
    avatar: "",
}