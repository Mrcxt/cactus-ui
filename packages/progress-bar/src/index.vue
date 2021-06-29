<template>
	<div class="progress-bar">
		<div class="progress-bar-inner" :style="style"></div>
	</div>
</template>
<script>
	import { inject, computed, reactive } from "vue";
	export default {
		name: "ProgressBar",
		props: {
			options: {
				type: Object,
				default: () => ({}),
			},
		},
		setup(props) {
			const rootOptions = inject("RADON_LOADING_BAR");

			const style = computed(() => {
				const options = reactive(Object.assign({}, rootOptions, props.options));
				return {
					"background-color":
						options.status !== "fail" ? options.color : options.failColor,
					opacity: ["success", "fail"].includes(options.status) ? 0 : 1,
					width: options.width + "%",
					height: options.height,
				};
			});

			return {
				style,
			};
		},
	};
</script>
<style lang="less" scoped>
	.progress-bar {
		position: fixed;
		z-index: 99999999;
		top: 0;
		left: 0;
		width: 100%;
		.progress-bar-inner {
			transition: all 0.6s ease 0s;
		}
	}
</style>
