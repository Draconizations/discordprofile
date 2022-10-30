<script lang="ts">
    import type Embed from '$lib/embed';
	import { Theme } from '$lib/embed';

    export let embed: Embed;

    const themeColors = {
        dark: {
            background: "hsl(220,6.8%,17.3%)",
            overlay: '#00000099',
            body: '#00000073',
        },
        light: {
            background: "hsl(210,11.1%,92.9%)",
            overlay: '#ffffff99',
            body: '#ffffff73'
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
    --profile-banner-color: ${embed.colors.banner ? embed.colors.banner : embed.colors.secondary ? embed.colors.secondary : embed.colors.primary? embed.colors.primary : embed.theme === Theme.dark ? "#d1dae3" : "#7d8696"};
    
    --banner-height: ${embed.banner ?  "120px" : embed.colors.primary || embed.colors.secondary ? "90px" : "60px"};
    --overlay-display: ${embed.colors.primary || embed.colors.secondary ? "block" : "none"};
    --avatar-position: ${embed.banner ? embed.colors.primary || embed.colors.secondary ? "84px" : "80px" : embed.colors.primary || embed.colors.secondary ? "54px" : "20px"};
    --banner-margin: ${embed.colors.primary || embed.colors.secondary ? "4px 4px 0 4px" : "0"};
`}>
    <div class="embed-inner">
        <svg class="embed-banner-svg">
            <mask id="banner-mask">
                <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
                <circle fill="black" cx={58 + (!embed.colors.primary && !embed.colors.secondary ? + 4 : 0)} cy="{embed.banner ? 120 : embed.colors.primary || embed.colors.secondary ? 90 : 60}" r="46"></circle>
            </mask>
            <foreignObject x="0" y="0" width="100%" height="100%" overflow="visible" mask="url(#banner-mask)">
                <div class="embed-banner">
                </div>
            </foreignObject>
        </svg>
        <div class="embed-avatar-wrapper">
            {#if embed.avatar}
                <img class="embed-avatar" src={embed.avatar} alt="profile avatar" />
            {:else}
                <div class="embed-avatar" style={`background-color: ${themeColors[oppositeTheme.toLowerCase()].background}`}></div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .embed-body {
        background: linear-gradient(var(--profile-gradient-primary-color), var(--profile-gradient-primary-color) 120px,var(--profile-gradient-secondary-color));
        width: 340px;
        box-shadow: 0 8px 16px hsla(0%,0%,0%,0.24);
        border-radius: 8px;
        min-height: 500px;
        position: relative;
        margin: 1rem 1rem 1.5rem 1rem;
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
        border-radius: 4px 4px 0 0;
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
</style>