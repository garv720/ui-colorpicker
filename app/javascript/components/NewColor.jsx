import React from "react";
import { Link } from "react-router-dom";

class NewColor extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			color: { name: "", hex_code: "" }
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
	}

	stripHtmlEntities(str){
		return String(str)
			.replace(/</g, "&lt;")
			.replace(/>/g, "&lt;")
	}

	onChange(event){
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event){
		event.preventDefault();
		const url = "api/v1/colors/create";
		const { name, hex_code } = this.state;
		debugger
		if (name.length == 0 || ![3,6].includes(hex_code.length)){
			alert("error in form!");
			return;
		}
		const body = { name, hex_code	};
		const token = document.querySelector('meta[name="csrf-token"]').content;
		debugger
		fetch(url, {
			method: "Post",
			headers: {
				"X-CSRF-Token": token,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error ("Network response was not ok.");
			})
				.then(response => this.props.history.push(`color/${response.id}`))
				.catch(error => console.log(error.message));
	}

	render(){
		return(
			<div className="container mt-5">
	      <div className="row">
	        <div className="col-sm-12 col-lg-6 offset-lg-3">
	          <h1 className="font-weight-normal mb-5"> Add a new color to our awesome color collection. </h1>
	          <form onSubmit={this.onSubmit}>
	            <div className="form-group">
	              <label htmlFor="colorName">Color name</label>
	              <input type="text" name="name" id="colorName" className="form-control" required onChange={this.onChange} />
	            </div>
	            <div className="form-group">
	              <label htmlFor="colorCode">Color code</label>
	              <input type="text" name="hex_code" id="colorHexCode" className="form-control" required onChange={this.onChange} />
	            </div>
	            <button type="submit" className="btn custom-button mt-3"> Create color </button>
	            <Link to="/colors" className="btn btn-link mt-3"> Back to colors </Link>
	          </form>
	        </div>
	      </div>
			</div>
		);
	}
}

export default NewColor;