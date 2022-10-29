<script lang="ts">
    export let color: string | undefined;
    export let id: string;

    let isColorValid = true;

    function checkIfColorValid() {
        if (!color || color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) {
            isColorValid = true;
            return true;
        }
        else {
            isColorValid = false;
            return false;
        }
    }

    function fillWithColor() {
        if (color && color.match(/^#(?:[0-9a-f]{3}){1,2}$/i)) return color;
        else return '#000000';
    }

    $: color, checkIfColorValid();

    function changeColorInput(event: Event) {
        if (event && event.target) {
            let target = event.target as HTMLInputElement;
            color = target.value;
        }
    }
</script>

<div class="row">
    <div class="col-12 col-600-9 col-800-12 col-1400-9" {id}>
        <input bind:value={color} type="text">
    </div>
    <div class="col-12 col-600-3 col-800-12 col-1400-3">
        <input on:change={(e) => changeColorInput(e)} value={fillWithColor()} type="color">
    </div>
</div>
{#if !isColorValid}
    <span style="color: red; font-size: 0.8rem;">color {color} isn't valid</span>
{/if}