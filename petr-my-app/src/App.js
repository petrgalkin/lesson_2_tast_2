import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex

	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	console.log("activeIndex", typeof activeIndex);

	const clickForward = () => {
		if (isLastStep) {
			setActiveIndex(0);
		} else {
			setActiveIndex((prevIndex) => prevIndex + 1);
		}
	};

	const clickReverse = () => {
		if (!isFirtsStep) {
			setActiveIndex((prevIndex) => prevIndex - 1);
		}
	};

	const clickStep = (index) => {
		setActiveIndex(index);
	};

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	const isFirtsStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						<h2>{steps[activeIndex].title}</h2>
						{steps[activeIndex].content}
						{/* Контент соответственный шагу. Сейчас активен шаг 3 */}
					</div>
					<ul className={styles["steps-list"]}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map((step, index) => (
							<li
								className={
									styles["steps-item"] +
									(index <= activeIndex
										? ` ${styles.done}`
										: "") +
									(index === activeIndex
										? ` ${styles.active}`
										: "")
								}
								key={step.id}
							>
								{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
								<button
									className={styles["steps-item-button"]}
									onClick={() => {
										clickStep(index);
									}}
								>
									{index + 1}
								</button>
								{/* При клике на кнопку установка выбранного шага в качестве активного */}
								Шаг {index + 1}
							</li>
						))}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={clickReverse}
							disabled={isFirtsStep}
						>
							Назад
						</button>

						<button
							className={styles.button}
							onClick={clickForward}
						>
							{isLastStep ? "Начать сначала" : "Далее"}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
