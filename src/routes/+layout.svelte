<script lang="ts">
    import '$lib/style/style.scss';
    import '$lib/style/theme.scss';
    import '$lib/style/grid.scss';
    import Footer from '$lib/components/Footer.svelte';
</script>

<div class="container">
    <slot/>
</div>
<Footer />