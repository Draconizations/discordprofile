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
    info: {
        username: string,
        nickname: string,
        discriminator: string,
        status: string,
        emoji: string,
        emoji_url: string,
    }
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
    info: {
        username: "Username",
        nickname: "Nickname",
        discriminator: "0001",
        status: "status message...",
        emoji: "✨",
        emoji_url: ""
    }
}