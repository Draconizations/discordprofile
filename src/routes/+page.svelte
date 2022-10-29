<script lang="ts">
    import currentTheme from "$lib/stores/theme";
    import { Theme } from '$lib/embed';
    import savedEmbed from '$lib/stores/embed';
    import { defaultEmbed } from '$lib/embed';
    import { browser } from "$app/environment";
    import twemoji from 'twemoji';
    import { afterUpdate, onMount } from "svelte";
    import ColorControl from '$lib/components/control/ColorControl.svelte'
    import { toPng } from 'html-to-image';

    let jsEnabled = false;

    onMount(() => {
        jsEnabled = true;
    });

    afterUpdate(() => {
        if (browser) twemoji.parse(mainElement);
    });

	import Embed from "$lib/components/embed.svelte";

    let embed = {...defaultEmbed, ...$savedEmbed};

    $: embed, $savedEmbed = embed;

    let mainElement: HTMLElement;

    let imageNode: HTMLElement;
    let imageOpen = false;
    let imgDataUrl = "";
    
    function convertToImage() {
        toPng(imageNode, { width: 350 + 2*16})
        .then(dataUrl => {
            imgDataUrl = dataUrl;
            imageOpen = true;
        })
    }

    browser && window.addEventListener('keydown', (e) => e.key === 'Escape' ? imageOpen = false : {});
</script>

{#if imageOpen}
    <div class={`img-overlay ${$currentTheme ? "disc-" + $currentTheme : ""}`}>
        <div class="img-container">
            <img class="img-profile" src={imgDataUrl} alt="Your fake discord profile" download="discord_profile.png" />
            <p style="text-align: center;">Here's your fake profile! Go ahead and save the image.</p>
            <button style="width: 10rem;" on:click={() => imageOpen = false}>Exit</button>
        </div>
    </div>
{/if}
<main class={`${$currentTheme ? "disc-" + $currentTheme : ""}`} bind:this={mainElement}>
    <div class="scroller">
        <div class="center"><h1>Profilebuilder ✨</h1></div>
        <p class="center">A simple utility that lets you create fake discord profiles.</p>
        <button style="width: 10rem; margin: 0 auto;" on:click={() => convertToImage()}>to image!</button>
        <hr/>
        <h3>Colors</h3>
        <div class="row">
            <div class="col-12">
                <label for="embed-theme-select">Theme</label>
                <select id="embed-theme-select" bind:value={embed.theme} class="col-12">
                    {#each Object.keys(Theme) as theme}
                        <option value={Theme[theme]}>{theme[0].toUpperCase() + theme.slice(1)}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <label for="embed-color-primary-select">Primary color</label>
                <ColorControl bind:color={embed.colors.primary} id="embed-color-primary-select"/>
            </div>
            <div class="col-6">
                <label for="embed-color-secondary-select">Secondary color</label>
                <ColorControl bind:color={embed.colors.secondary} id="embed-color-secondary-select"/>
            </div>
        </div>
    </div>
    {#if !jsEnabled}
        <h2 class="center" style="margin-bottom: 1rem;">Please enable javascript!</h2>
    {/if}
</main>
<aside class={`${$currentTheme ? "disc-" + $currentTheme : ""}`}>
    <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <div class="embed-container" bind:this={imageNode}>
            <Embed {embed} />
        </div>
    </div>
</aside>