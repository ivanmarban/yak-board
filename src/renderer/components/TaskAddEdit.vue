<template>
  <div class="ui small modal">
    <div class="header">{{getTypeOfDialog}} Task</div>
    <div class="content">
      <div class="ui form">
        <div class="required field">
          <label>Subject</label>
          <input type="text" maxlength="20" v-model="task.subject" @blur="onBlur">
        </div>
        <div class="field">
          <label>Description</label>
          <textarea v-model="task.description"></textarea>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui tiny negative button" @click="cancel">Cancel</div>
      <div class="ui tiny positive button" @click="saveTask">Save</div>
    </div>
  </div>
</template>

<script>
  import jQuery from 'jquery'
  import _ from 'underscore'
  
  export default {
    data () {
      return {
        isEditing: false,
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
      show (task, isEditing) {
        this.isEditing = isEditing
        _.create(this.task, task)
        jQuery(this.$el).modal({closable: false}).modal('show')
      },
      saveTask () {
        this.$emit(this.isEditing ? 'editTask' : 'addTask', this.task)
        this.clearTask()
      },
      cancel () {
        this.clearTask()
      },
      clearTask () {
        this.isEditing = false
        for (var key in this.task) {
          this.task[key] = null
        }
      },
      onBlur () {
        // console.log(this.$el)
      }
    },
    computed: {
      getTypeOfDialog () {
        return this.isEditing ? 'Edit' : 'Add'
      }
    }
  }
  </script>
  
  <style>
  /* CSS */
  </style>
      