;(function (Vue) {
    /*
    * 自定义指令：好像要写在vue实例前面，下载实力后面vue会报警告
    * */
    Vue.directive('foucs',{
        inserted:function (el) {
            el.focus()
        }
    })
    /*编辑模式输入框聚焦*/
    Vue.directive('edit-focus',{
        update:function (el,binding) {
            if (binding.value){
                el.focus()
            }
        }
    })
    window.app = new Vue({
        el: '#todoapp',
        data: {
            todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
            currentEditing: '',
            filterText: 'all'
        },
        watch: {
            todos: {
                handler: function (val, oldVal) {
                    window.localStorage.setItem('todos', JSON.stringify(val))
                },
                deep: true
            }
        },
        computed: {
            // 计算未完成数
            getRemaningNum: {
                get() {
                    return this.todos.filter(todo => !todo.completed).length
                }
            },
            //切换全选按钮
            toggleAllStatu: {
                get() {
                    return this.todos.every(todo => todo.completed)
                },
                set() {
                    const checked = !this.toggleAllStatu
                    this.todos.forEach((item) =>
                        item.completed = checked
                    )
                }
            },
            filterTodos() {
                switch (this.filterText) {
                    case 'active':
                        return this.todos.filter(todo => !todo.completed)
                        break
                    case 'completed':
                        return this.todos.filter(todo => todo.completed)
                        break
                    default:
                        return this.todos
                        break
                }
            }
        },
        methods: {
            /*添加TODO*/
            addTodo(event) {
                /*
                * 1.得到输入的value值
                * 2.判断是否为空
                * 3.添加到数组中
                * 4.置空输入框
                * */
                const todoText = event.target.value.trim()
                var todos = this.todos
                if (!todoText.length) return
                const id = todos.length ? todos[todos.length - 1].id + 1 : 1
                this.todos.push({
                    id,
                    content: todoText,
                    completed: false
                })
                event.target.value = ''
            },

            /*删除任务项*/
            deleteTodo(index, e) {
                this.todos.splice(index, 1)
            },

            /*双击编辑*/
            dblClickEditing(item) {
                this.currentEditing = item
            },

            /*保存修改*/
            saveEditTodo(item, index, e) {
                var content = e.target.value.trim()
                if (!content.length) {
                    this.todos.splice(index, 1)
                } else {
                    item.content = content
                    this.currentEditing = null
                }
            },

            /*ESC取消编辑*/
            cancelEdit() {
                this.currentEditing = null
            },

            /*清除所有完成*/
            clearCompleted() {
                for (let i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].completed) {
                        this.todos.splice(i, 1)
                        i--
                    }
                }
            }
        }
    })
    hashchange()
    //对hashchange进行处理
    window.addEventListener('hashchange',hashchange)
    function hashchange() {
        app.filterText=window.location.hash.substr(2)
    }
})(Vue)

