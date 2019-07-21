;(function (React) {
	window.Header = class extends React.Component {

		componentDidMount = () => {
			this.input.focus()
		}

		handleAddTodo = (e) => {
			const value = e.target.value.trim()
			const todos = this.props.todos
			if (e.nativeEvent.keyCode !== 13) return
			if (!value) return
			const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
			const newTodo = { id, title: value, completed: false }
			//添加数据
			this.props.addTodo(newTodo)
			//清空文本框
			e.target.value = ''
		}

		render () {
			return (
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						ref={el => this.input = el}
						onKeyPress={this.handleAddTodo}
					/>
				</header>
			)
		}
	}
})(React)
