import React from "react";
import Clipboard from 'react-clipboard.js';
import { Link } from "react-router-dom";


class Colors extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			colors: []
		};
	}

	componentDidMount(){
		const url = 'api/v1/colors/index';
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.setState({ colors: response }))
			.catch(() => this.props.history.push("/"));
	}

	onSuccess(event){
		event.trigger.children[0].style.display = "none";
		event.trigger.children[1].style.display = "block";
		setTimeout(function(){
    	event.trigger.children[1].style.display = "none";
			event.trigger.children[0].style.display = "block";
		}, 1500);

	}

	render(){
		const { colors } = this.state;
		const allColors = colors.map((color, index) => {
			var colorCode = `#${color.hex_code}`;
			var colorInt = parseInt(color.hex_code, 16)
			if ((colorInt > 3993 &&  colorInt <= 4095) ||(colorInt > 16751001 &&  colorInt <= 16777215))
				var blackColor = { color: "black"};
			return(
				<>
					<div key={index} className="col-md-6 col-lg-3">
						<div className="custom-card">
							<div className="card-body">
								<Clipboard component="div" className="back-side card-side" style={{backgroundColor: colorCode}} data-clipboard-text={colorCode} onSuccess={this.onSuccess}>
									<div className="back-title" style={blackColor}>
				            <h5>#{color.hex_code}</h5>
				            <p>Click to copy code</p>
				          </div>
				          <div className="copy-title" style={blackColor}>
				            <h5>Copied!</h5>
				          </div>
			          </Clipboard>
								<div className="front-side card-side" style={{backgroundColor: colorCode}}>
			            <div className="front-title" style={blackColor}>
			            	<h5>{color.name}</h5>
			            </div>
			          </div>
			         </div>
		        </div>
		      </div>
	      </>
	    );
		});

		const noColor = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No colors yet. Why not <Link to="/color">create one</Link>
        </h4>
      </div>
    );
    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container">
            <h1 className="display-4">Colors for every moment</h1>
            <p className="lead text-muted">
              I’ve pulled together most beautiful colors as of me,
              Feel free to checkout them. You are welcome to create one.
              Worth a shot.. Huh?
            </p>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
	          <div className="row">
	            <div className="col-sm-6 mb-3">
		            <Link to="/" className="btn custom-button">
		              Home
		            </Link>
	            </div>
	            <div className="text-right col-sm-6 mb-3">
	              <Link to="/color" className="btn custom-button">
	                Create New Color
	              </Link>
	            </div>
            </div>
            <div className="row">
              {colors.length > 0 ? allColors : noColor}
            </div>
          </main>
        </div>
      </>
    );
	}
}

export default Colors;