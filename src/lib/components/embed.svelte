<script lang="ts">
    import type Embed from '$lib/embed';
	import { Theme } from '$lib/embed';
	import theme from '$lib/stores/theme';

    import toHtml from 'discord-markdown';
	import twemoji from 'twemoji';

    export let embed: Embed;
    
    const { toHTML } = toHtml;

    const themeColors = {
        dark: {
            background: "hsl(220,6.8%,17.3%)",
            overlay: '#00000099',
            body: '#00000073',
            headerPrimary: "hsla(0,0%,100%, 0.975)",
            headerSecondary: "hsla(0,0%,100%, 0.65)",
            divider: "hsla(0, 0%, 100%, 0.24)",
            textNormal: "hsla(0, 0%, 100%, 0.8)",
            bannerDefault: "#d1dae3",
        },
        light: {
            background: "hsl(210,11.1%,92.9%)",
            overlay: '#ffffff99',
            body: '#ffffff73',
            headerPrimary: "hsla(240,0%,0%, 0.975)",
            headerSecondary: "hsla(0,0%,0%, 0.65)",
            divider: "hsla(0, 0%, 30%, 0.24)",
            textNormal: "hsla(0, 0%, 0%, 0.8)",
            bannerDefault: "#7d8696",
        }
    }

    $: customColors = {
        primary: embed.colors.primary && isColorValid(embed.colors.primary) ? embed.colors.primary : themeColors[embed.theme.toLowerCase()].background,
        secondary: embed.colors.secondary && isColorValid(embed.colors.secondary) ? embed.colors.secondary : embed.colors.primary && isColorValid(embed.colors.primary) ? embed.colors.primary : themeColors[embed.theme.toLowerCase()].background,
    }

    function isColorValid(color: string) {
        if (color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) return true;
        else return false;
    }

    $: oppositeTheme = embed.theme === Theme.light ? Theme.dark : Theme.light; 
</script>

<div class="embed-body" style={`
    --profile-gradient-primary-color: ${customColors.primary};
    --profile-gradient-secondary-color: ${customColors.secondary};
    --profile-gradient-overlay-color: ${themeColors[embed.theme.toLowerCase()].overlay};
    --profile-body-background-color: ${themeColors[embed.theme.toLowerCase()].body};
    --profile-banner-image-url: ${embed.banner ? `url(${embed.banner})` : ""};
    --profile-banner-color: ${embed.colors.banner ? embed.colors.banner : embed.colors.secondary ? embed.colors.secondary : embed.colors.primary? embed.colors.primary : themeColors[embed.theme.toLowerCase()].bannerDefault};

    --banner-height: ${embed.banner ?  "120px" : embed.colors.primary || embed.colors.secondary ? "90px" : "60px"};
    --overlay-display: ${embed.colors.primary || embed.colors.secondary ? "block" : "none"};
    --avatar-position: ${embed.banner ? embed.colors.primary || embed.colors.secondary ? "84px" : "80px" : embed.colors.primary || embed.colors.secondary ? "54px" : "20px"};
    --banner-margin: ${embed.colors.primary || embed.colors.secondary ? "4px 4px 0 4px" : "0"};
    --banner-border-radius: ${embed.colors.primary || embed.colors.secondary ? "4px 4px 0 0" : "7px 7px 0 0"};

    --header-primary: ${themeColors[embed.theme.toLowerCase()].headerPrimary};
    --header-secondary: ${themeColors[embed.theme.toLowerCase()].headerSecondary};
    --divider-color: ${themeColors[embed.theme.toLowerCase()].divider};
    --text-normal: ${themeColors[embed.theme.toLowerCase()].textNormal};
`}>
    <div class="embed-inner">
        <svg class="embed-banner-svg" viewBox={`0 0 ${embed.colors.primary || embed.colors.secondary ? "332px" : "340px"} ${embed.banner ? "120px" : "90px"}`}>
            <mask id="banner-mask">
                <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
                <circle fill="black" cx={58 + (!embed.colors.primary && !embed.colors.secondary ? + 4 : 0)} cy="{embed.banner ? 120 : embed.colors.primary || embed.colors.secondary ? 90 : 60}" r="46"></circle>
            </mask>
            <foreignObject x="0" y="0" width={embed.colors.primary || embed.colors.secondary ? "332px" : "340px"} height={embed.banner ? "120px" : "90px"} overflow="visible" mask="url(#banner-mask)">
                <div class="embed-banner">
                </div>
            </foreignObject>
        </svg>
        <div class="embed-avatar-wrapper">
            {#if embed.avatar}
                <img class="embed-avatar" src={embed.avatar} alt="profile avatar" />
            {:else}
                <div class="embed-avatar" style={`background-color: ${embed.colors.primary ? embed.colors.primary : embed.colors.secondary ? embed.colors.secondary : embed.colors.banner ? embed.colors.banner : themeColors[embed.theme.toLowerCase()].bannerDefault}`}></div>
            {/if}
        </div>
        <div class="embed-content-container">
            <div class="embed-nickname">
                <span>{embed.info.nickname || embed.info.username || "Username"}</span>
                {#if !embed.info.nickname}
                    <span class="embed-discriminator">#{embed.info.discriminator}</span>
                {/if}
                <br/>
                <span class="embed-username">{embed.info.nickname && embed.info.username + "#" + (embed.info.discriminator ? embed.info.discriminator : "0001")}</span>
            </div>
                {#if embed.info.status}
                    <span class="embed-custom-status">
                        {#if !embed.info.emoji_url}
                            {@html twemoji.parse(embed.info.emoji)}
                        {:else}
                            <img class="emoji" draggable="false" src={embed.info.emoji_url} alt="status emoji">
                        {/if}
                        {embed.info.status}
                    </span>
                {:else if embed.info.emoji || embed.info.emoji_url}
                    <div class="embed-emoji-status">
                        {#if !embed.info.emoji_url}
                            {@html twemoji.parse(embed.info.emoji)}
                        {:else}
                            <img class="emoji" draggable="false" src={embed.info.emoji_url} alt="status emoji">
                        {/if}
                    </div>
                {/if}
            <hr/>
        </div>
    </div>
</div>

<style lang="scss">
    .embed-body {
        background: linear-gradient(var(--profile-gradient-primary-color), var(--profile-gradient-primary-color) 120px,var(--profile-gradient-secondary-color));
        width: 340px;
        // box-shadow: 0 8px 16px hsla(0%,0%,0%,0.24);
        border-radius: 8px;
        position: relative;
        margin: 10px;
        z-index: 5;
        display: flex;
        flex-direction: column;
    }
    
    .embed-inner {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .embed-inner:before {
        display: var(--overlay-display);
        border-radius: 4px;
        left: 4px;
        top: 4px;
        height: calc(100% - 8px);
        width: calc(100% - 8px);
        content: "";
        pointer-events: none;
        background-color: var(--profile-gradient-overlay-color);
        position: absolute;
        z-index: -2;
    }

    .embed-banner-svg {
        min-width: calc(340px - 8px);
        margin: var(--banner-margin);
        height: var(--banner-height);
        z-index: 10;
        border-radius: var(--banner-border-radius);
    }

    .embed-banner {
        width: 100%;
        height: 100%;
        background-color: var(--profile-banner-color);
        background-image: var(--profile-banner-image-url);
        background-size: cover;
        background-position: center;
    }

    .embed-avatar-wrapper {
        position: absolute;
        top: var(--avatar-position);
        left: 22px;
        border-radius: 50%;
        width: 80px;
        height: 80px;
    }

    .embed-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    .embed-content-container {
        margin: 50px 16px 16px;
        background-color: var(--profile-body-background-color);
        border-radius: 8px;
        padding: 12px;
        gap: 12px;
        display: flex;
        flex-direction: column;
    }

    .embed-nickname {
        font-size: 20px;
        color: var(--header-primary);
        font-weight: bold;
    }

    .embed-username {
        font-size: 14px;
        color: var(--header-secondary);
        font-weight: normal;
    }

    .embed-discriminator {
        color: var(--header-secondary);
    }

    .embed-custom-status {
        line-height: 18px;
        font-size: 16px;
        color: var(--text-normal);
    }

    hr {
        border: 0;
        background-color: var(--divider-color) !important;
        height: 1px;
        width: 100%;
        margin: 0;
    }
</style>