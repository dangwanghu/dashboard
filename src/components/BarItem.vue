<template>
  <a class="tab-item" v-link="{path: path, activeClass: 'active'}">
    <template v-if="iconClass == 'icon-compass'">
      <svg class="icon icon-{{icon}}" style="margin-left: -0.1rem;"><use xlink:href="#icon-{{icon}}"></use></svg>
      <span class="tab-label" v-text="label"></span>
    </template>
    <template v-else>
      <span class="icon" :class="iconClass"></span>
      <span class="tab-label" v-text="label"></span>
    </template>
  </a>
</template>

<script>
export default {
  props: {
    path: '',
    icon: '',
    label: ''
  },
  computed: {
    iconClass () {
      return `icon-${this.icon}`
    }
  }
}
</script>
