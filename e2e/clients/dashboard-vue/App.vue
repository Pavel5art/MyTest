<template>
  <dashboard :TestJS="TestJS" />
</template>

<script>
import Vue from 'vue'
import TestJS from '@TestJS/core'
import { Dashboard } from '@TestJS/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    TestJS: () => new TestJS(),
  },
}
</script>

<style src="@TestJS/core/dist/style.css"></style>
<style src="@TestJS/dashboard/dist/style.css"></style>
