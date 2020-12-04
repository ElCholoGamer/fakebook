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
	autoFocus?: boolean;
	disabled?: boolean;
	footer?: string;
	transformer?(str: string): string;
}

const FormRow = <T extends Record<string, any>>({
	label,
	data,
	setData,
	value,
	placeholder,
	type = 'text',
	autoFocus,
	disabled,
	footer,
	transformer = str => str,
}: Props<T>) => {
	return (
		<Form.Group as={Row}>
			<Form.Label column>{label}</Form.Label>
			<Col sm={10}>
				<Form.Control
					autoFocus={autoFocus}
					as={type === 'textarea' ? type : 'input'}
					value={data[value]}
					name="email"
					disabled={disabled}
					onChange={e =>
						setData(prev => ({ ...prev, [value]: transformer(e.target.value) }))
					}
					type={type}
					placeholder={placeholder}
				/>
				{footer && <Form.Text className="text-muted">{footer}</Form.Text>}
			</Col>
		</Form.Group>
	);
};

export default FormRow;
