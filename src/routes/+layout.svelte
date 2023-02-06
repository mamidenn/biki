<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header"
		><AppBar>
			<svelte:fragment slot="lead"><span class="text-3xl font-semibold">Biki</span></svelte:fragment
			>
		</AppBar></svelte:fragment
	>
	<div class="container mx-auto py-8">
		<slot />
	</div>
</AppShell>
