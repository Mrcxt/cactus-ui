<template>
	<ProgressBar :options="options" />

	<div class="demo-btn" @click="Progress.start()">start</div>
	<div class="demo-btn" @click="Progress.pause()">pause</div>
	<div class="demo-btn" @click="Progress.unpause()">unpause</div>
	<div class="demo-btn" @click="Progress.increase()">increase</div>
	<div class="demo-btn" @click="Progress.decrease()">decrease</div>
	<div class="demo-btn" @click="Progress.finish()">finish</div>
	<div class="demo-btn" @click="Progress.fail()">fail</div>
</template>

<script setup>
	import { inject, reactive } from "vue";

	const options = reactive({});
	const rootOptions = {};

	const Progress = inject("$progress");
</script>

<style lang="less" scoped>
</style>