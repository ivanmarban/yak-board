<template>
  <div :class="getCardClass()" :data-id="task._id">
    <div class="content">
      <i class="angle fix-down icon right floated pointer" @click="showHideDetails"></i>
      <div class="header move" v-html="task.subject"></div>
      <div class="description hidden-content" v-html="task.description"></div>
    </div>
    <div class="extra content hidden-content">
      <div class="three ui tiny basic icon buttons">
        <button class="ui button" @click="showEditDialog(task)">Edit</button>
        <button class="ui button" @click="showDeleteDialog(task)">Delete</button>
        <button :class="getButtonClass()">Hide</button>
      </div>
    </div>
  </div>
</template>

<script>
  import jQuery from 'jquery'

  export default {
    props: ['task'],
    methods: {
      showHideDetails () {
        jQuery(this.$el)
          .find('.angle')
          .toggleClass('fix-down fix-up')
        jQuery(this.$el)
          .find('.hidden-content')
          .slideToggle('fast', function () {})
      },
      getCardClass () {
        return this.task.status === 'todo'
          ? 'ui centered orange card'
          : this.task.status === 'doing'
            ? 'ui centered olive card'
            : this.task.status === 'done'
              ? 'ui centered green card'
              : 'ui centered card'
      },
      getButtonClass () {
        return this.task.status === 'done'
          ? 'ui button'
          : 'ui disabled button'
      },
      showEditDialog (task) {
        this.$emit('editDialog', task)
      },
      showDeleteDialog (task) {
        this.$emit('deleteDialog', task)
      }
    }
  }
</script>

<style>
  .hidden-content {
    display: none;
  }

  .pointer {
    cursor: pointer;
  }

  .move {
    cursor: move;
  }

  .ui.card:first-child {
    margin-top: 1em;
  }

  i.icon.angle.fix-down:before {
    -webkit-text-stroke: 1px white;
    content: "\f107";
  }

  i.icon.angle.fix-up:before {
    -webkit-text-stroke: 1px white;
    content: "\f106";
  }
</style>
