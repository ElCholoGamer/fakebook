import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface Props<T extends Record<string, any>> {
	label: string;
	data: T;
	setData: React.Dispatch<React.SetStateAction<T>>;
	value: keyof T;
	placeholder?: string;
	type?: string;
}

const FormRow = <T extends Record<string, any>>({
	label,
	data,
	setData,
	value,
	placeholder,
	type = 'text',
}: Props<T>) => {
	return (
		<Form.Group as={Row}>
			<Form.Label column>{label}</Form.Label>
			<Col sm={10}>
				<Form.Control
					value={data[value]}
					name="email"
					onChange={e =>
						setData(prev => ({ ...prev, [value]: e.target.value }))
					}
					type={type}
					placeholder={placeholder}
				/>
			</Col>
		</Form.Group>
	);
};

export default FormRow;
