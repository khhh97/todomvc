;(function (React, Header, Todos, Footer) {
	const todos = [
		{
			id: 1,
			title: '吃饭',
			completed: false
		},
		{
			id: 2,
			title: '睡觉',
			completed: true
		},
		{
			id: 3,
			title: '打豆豆',
			completed: false
		},
		{
			id: 4,
			title: '打游戏',
			completed: true
		}
	]
	window.App = class extends React.Component {
		state = { todos: todos }

		handleAddTodo = (newTodo) => {
			this.setState(pre => ({
				todos: [newTodo, ...pre.todos]
			}))
		}

		handleDeleteTodo (id) {
			const todos = this.state.todos
			const index = todos.findIndex(item => item.id === id)
			todos.splice(index, 1)
			this.setState({ todos })
		}

		render () {
			const todos = this.state.todos
			return (
				<div>
					<section className="todoapp">
						<Header addTodo={this.handleAddTodo} todos={todos}/>
						<Todos
							todos={todos}
							deleteTodo={this.handleDeleteTodo.bind(this)}
						/>
					</section>
					<Footer></Footer>
				</div>
			)
		}
	}
})(React, Header, Todos, Footer)
