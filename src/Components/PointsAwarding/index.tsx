import React from "react";
import './style.scss';

/* components */ 
import Button from '../Button/index';
import Title from '../Title/index';

/* types data form */
import { PointsAwardingFields } from "../PointsAwarding/types";

interface IPointsAwardingProps {
	onSubmit: (data: PointsAwardingFields) => void;
}

export default function PointsAwarding({ onSubmit }: IPointsAwardingProps) {

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
	}

	return (
		<form className="pointsawardingdorm" onSubmit={handleSubmit}>
			<Title className="title title--size20 title--mb28">Начисление баллов</Title>

			<label>
				<Title className="title title--size14 title--mb8">Кому</Title>
				<input type="text" name="id" placeholder="Введите id пользователя" required />
			</label>

			<label>
				<Title className="title title--size14 title--mb8">Активность / конкурс</Title>
				<input type="text" name="activity" placeholder="Введите текст" required />
			</label>

			<label>
				<Title className="title title--size14 title--mb8">Причина начисления</Title>
				<input type="text" name="reason" placeholder="Выберите из списка" required />
			</label>
			
			<Button className="button button--purple" type="submit">Текст кнопки</Button>
		</form>
	)
}