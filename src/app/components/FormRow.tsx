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
	rows?: number;
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
	rows,
}: Props<T>) => {
	const props = {
		autoFocus,
		value: data[value],
		name: 'email',
		disabled,
		onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) =>
			setData(prev => ({
				...prev,
				[value]:
					target.type === 'checkbox'
						? target.checked
						: transformer(target.value),
			})),

		type,
		placeholder,
	};
	return (
		<Form.Group as={Row}>
			<Form.Label column>{label}</Form.Label>
			<Col sm={10}>
				{type !== 'textarea' ? (
					<Form.Control {...props} />
				) : (
					<Form.Control as="textarea" rows={rows} {...props} />
				)}
				{footer && <Form.Text className="text-muted">{footer}</Form.Text>}
			</Col>
		</Form.Group>
	);
};

export default FormRow;
