export default interface EmbedSettings {
    theme: Theme,
    colors: {
        primary?: string,
        secondary?: string
    }
}

export enum Theme {
    light = 'Light', dark = 'Dark'
}

export const defaultEmbed: EmbedSettings = {
    theme: Theme.dark,
    colors: {}
}