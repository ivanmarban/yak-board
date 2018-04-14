<template>
  <div class="wrapper">
    <div class="ui three column grid">
      <div class="column">
        <h2 class="ui centered header">To-Do</h2>
      </div>
      <div class="column">
        <h2 class="ui centered header">Doing</h2>
      </div>
      <div class="column">
        <h2 class="ui centered header">Done</h2>
      </div>
    </div>
    <div class="tasks-grid">
      <draggable v-model="tasks['todo']" :options="dragOptions" :class="getDragArea()" @add="onAdd($event, 'todo')" @end="onEnd">
        <task-card v-for="task in tasks['todo']" :key="task._id" :task="task" @deleteDialog="deleteDialog" @editDialog="editDialog"></task-card>
      </draggable>
      <div class="divider"></div>
      <draggable v-model="tasks['doing']" :options="dragOptions" :class="getDragArea()" @add="onAdd($event, 'doing')" @end="onEnd">
        <task-card v-for="task in tasks['doing']" :key="task._id" :task="task" @deleteDialog="deleteDialog" @editDialog="editDialog"></task-card>
      </draggable>
      <div class="divider"></div>
      <draggable v-model="tasks['done']" :options="dragOptions" :class="getDragArea()" @add="onAdd($event, 'done')" @end="onEnd">
        <task-card v-for="task in tasks['done']" :key="task._id" :task="task" @deleteDialog="deleteDialog" @editDialog="editDialog"></task-card>
      </draggable>
    </div>
    <div class="add-button" @click="addDialog">+</div>
    <task-add-edit ref="addEditTask" @editTask="editTask" @addTask="addTask"></task-add-edit>
    <task-delete ref="deleteTask" @deleteTask="deleteTask"></task-delete>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import TaskCard from '@/components/TaskCard'
  import TaskAddEdit from '@/components/TaskAddEdit'
  import TaskDelete from '@/components/TaskDelete'
  // import jQuery from 'jquery'
  import _ from 'underscore'

  export default {
    components: {
      draggable,
      TaskCard,
      TaskAddEdit,
      TaskDelete
    },
    methods: {
      onAdd (event, type) {
        let idx = _.findIndex(this.tasks[type], task => task._id === event.item.getAttribute('data-id'))
        this.tasks[type][idx].status = type
      },
      onEnd () {
        this.tasks['todo'].map((task, index) => {
          task.order = index + 1
          this.$db.update({ _id: task._id }, { $set: { order: task.order, status: task.status } }, {})
        })
        this.tasks['doing'].map((task, index) => {
          task.order = index + 1
          this.$db.update({ _id: task._id }, { $set: { order: task.order, status: task.status } }, {})
        })
        this.tasks['done'].map((task, index) => {
          task.order = index + 1
          this.$db.update({ _id: task._id }, { $set: { order: task.order, status: task.status } }, {})
        })
      },
      getDragArea () {
        return 'task-column'
      },
      addDialog () {
        this.$refs.addEditTask.show(null, false)
      },
      editDialog (task) {
        this.$refs.addEditTask.show(task, true)
      },
      deleteDialog (task) {
        this.$refs.deleteTask.show(task)
      },
      addTask (task) {
        let newTask = { subject: task.subject,
          description: task.description,
          order: this.tasks['todo'].length + 1,
          hidden: false,
          status: 'todo' }
        this.$db.insert(newTask)
          .then((task) => {
            this.tasks['todo'].push(task)
          })
      },
      editTask (task) {
        this.$db.update({ _id: task._id }, { $set: { subject: task.subject, description: task.description } }, {})
        _.extend(_.findWhere(this.tasks[task.status], { _id: task._id }), task)
      },
      deleteTask (task) {
        this.$db.remove({ _id: task._id }, {})
        let idx = _.findIndex(this.tasks[task.type], t => t._id === task._id)
        this.tasks[task.status].splice(idx, 1)
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 0,
          draggable: '.card',
          handle: '.move',
          group: 'tasks',
          ghostClass: 'ghost'
        }
      }
    },
    data () {
      return {
        tasks: {
          todo: [],
          doing: [],
          done: []
        }
      }
    },
    created () {
      this.$db.find({ status: 'todo' })
        .sort({ order: 1 })
        .then((tasks) => {
          this.tasks['todo'] = tasks
        })
      this.$db.find({ status: 'doing' })
        .sort({ order: 1 })
        .then((tasks) => {
          this.tasks['doing'] = tasks
        })
      this.$db.find({ status: 'done' })
        .sort({ order: 1 })
        .then((tasks) => {
          this.tasks['done'] = tasks
        })
    }
  }
</script>

<style>
  .wrapper, html, body {
    height: 100%;
    margin: 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .ui.grid {
    margin: 0;
  }

  .ui.grid > .column:not(.row) {
    border-bottom: 1px solid #ccc;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .list{
    flex: 2;
    display: flex;
  }

  .tasks-grid {
      flex: 2;
      display: flex;
  }

  .task-column {
    flex: 0 0 33.33333333%;
    overflow: auto;
  }

  .divider {
    flex: 0 0 1px;
    background: linear-gradient(to bottom, #ffffff 0%, #ccc 50%, #ffffff 100%);
  }

  .add-button {
   width: 70px;
   height: 70px;
   background-color: red;
   border-radius: 50%;
   box-shadow: 0 6px 10px 0 #666;
   transition: all 0.1s ease-in-out;
 
   font-size: 50px;
   color: white;
   text-align: center;
   line-height: 70px;
 
   position: fixed;
   right: 50px;
   bottom: 50px;
}
 
.add-button:hover {
   box-shadow: 0 6px 14px 0 #666;
   transform: scale(1.05);
}
</style>