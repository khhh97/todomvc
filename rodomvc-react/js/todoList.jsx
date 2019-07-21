;(function (React) {

	window.Todos = class extends React.Component {
		state = {
			filterText: 'all',
			editing: true
		}

		handleChangeStatus (text) {
			const filterText = this.state.filterText
			if (text === filterText) return
			this.setState({ filterText: text })
		}

		render () {
			let { todos, editing } = this.props
			const { filterText } = this.state
			switch (filterText) {
				case 'completed':
					todos = todos.filter(item => item.completed)
					break
				case 'active':
					todos = todos.filter(item => !item.completed)
					break
				default:
					break
			}
			return (
				//This section should be hidden by default and shown when there are todos
				this.props.todos.length > 0 && (
					<div>
						<section className="main">
							<input id="toggle-all" className="toggle-all" type="checkbox"/>
							<label htmlFor="toggle-all">Mark all as complete</label>
							<ul className="todo-list">
								{/*List items should get the className `editing` when editing and `completed` when marked as completed*/}
								{
									todos.map((item) => {
										return (
											<li
												className={item.completed ? 'completed' : '' + editing ? 'editing' : ''}
												key={item.id}
											>
												<div className="view">
													<input className="toggle" type="checkbox" defaultChecked={item.completed}/>
													<label>{item.title}</label>
													<button className="destroy" onClick={() => this.props.deleteTodo(item.id)}></button>
												</div>
												<input className="edit" defaultValue="Create a TodoMVC template"/>
											</li>
										)
									})
								}
							</ul>
						</section>
						<footer className="footer">
							{/*This should be `0 items left` by default*/}
							<span className="todo-count"><strong>{
								todos.filter(item => !item.completed).length
							}</strong> item left</span>
							{/* Remove this if you don't implement routing */}
							<ul className="filters">
								<li>
									<a
										className={filterText === 'all' ? 'selected' : ''}
										onClick={() => this.handleChangeStatus('all')}
										href="#/">All</a>
								</li>
								<li>
									<a
										className={filterText === 'active' ? 'selected' : ''}
										onClick={() => this.handleChangeStatus('active')}
										href="#/active">Active</a>
								</li>
								<li>
									<a
										className={filterText === 'completed' ? 'selected' : ''}
										onClick={() => this.handleChangeStatus('completed')}
										href="#/completed">Completed</a>
								</li>
							</ul>
							{/*Hidden if no completed items are left ↓*/}
							<button className="clear-completed">Clear completed</button>
						</footer>
					</div>
				)

			)
		}
	}
})(React)
