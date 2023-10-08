import React from "react";
import './style.scss';

import { PointsAwardingFields } from "../PointsAwarding/types";
import PointsAwarding from "../PointsAwarding";

function App() {
	const onSubmit = (formFields: PointsAwardingFields) => {
		console.log(formFields);
	};

	return (
		<>
			<PointsAwarding onSubmit={onSubmit} />
		</>
	)
}

export default App;