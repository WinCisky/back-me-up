<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	
	let serverResponse = '';
	let loading = false;
	
	async function testServerFunction() {
		loading = true;
		try {
			const response = await fetch('/api/test');
			const data = await response.json();
			serverResponse = JSON.stringify(data, null, 2);
		} catch (error) {
			serverResponse = `Error: ${error}`;
		} finally {
			loading = false;
		}
	}
	
	async function testPostFunction() {
		loading = true;
		try {
			const response = await fetch('/api/test', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: 'Hello from client!',
					timestamp: new Date().toISOString()
				})
			});
			const data = await response.json();
			serverResponse = JSON.stringify(data, null, 2);
		} catch (error) {
			serverResponse = `Error: ${error}`;
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-2xl mx-auto rounded-lg shadow-md p-6">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold mb-4">Back Me Up</h1>
			<p class="">Test server functions running on Cloudflare Pages</p>
		</div>
		
		<div class="space-y-4">
			<div class="flex gap-4">
				<Button 
					onclick={testServerFunction} 
					disabled={loading}
					class="flex-1"
				>
					{loading ? 'Loading...' : 'Test GET Request'}
				</Button>
				
				<Button 
					onclick={testPostFunction} 
					disabled={loading}
					variant="outline"
					class="flex-1"
				>
					{loading ? 'Loading...' : 'Test POST Request'}
				</Button>
			</div>
			
			{#if serverResponse}
				<div class="mt-6">
					<h3 class="text-lg font-medium mb-2">Server Response:</h3>
					<pre class=" p-4 rounded-md text-sm overflow-x-auto">{serverResponse}</pre>
					<p class="text-xs mt-2">
						💡 Check the Cloudflare Pages deployment logs to see the console.log messages from the server!
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>