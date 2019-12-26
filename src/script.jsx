class Food extends React.Component {
	constructor(props) {
		super(props)
		this.handleLike = this.handleLike.bind(this) // binding the event to the class
		this.edit = this.edit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.state = {
			like: Boolean(this.props.like),
			editing: false,
		}
	}

	handleLike(event) {
		this.setState({
			like: !this.state.like,
		})
	}

	edit(event) {
		this.setState({
			editing: true,
		})
	}
	cancel() {
		this.setState({
			editing: false,
		})
	}

	save() {
		this.props.onChange(this.refs.newName.value, this.props.index)
		this.setState({
			editing: false,
		})
	}

	showEditingView() {
		return (
			<div className='food'>
				<input
					ref='newName'
					type='text'
					className='form-control'
					placeholder='new name...'
					defaultValue={this.props.name}
				/>
				<div>
					<div
						className='glyphicon glyphicon-ok-circle blue'
						onClick={this.save.bind(this)}
					/>
					<div
						className='glyphicon glyphicon-remove-circle red'
						onClick={this.cancel}
					/>
				</div>
			</div>
		)
	}

	showFinalView() {
		return (
			<div className='food'>
				<h1 className='bg-success'>{this.props.name}</h1>
				<p className='bg-info'>
					Position: <i>{this.props.children}</i>
				</p>

				<div>
					<input
						onChange={this.handleLike}
						defaultChecked={this.state.like}
						type='checkbox'
						className='glyphicon glyphicon-heart heart'
					/>
					<br />
					Like: <b>{String(this.state.like)}</b>
				</div>
				<div>
					<div
						className='glyphicon glyphicon-pencil blue'
						onClick={this.edit}
					></div>
					<div
						className='glyphicon glyphicon-trash red'
						onClick={this.props.deleteHandler}
					></div>
				</div>
			</div>
		)
	}

	render() {
		if (this.state.editing) {
			return this.showEditingView()
		} else {
			return this.showFinalView()
		}
	}
}

class FoodList extends React.Component {
	constructor(props) {
		super(props)
		this.handleDelete = this.handleDelete.bind(this)
		this.update = this.update.bind(this)
		this.state = {
			foods: ['Tacos', 'Paella', 'Ceviche', 'Pizza', 'Tamales'],
		}
	}

	componentWillMount() {
		console.log('We are about to get started')
		var self = this
		var pais
		$.getJSON('https://restcountries.eu/rest/v1/all', function(data) {
			for (pais in data) {
				console.log(pais, data[pais].name)
				self.add(data[pais].name)
			}
			$(self.refs.spinner).removeClass('glyphicon-refresh-animate')
			$(self.refs.spinner).hide()
		})
	}
	componentDidMount() {
		console.log('We just get started')
		$(this.refs.spinner).addClass('glyphicon-refresh-animate')
	}

	add(food) {
		let newFood = this.refs.newFood.value
		if (newFood == '') {
			if (typeof food == 'undefined') {
				newFood = 'New Food'
			} else {
				newFood = food
			}
		}
		let arr = this.state.foods
		arr.push(newFood)
		this.setState({
			foods: arr,
		})
		this.refs.newFood.value = ''
	}

	handleKeyPress(e) {
		if (e.charCode === 13) {
			this.add()
		}
	}

	render() {
		return (
			<div className='centerBlock'>
				<header>
					<h1>My favorite foods</h1>
					<i>Total: {this.state.foods.length}</i>
					<br />
					<span ref='spinner' className='glyphicon glyphicon-refresh'></span>
				</header>
				<div className='input-group'>
					<input
						ref='newFood'
						type='text'
						className='form-control'
						placeholder='Add new food...'
						onKeyPress={this.handleKeyPress.bind(this)}
					/>
					<span className='input-group-btn'>
						<div
							className='btn btn-default btn-success'
							onClick={this.add.bind(this, 'New Food')}
						>
							+
						</div>
					</span>
				</div>
				<div>
					{this.state.foods.map((food, i) => {
						return (
							<Food
								key={i}
								index={i}
								name={food}
								deleteHandler={this.handleDelete}
								onChange={this.update}
							>
								{i + 1}
							</Food>
						)
					})}
				</div>
			</div>
		)
	}

	update(newName, index) {
		var arr = this.state.foods
		arr[index] = newName
		this.setState({
			foods: arr,
		})
	}

	handleDelete(event) {
		console.log(event)
		var arr = this.state.foods
		arr.splice(event, 1)
		this.setState({
			foods: arr,
		})
	}
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		logErrorToMyService(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>
		}

		return this.props.children
	}
}

ReactDOM.render(
	<ErrorBoundary>
		<FoodList />
	</ErrorBoundary>,
	document.getElementById('container'),
)

/* class ClickCounterButton extends React.Component {
	render() {
		return (
			<button onClick={this.props.handler} className='btn btn-danger'>
				Increase Volume (Current volume in {this.props.counter})
			</button>
		)
	}
}

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			counter: 0,
		}
	}
	handleClick(event) {
		this.setState({
			counter: ++this.state.counter,
		})
	}
	render() {
		return (
			<div>
				<ClickCounterButton
					counter={this.state.counter}
					handler={this.handleClick}
				/>
			</div>
		)
	}
}

ReactDOM.render(<Counter />, document.getElementById('container')) */
