<script lang="ts">
    import type Embed from '$lib/embed';
	import { Theme } from '$lib/embed';

    export let embed: Embed;

    const themeColors = {
        dark: {
            background: "hsl(220,calc(1*6.8%),17.3%)",
            overlay: '#00000099',
            body: '#00000073',
        },
        light: {
            background: "hsl(210,calc(1*11.1%),92.9%)",
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
</script>

<div class="embed-body" style={`
    --profile-gradient-primary-color: ${customColors.primary};
    --profile-gradient-secondary-color: ${customColors.secondary};
    --profile-gradient-overlay-color: ${themeColors[embed.theme.toLowerCase()].overlay};
    --profile-body-background-color: ${themeColors[embed.theme.toLowerCase()].body};
    --profile-banner-image-url: ${embed.banner ? `url(${embed.banner})` : ""};
    --profile-banner-color: ${embed.colors.banner ? embed.colors.banner : embed.colors.primary ? embed.colors.primary : embed.theme === Theme.dark ? "#d1dae3" : "#7d8696"};
    
    --banner-height: ${embed.banner ? "120px" : "90px"};
    --overlay-display: ${embed.colors.primary || embed.colors.secondary ? "block" : "none"};
`}>
    <svg class="embed-banner-svg">
        <mask id="banner-mask">
            <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
            <circle fill="black" cx="58" cy="{embed.banner ? 112 : 82}" r="46"></circle>
        </mask>
        <foreignObject x="0" y="0" width="100%" height="100%" overflow="visible" mask="url(#banner-mask)">
            <div class="embed-banner">
            </div>
        </foreignObject>
    </svg>
</div>

<style lang="scss">
    .embed-body {
        background: linear-gradient(var(--profile-gradient-primary-color), var(--profile-gradient-primary-color) 120px,var(--profile-gradient-secondary-color));
        width: 340px;
        box-shadow: 0 8px 16px hsla(0,calc(1*0%),0%,0.24);
        border-radius: 4px;
        min-height: 500px;
        position: relative;
        margin: 1rem 1rem 1.5rem 1rem;
        z-index: 5;
    }

    .embed-body:before {
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
        margin: 4px 0 0 4px;
        height: var(--banner-height);
        z-index: 10;
    }

    .embed-banner {
        width: 100%;
        height: 100%;
        background-color: var(--profile-banner-color);
        background-image: var(--profile-banner-image-url);
        background-size: cover;
        background-position: center;
    }
</style>