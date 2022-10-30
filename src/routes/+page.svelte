<script lang="ts">
    import currentTheme from "$lib/stores/theme";
    import { Theme } from '$lib/embed';
    import savedEmbed from '$lib/stores/embed';
    import { defaultEmbed } from '$lib/embed';
    import { browser } from "$app/environment";
    import Footer from "$lib/components/Footer.svelte";

    import twemoji from 'twemoji';
    import { afterUpdate, onMount } from "svelte";
    import { toPng } from 'html-to-image';

    import ColorControl from '$lib/components/control/ColorControl.svelte'
    import ImageControl from '$lib/components/control/ImageControl.svelte'

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

    function resetToDefault() {
        embed = JSON.parse(JSON.stringify(defaultEmbed));
    }

    function exportProfile() {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(embed)], {type: 'json'});
        a.href = URL.createObjectURL(file);
        a.download = 'profilebuilder_export.json';
        a.click();
    }

    let importInput: HTMLInputElement;
    let importNotValid = false;

    function importProfile() {
        importNotValid = false;

        if (importInput.files && importInput.files[0]) {
            let reader = new FileReader();

            reader.addEventListener("load", () => {
                let data = JSON.parse(reader.result as string);
                if (data.dprofileVersion) {
                    embed = {...defaultEmbed, ...data};
                } else {
                    importNotValid = true;
                }
            })

            reader.readAsText(importInput.files[0]);
        }
    }
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
        <div class="row">
            <div class="col-6" style="align-items: flex-end">
                <button style="width: 10rem;" on:click={() => convertToImage()}>Convert to image!</button>
            </div>
            <div class="col-6" style="align-items: flex-start">
                <button style="width: 10rem;" class="danger" on:click={() => resetToDefault()}>Reset</button>
            </div>
        </div>
        <hr/>
        <h3>Colors</h3>
        <div class="row">
            <div class="col-6">
                <label for="embed-theme-select">Theme</label>
                <select id="embed-theme-select" bind:value={embed.theme} class="col-12">
                    {#each Object.keys(Theme) as theme}
                        <option value={Theme[theme]}>{theme[0].toUpperCase() + theme.slice(1)}</option>
                    {/each}
                </select>
            </div>
            <div class="col-6">
                <label for="embed-banner-color-select">Banner</label>
                <ColorControl bind:color={embed.colors.banner} id="embed-banner-color-select"/>
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
        <hr/>
        <h3>Images</h3>
        <div class="row">
            <div class="col-12">
                <label for="embed-avatar-upload">Avatar</label>
                <ImageControl id="embed-avatar-upload" bind:imageUrl={embed.avatar} />
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <label for="embed-banner-upload">Banner</label>
                <ImageControl id="embed-banner-upload" bind:imageUrl={embed.banner} />
            </div>
        </div>
        <hr/>
        <h3>Info</h3>
        <p>Tba...</p>
        <div class="row" style="margin-top: 2rem;">
            <div class="col-6">
                <label for="export-import-export">Export as json</label>
                <button id="export-import-export" on:click={() => exportProfile()}>Export</button>
            </div>
            <div class="col-6">
                <label for="export-import-import">Import</label>
                <input id="export-import-import" bind:this={importInput} on:change={() => importProfile()} type="file" accept="application/JSON"/>
                {#if importNotValid}
                    <span style="color: red; font-size: 0.8rem;">Import file isn't valid</span>
                {/if}
            </div>
        </div>
    </div>
    {#if !jsEnabled}
        <h2 class="center" style="margin-bottom: 1rem;">Please enable javascript!</h2>
    {/if}
    <Footer />
</main>
<aside class={`${$currentTheme ? "disc-" + $currentTheme : ""}`}>
    <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <div class="embed-container" bind:this={imageNode}>
            <Embed {embed} />
        </div>
    </div>
</aside>

<svelte:head>
    <title>Profilebuilder</title>
    <meta content="Profilebuilder" property="og:title" />
    <meta content="A simple utility that lets you create fake discord profiles. Currently a heavy work in progress!" property="og:description" />
    <meta content="https://profilebuilder.fulmine.xyz/" property="og:url" />
    <meta property="og:image" content="/favicon.png">
    <meta name="theme-color" content="#FFAC33">
</svelte:head>