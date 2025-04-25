// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте
// — Имя события: либо строка (обычно "click", "update", и т.д.), 
// либо регулярка (например, /^user:/ — слушать все user:* события).
// паттерн наблюдатель
type EventName = string | RegExp;
// — Функция-обработчик события.которая вызывается, когда происходит нужное событие.
type Subscriber = Function;
// Формат объекта, который получит обработчик, если ты подписан на все события (onAll()).
// Объект, который будет передаваться обработчику, если он подписан на все события. В нём есть имя события и данные.
type EmitterEvent = {
	eventName: string;
	data: unknown;
};
// зазугли типизацию!!!!!!!!!!!!!!!!!!!!!!!!

// Интерфейс событий
// Это интерфейс, то есть чертёж — что именно должен уметь класс.
//  Он описывает: можно подписаться (on), вызвать (emit), сбросить (offAll) и т.д.
export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}

/**
 * Брокер событий, классическая реализация
 * В расширенных вариантах есть возможность подписаться на все события
 * или слушать события по шаблону например
 */
export class EventEmitter implements IEvents {
	_events: Map<EventName, Set<Subscriber>>;
	// ключ — имя события,значение — набор подписчиков (Set), которые должны отреагировать.
	constructor() {
		this._events = new Map<EventName, Set<Subscriber>>();
	}

	/**
	 * Установить обработчик на событие
	 */
	// Подписываемся на событие.
	on<T extends object>(eventName: EventName, callback: (event: T) => void) {
		if (!this._events.has(eventName)) {
			// Если события ещё нет в Map, создаём Set.
			this._events.set(eventName, new Set<Subscriber>());
		}
		// Добавляем callback в Set.
		this._events.get(eventName)?.add(callback);
	}

	/**
	 * Снять обработчик с события
	 */
	off(eventName: EventName, callback: Subscriber) {
		if (this._events.has(eventName)) {
			// "Не переживай, тут точно не undefined или null, я всё проверил."
			// this._events.get(eventName) возвращает Set<Subscriber>, где все подписчики на это событие.
			this._events.get(eventName)!.delete(callback);
			// Проверка: если в Set больше нет подписчиков (size === 0), то удаляем всю запись о событии из Map.
			if (this._events.get(eventName)?.size === 0) {
				this._events.delete(eventName);
			}
		}
	}

	/**
	 * Инициировать событие с данными
	 */
	// Метод emit вызывает все подписанные обработчики на определённое событие и передаёт им данные.
	// eventName — имя события, которое мы "испускаем" (например, 'save', 'user:login').
	// data?: T — необязательные данные, которые мы передаём всем подписчикам этого события.
	emit<T extends object>(eventName: string, data?: T) {
		// name — это имя события (может быть строкой или RegExp).
		// subscribers — это Set функций (обработчиков), которые подписаны на это событие.
	this._events.forEach((subscribers, name) => {
		// Отправка события глобальным подписчикам (на '*'):
		// Если кто-то подписался на все события сразу ('*'), то ему передаём объект { eventName, data }, чтобы он знал:
		// Тут name — это имя события в Map ('save', 'delete', 'click', '*' и т.д.).
// "Вот какое событие произошло и какие у него данные".
// т е звездочка это имя событие в объекте map  и если событие любое по ключу *
//  , то для этого имени звезочка вызовемм всех его подписчиков
			if (name === '*')
			
				subscribers.forEach((callback) =>
					callback({
						eventName,
						data,
					})
				);
				// Обычная проверка — "а это то самое событие?"
				// Если имя события, на которое подписан обработчик — регулярка, 
				// и она совпадает с тем событием, которое мы эмитим, то вызываем коллбэки".
			if (
				// Является ли ключ name регулярным выражением?
				// Проверим, совпадает ли имя события с регулярным выражением.
				// Пример:
				// emitter.on(/^user:/, (data) => {
				// 	console.log('User event:', data);
				// });
				
				// emitter.emit('user:login', { name: 'Alex' });
				// emitter.emit('user:logout', { name: 'Maria' });
				// emitter.emit('order:pay', { amount: 100 }); // <-- проигнорировано
				(name instanceof RegExp && name.test(eventName)) ||
				name === eventName
			) {
				// Если одно из условий сработало — вызываем всех подписчиков (всех функций в Set).
				// subscribers  - это set который состоит из обработчиков которые обрабатывают событие по ключу name
				subscribers.forEach((callback) => callback(data));
			}
		});
	}

	/**
	 * Слушать все события
	 */
	onAll(callback: (event: EmitterEvent) => void) {
		this.on('*', callback);
	}

	/**
	 * Сбросить все обработчики
	 */
	offAll() {
		// мы просто создаём новый пустой Map, и присваиваем его вместо старого.
		this._events = new Map<string, Set<Subscriber>>();
	}

	/**
	 * Сделать коллбек триггер, генерирующий событие при вызове
	 */
	trigger<T extends object>(eventName: string, context?: Partial<T>) {
		// напр eventName = 'sayHello' — имя события, которое мы потом будем эмитить.
		// напр context = { from: 'Alice' } — контекст, то есть 
		// предзаполненные данные, которые всегда будут присутствовать в событии.
		// Метод возвращает функцию — специальный "триггер".
		// Когда ты потом вызовешь эту функцию (передав туда event), она:

// объединит event и context

// вызовет emit(eventName, объединённые_данные)
// trigger возвращает новую функцию:
		return (event: object = {}) => {
			// Это отложенный вызов события, как бы "готовый шаблон".
// Ты потом его вызываешь так:
// Здесь event — это то, что ты передал при вызове myTrigger(...)

// А context — то, что ты передал при создании trigger(...)
			this.emit(eventName, {
				...(event || {}),
				...(context || {}),
			});
		};
	}
}

