<template>
  <div class="hello">
    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <h1 class="text-center">TODO LIST App</h1>

          <form v-on:submit.prevent="addNewTask">
            <label for="tasknameinput">Task Name</label>
            <input type="text" v-model="taskname" id="tasknameinput" class="form-control" placeholder="add new task">

            <button v-if="isEdit == false" type="submit" class="btn btn-success btn-block mt-3">submit</button>

            <button v-else @click.prevent="updateTask()" class="btn btn-success btn-block mt-3">update</button>

          </form>
        </div>

        <table class="table">
          <tr v-for="todo in todos" :key="todo._id" :title="todo.title">
            <td class="text-left">{{todo._id}}</td>
            <td class="text-left">{{todo.title}}</td>
            <td class="text-right">
              <button @click="editTask(todo.title, todo._id)" class="btn btn-info">Edit</button>
              <button @click="deleteTask(todo._id)" class="btn btn-danger">Delete</button>
            </td>

          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      todos: [],
      id: '',
      taskname: '',
      isEdit: false
      
    }
  },
  mounted () {
    this.getTask()
  },
  methods: {
    getTask () {
      axios.get('/api/tasks')
        .then(res => {
          console.log(res.data)
          this.todos = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addNewTask () {
      axios.post('/api/task', {title: this.taskname})
        .then(res => {
          this.taskname = ''
          this.getTask()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    editTask (title, id) {
      this.id = id
      this.taskname = title
      this.isEdit = true
    },
    updateTask () {
      axios.put(`/api/task/${this.id}`, {title: this.taskname})
        .then(res => {
          this.taskname = ''
          this.isEdit = false
          this.getTask()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    deleteTask (id) {
      axios.delete(`/api/task/${id}`)
        .then(res => {
          this.taskname = ''
          this.getTask()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
