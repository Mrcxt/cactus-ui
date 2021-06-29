<template>
	<div class="demo">
		<ul class="nav">
			<li v-for="router in routerList" :key="router.name">
				<router-link :to="router.path">{{router.name}}</router-link>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script setup>
	import { useRouter, useRoute } from "vue-router";
	import { computed } from "vue";

	const router = useRouter();

	const routerList = computed(() => router.options.routes);
	console.log(routerList);
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>
