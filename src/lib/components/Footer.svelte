<script lang="ts">
    import twemoji from "twemoji";
    import theme from "$lib/stores/theme";

    $: currentTheme = $theme;
    $: themeEmoji = $theme === "dark" ? "🌙" : "☀️";

</script>

<footer class={`${$theme ? "disc-" + $theme : ""}`}>
    <div class="row" style="gap: 1rem;">
        <div class="col-6">
            <label for="theme-picker">Change theme {@html twemoji.parse(themeEmoji)}</label>
            <select bind:value={$theme}>
                <option value="dark" default={currentTheme === 'dark'}>Dark</option>
                <option value="light" default={currentTheme === 'light'}>Light</option>
            </select>
        </div>
        <div class="col-12" style="text-align: center;">
            <span>This project is not affiliated with discord</span>
            <a href="https://github.com/Draconizations/profilebuilder">Source code</a>
        </div>
    </div>
</footer>