<script lang="ts">
    export let imageUrl: string;
    export let id: string;

    let uploadInput: HTMLInputElement;
    let textInput: string;

    function readImage() {
        if (uploadInput.files && uploadInput.files[0]) {
            let reader = new FileReader();

            reader.addEventListener("load", () => {
                imageUrl = reader.result as string;
            })

            reader.readAsDataURL(uploadInput.files[0]);
        }
    }
</script>

<div class="row">
    <input {id} bind:this={uploadInput} on:change={() => readImage()} type="file" accept="image/png, image/jpeg" class="col-12 col-600-9 col-800-12 col-1000-9"/>
    <div class="col-12 col-600-3 col-800-12 col-1000-3">
        <button on:click={() => imageUrl = ""}>Clear</button>
    </div>
</div>