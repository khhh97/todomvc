;(function (React) {
	window.Footer = class extends React.Component {
		render () {
			return (
				//This footer should hidden by default and shown when there are todos
				<footer className="info">
					<p>Double-click to edit a todo</p>
					{/* Remove the below line ↓ */}
					<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
					{/*Change this out with your name and url ↓*/}
					<p>Created by <a href="http://todomvc.com">you</a></p>
					<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
				</footer>
			)
		}
	}
})(React)
