<script lang="ts">
    import type Embed from '$lib/embed';

    export let embed: Embed;

    let themeColors = {
        darkBackground: "hsl(220,calc(1*6.8%),17.3%)"
    }
</script>

<div class="embed-body" style={`
    --profile-gradient-primary-color: ${embed.colors ? embed.colors.primary : themeColors.darkBackground};
    --profile-gradient-secondary-color: ${embed.colors ? embed.colors.secondary : themeColors.darkBackground};
    --profile-padding: ${embed.colors ?  "4px" : "0"}
`}>

</div>

<style lang="scss">
    .embed-body {
        background: linear-gradient(var(--profile-gradient-primary-color), var(--profile-gradient-primary-color) 120px,var(--profile-gradient-secondary-color));
        width: 350px;
        box-shadow: 0 8px 16px hsla(0,calc(1*0%),0%,0.24);
        padding: var(--profile-padding);
        border-radius: 4px;
    }
</style>