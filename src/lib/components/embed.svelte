<script lang="ts">
    import type Embed from '$lib/embed';
	import { Theme } from '$lib/embed';

    export let embed: Embed;

    let themeColors = {
        darkBackground: "hsl(220,calc(1*6.8%),17.3%)",
        lightBackground: "hsl(210,calc(1*11.1%),92.9%);"
    }

    $: colors = {
        background: embed.theme === Theme.dark ? themeColors.darkBackground : themeColors.lightBackground
    }

</script>

<div class="embed-body" style={`
    --profile-gradient-primary-color: ${embed.colors ? embed.colors.primary : colors.background};
    --profile-gradient-secondary-color: ${embed.colors ? embed.colors.secondary : colors.background};
    --profile-padding: ${embed.colors ?  "4px" : "0"}
`}>

</div>

<style lang="scss">
    .embed-body {
        margin: auto;
        background: linear-gradient(var(--profile-gradient-primary-color), var(--profile-gradient-primary-color) 120px,var(--profile-gradient-secondary-color));
        width: 350px;
        box-shadow: 0 8px 16px hsla(0,calc(1*0%),0%,0.24);
        padding: var(--profile-padding);
        border-radius: 4px;
        min-height: 100px;
    }
</style>