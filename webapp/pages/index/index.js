// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    todos: [],
    leftCount: 0
  },
  onLoad: function() {
    wx.getStorage({
      key: 'todos',
      success: res => {
        const todos = JSON.parse(res.data)
        this.setData({
          todos,
          leftCount: todos.filter(item => !item.completed).length
        })
      }
    })
  },
  filterTodos: function() {
    const {
      todos
    } = this.data
    let count = todos.filter(item => !item.completed).length
    this.setData({
      leftCount: count
    }, () => {
      wx.setStorage({
        key: "todos",
        data: JSON.stringify(todos)
      })
    })
  },
  handleValueChange: function(e) {
    this.setData({
      value: e.detail.value
    })
  },
  handleAddTodo: function() {
    const {
      value,
      todos
    } = this.data
    if (!value) return
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
    todos.push({
      id,
      title: value,
      completed: false
    })
    this.setData({
      todos,
      value: ''
    }, () => {
      this.filterTodos()
    })
  },
  changeTodoState: function(e) {
    const id = e.currentTarget.dataset.id
    const {
      todos
    } = this.data
    const index = todos.findIndex(item => item.id === id)
    todos[index].completed = !todos[index].completed
    this.setData({
      todos
    }, () => {
      this.filterTodos()
    })
  },
  handleDeleteTodo: function(e) {
    const id = e.currentTarget.dataset.id
    const {
      todos
    } = this.data
    const index = todos.findIndex(item => item.id === id)
    todos.splice(index, 1)
    this.setData({
      todos
    }, () => {
      this.filterTodos()
    })
  },
  toggleAll: function() {
    const {
      todos
    } = this.data
    const flag = todos.some(item => !item.completed)
    todos.forEach(item => {
      item.completed = flag
    })
    this.setData({
      todos
    }, () => {
      this.filterTodos()
    })
  },
  clearHasCompleted: function() {
    const {
      todos
    } = this.data
    this.setData({
      todos: todos.filter(item => !item.completed)
    }, () => {
      this.filterTodos()
    })
  }
})