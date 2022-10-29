<script lang="ts">
    import currentTheme from "$lib/stores/theme";
    import type EmbedSettings from '$lib/embed';
    import { Theme } from '$lib/embed';
    import savedEmbed from '$lib/stores/embed';
    import { defaultEmbed } from '$lib/embed';

	import Embed from "$lib/components/embed.svelte";

    let embed = {...defaultEmbed, ...$savedEmbed};

</script>

<main class={`${$currentTheme ? "disc-" + $currentTheme : ""}`}>
    <div class="scroller">
        <div class="center"><h1>Profilebuilder ✨</h1></div>
        <p class="center">A simple utility that lets you create fake discord profiles.</p>
        <hr/>
        <h3>Colors</h3>
        <div class="row">
            <div class="col-6">
                <label for="color-theme-base">Theme</label>
                <div class="row">
                    <select bind:value={embed.theme} class="col-12">
                        {#each Object.keys(Theme) as theme}
                            <option value={Theme[theme]}>{theme[0].toUpperCase() + theme.slice(1)}</option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    </div>
</main>
<aside class={`${$currentTheme ? "disc-" + $currentTheme : ""}`}>
    <div class="embed-container">
        <Embed {embed} />
    </div>
</aside>