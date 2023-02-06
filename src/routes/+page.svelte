<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
	export let form: ActionData;

	let loading = false;
	let files: FileList;
	//make the first letter uppercase but keep the capitalization of the rest of the words
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<div class="flex flex-col gap-4 items-center">
	<form
		method="POST"
		enctype="multipart/form-data"
		use:enhance={() => {
			loading = true;
			return ({ update }) => {
				loading = false;
				update();
			};
		}}
		class="flex flex-col gap-4 items-center"
	>
		{#if files}
			<div class="card p-4 flex flex-col items-center">
				<img src={URL.createObjectURL(files?.[0])} alt="User-uploaded" class="max-h-[80vh]" />
			</div>
		{/if}
		<div class:hidden={files}>
			<FileDropzone name="image" multiple={false} accept="image/*" bind:files />
		</div>
		{#if !form?.success}
			<button class="btn variant-filled-primary btn-base" disabled={loading}
				>{#if loading}<span class="w-4"><ProgressRadial stroke={200} /></span>{/if}
				<span>Verarbeiten</span>
			</button>
		{/if}
	</form>

	{#if form?.success}
		<div class="flex gap-4">
			<p class="card p-4">{capitalizeFirstLetter(form.description)}.</p>
			<div class="flex gap-2 flex-wrap">
				{#each form.tags as tag}
					<span class="chip variant-soft-primary">{tag}</span>
				{/each}
			</div>
		</div>
		<button
			class="btn variant-filled-primary btn-base"
			on:click={() => {
				form = null;
			}}
		>
			<span>Neues Bild</span>
		</button>
	{/if}
</div>
