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

    function setToUrl() {
        if (textInput && textInput.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
            imageUrl = textInput;
        }
    }
</script>

<div class="row">
    <input {id} bind:this={uploadInput} on:change={() => readImage()} type="file" accept="image/png, image/jpeg" class="col-12 col-600-6 col-800-12 col-1000-6"/>
    <input bind:value={textInput} on:change={() => setToUrl()} type="url" class="col-6 col-600-4 col-800-6 col-1000-4" placeholder="insert url here..."/>
    <div class="col-6 col-600-2 col-800-6 col-1000-2">
        <button on:click={() => imageUrl = ""}>Clear</button>
    </div>
</div>