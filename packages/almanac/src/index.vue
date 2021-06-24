<template>
	<div class="almanac">
		<div v-if="time" class="time">
			<p class="solar">{{solar}}</p>
			<p class="lunar">{{lunar}}</p>
		</div>
		<div class="yiji">
			<div class="good">
				<div class="left">
					<span>宜</span>
				</div>
				<div class="right">
					<div class="list" v-for="item in good" :key="item">
						<div class="title">{{item.name}}</div>
						<div class="content">{{item.good}}</div>
					</div>
				</div>
			</div>
			<div class="bad">
				<div class="left">
					<span>忌</span>
				</div>
				<div class="right">
					<div class="list" v-for="item in bad" :key="item">
						<div class="title">{{item.name}}</div>
						<div class="content">{{item.bad}}</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="star" class="star">
			<span class="title">今日运势指数：</span>
			<span class="content">{{todayStar}}</span>
		</div>
	</div>
</template>

<script>
	import { defineComponent, computed } from "vue";
	import { getTodayLuck, getTodayStar, getLunar } from "./utils/core";
	import { format } from "date-fns";
	import { zhCN } from "date-fns/locale";

	export default defineComponent({
		name: "Almanac",
		props: {
			star: {
				type: Boolean,
				default: true,
			},
			time: {
				type: Boolean,
				default: true,
			},
		},
		setup(props, ctx) {
			console.log(props, ctx);
			const { good, bad } = getTodayLuck();
			const todayStar = getTodayStar();
			const lunar = getLunar().toString();

			const solar = computed(() =>
				format(new Date(), "yyyy年MM月dd日 EEEE", { locale: zhCN })
			);

			return {
				good,
				bad,
				todayStar,
				solar,
				lunar,
			};
		},
	});
</script>

<style lang="less" scoped>
	.almanac {
		display: inline-block;
		.time {
			padding: 10px 5px;
			text-align: left;
			font-size: 1.25rem;
			.solar {
				font-weight: 500;
			}
			.lunar {
				font-style: italic;
			}
		}
		.yiji {
			display: inline-flex;
			flex-direction: column;
			.good,
			.bad {
				display: flex;
				justify-content: center;
				align-items: stretch;
				flex: 1;
				.left {
					padding: 0 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 500;
					font-size: 1.75rem;
				}
				.right {
					padding: 10px 20px;
					flex: 1;
					.list {
						margin: 10px 0;
					}
					.title {
						font-weight: 500;
						font-size: 1.25rem;
					}
					.content {
						font-size: 0.9rem;
						color: #666;
					}
				}
			}
			.good {
				.left {
					background-color: yellow;
				}
				.right {
					background-color: fade(yellow, 20%);
				}
			}
			.bad {
				.left {
					color: #fff;
					background-color: red;
				}
				.right {
					background-color: fade(red, 20%);
				}
			}
		}
		.star {
			padding: 10px 5px;
			.title {
				font-weight: 500;
			}
			.content {
				color: #f7ba2a;
			}
		}
	}
</style>