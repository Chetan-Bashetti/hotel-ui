import React, { useEffect, useState } from 'react';
import './demo.css';

const Demo = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch(
			'https://script.google.com/macros/s/AKfycbxxOwMz48k-rFtzBgbYCyMrYOVU3M3L29s79NZIS63cVKkKZr-FKNFbV0QHAHVGj1oP/exec'
		)
			.then((response) => response.json())
			.then((data) => {
				formatRequiredData(data.content);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const formatRequiredData = (data) => {
		let updatedData = [];
		data[0].map((each, id) => {
			let newObj = {
				key: each,
				id: id
			};
			updatedData.push(newObj);
		});
		prepareData(updatedData, data);
	};

	const prepareData = (updatedData, data) => {
		let finalArray = [];
		updatedData?.map((eachData) => {
			let updatedObj = {
				...eachData,
				value: setValues(eachData?.id, data)
			};
			finalArray.push(updatedObj);
		});
		setData(finalArray);
		console.log(finalArray, 'FINAL ARRAY');
	};

	const setValues = (id, data) => {
		let updatedjson = data?.filter((fi, fid) => fid !== 0);
		let newArray = [];

		updatedjson?.map((each, oid) => {
			newArray.push(updatedjson[oid][id]);
		});
		return newArray;
	};
	return (
		<>
			<div className='parent'>
				<div className='heading'>Today specials</div>
				{data?.length ? (
					<div className='demo-main'>
						{data?.map((each) => (
							<div key={each?.key}>
								<div className='special-keys'>{each.key}</div>
								<div>
									{each.value?.map((eachVal, id) => (
										<div className='special-values' key={id}>
											{eachVal}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				) : (
					'Loading! Please wait'
				)}
			</div>
		</>
	);
};
export default Demo;
