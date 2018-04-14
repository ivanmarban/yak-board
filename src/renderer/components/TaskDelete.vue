<template>
  <div class="ui mini modal">
    <div class="header">Delete Task</div>
    <div class="content">
      <p>Are you sure you want to delete this task?</p>
    </div>
    <div class="actions">
      <div class="ui tiny negative button">No</div>
      <div class="ui tiny positive button" @click="deleteTask">Yes</div>
    </div>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import _ from 'underscore'

  export default {
    data () {
      return {
        task: {
          _id: null,
          subject: null,
          description: null,
          order: null,
          hidden: null,
          status: null
        }
      }
    },
    methods: {
      show (task) {
        _.create(this.task, task)
        jQuery(this.$el).modal({closable: false}).modal('show')
      },
      deleteTask () {
        this.$emit('deleteTask', this.task)
      }
    }
  }
</script>

<style>
/* CSS */
</style>