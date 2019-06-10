import React from 'react';
function createMarkup(text) {
	return { __html: text };
}
const modal = (props) => {

	let { heading, style, body, popupHandle, buttonText } = props;
	return (
		<div className="popup-container" style={style}>
			<div className="container">
				<div className="col">
					<div className="popup">
						<h1>{heading}</h1>
						<p dangerouslySetInnerHTML={createMarkup(body)} />
						<button className="fancy-btn" onClick={popupHandle}>{buttonText}</button>
					</div>
				</div>
			</div>
		</div>
	);
}


export default modal;