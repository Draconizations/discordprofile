<script lang="ts">
    import { browser } from "$app/environment";
    import twemoji from 'twemoji';
    import { afterUpdate } from "svelte";

    import theme from "$lib/stores/theme";    

    afterUpdate(() => { 
        if (browser) twemoji.parse(document.body);
    });

    $: currentTheme = $theme;

    function swapTheme() {
        if (currentTheme === 'dark') {
            theme.set('light');
        } else {
            theme.set('dark');
        }
    }
</script>

<footer></footer>