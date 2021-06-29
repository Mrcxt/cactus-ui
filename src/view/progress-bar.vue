<template>
	<ProgressBar :options="options" />

	<div class="demo-btn" @click="$progress.start()">start</div>
	<div class="demo-btn" @click="$progress.pause()">pause</div>
	<div class="demo-btn" @click="$progress.unpause()">unpause</div>
	<div class="demo-btn" @click="$progress.increase()">increase</div>
	<div class="demo-btn" @click="$progress.decrease()">decrease</div>
	<div class="demo-btn" @click="$progress.finish()">finish</div>
	<div class="demo-btn" @click="$progress.fail()">fail</div>
</template>

<script setup>
	import { inject } from "vue";

	const options = {};

	const $progress = inject("$progress");
</script>

<style lang="less" scoped>
</style>