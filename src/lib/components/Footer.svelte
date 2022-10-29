<script lang="ts">
    import { browser } from "$app/environment";
    import twemoji from 'twemoji';
    import { afterUpdate } from "svelte";

    import theme from "$lib/stores/theme";    

    afterUpdate(() => { 
        if (browser) twemoji.parse(document.body);
    });

    $: currentTheme = $theme;
    $: themeEmoji = $theme === "dark" ? "🌙" : "☀️";

    function swapTheme(value: string) {
        theme.set(value)
    }
</script>

<footer class={`${$theme ? "disc-" + $theme : ""}`}>
    <div class="row" style="gap: 1rem;">
        <div class="col-3">
            <label for="theme-picker">Theme {themeEmoji}</label>
            <select on:change={(e) => swapTheme(e.target.value)}>
                <option value="dark" default={currentTheme === 'dark'}>Dark</option>
                <option value="light" default={currentTheme === 'light'}>Light</option>
            </select>
        </div>
        <div class="col-3">
        </div>
        <div class="col-6" style="text-align: right;">
            <span>This project is not affiliated with discord</span>
            <span>Source code</span>
        </div>
    </div>
</footer>