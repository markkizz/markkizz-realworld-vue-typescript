<template>
    <div class="icon-wrapper">
      <svg class='icon' :width="width" :height="height">
        <use v-bind="{'xlink:href':'/feather-sprite.svg#' + name}"/>
      </svg>
      <slot></slot>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
// import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

@Component
export default class BaseIcon extends Vue {
  @Prop() private name!: string
  @Prop({default: 24}) private width!: number | string
  @Prop({default: 24}) private height!: number | string
}
// export default {
//   name: 'Icon',
//   props: {
//     name: String,
//     width: {
//       type: [Number, String],
//       default: 24
//     },
//     height: {
//       type: [Number, String],
//       default: 24
//     }
//   }
// }
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
