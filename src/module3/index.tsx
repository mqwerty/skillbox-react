/* eslint-disable */

// 1. Работа с простыми типами
//
// Напишите тип функции, конкатенирующей две строки
//
// concat('Hello ', 'World') // -> Hello World;

type Concat = (a: string, b: string) => string
const concat: Concat = (a, b) => a + b

// 2. Работа с интерфейсами
//
// Напишите интерфейс для описания следующих данных
//
// const MyHometask = {
//     howIDoIt: "I Do It Wel",
//     simeArray: ["string one", "string two", 42],
//     withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
// }

interface IMyHometaskData {
  howIDoIt: string
  simeArray: [string, string, number] | [string, number]
}

interface IMyHometask extends IMyHometaskData {
  withData: IMyHometaskData[]
}

const MyHometask: IMyHometask = {
  howIDoIt: 'I Do It Wel',
  simeArray: ['string one', 'string two', 42],
  withData: [{ howIDoIt: 'I Do It Wel', simeArray: ['string one', 23] }],
}

// 3. Типизация функций, используя Generic
//
// В уроке про Generics мы написали интерфейс массива MyArray.
// Добавьте типизацию для метода `reduce`.
//
// interface MyArray<T> {
//   [N: number]: T;
// }
//
// Справка о работе reduce:
// Результат работы предыдущей функции передается в следующую в качестве аргумента accumulator.
// На итерации 0 - accumulator === initialValue.
// Если initialValue не указан, то accumulator это 0 элемент массива.

interface MyArray<T> {
  [N: number]: T

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T

  reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T

  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U
}

const sumMyArrOfNumbers = (numbers: MyArray<number>) => numbers.reduce((ac, val) => ac + val, 0)

// 4. Работа с MappedTypes
//
// interface IHomeTask {
//     data: string;
//     numbericData: number;
//     date: Date;
//     externalData: {
//         basis: number;
//         value: string;
//     }
// }
//
// Стандартный generic Partial работает так же как Readonly, только для внешних ключей.
// Напишите такой MyPartial, чтобы создание подобного объекта стало возможным:
//
// const homeTask: MyPartial<IHomeTask> = {
//     externalData: {
//         value: 'win'
//     }
// }
//
// type MyPartial<T> = {
//     [N in keyof T]: T[N] extends object ? MyPatial<T[N]> : T[N]
// }

type MyPartial<T> = {
  [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N]
}

interface IHomeTask {
  data: string
  numbericData: number
  date: Date
  externalData: {
    basis: number
    value: string
  }
}

const homeTask: MyPartial<IHomeTask> = {
  externalData: {
    value: 'win',
  },
}

// 5*. Работа с Generic, Mapped Types, Type inference №1
//
// Это React Functional Component
//
// function HomeComponent(props: { firstProp: string }) {
//     return (
//         <div>
//             { props.firstProp }
//         </div>
//     )
// }
//
// Напишите такой тип, который извлечет тип props из этого или любого другого React компонента.
// Подсказка: любой реакт компонент расширяет React.ComponentType<Props>.
//
// props: IProps;
//
// interface IProps {
//     firstProp: string
// }
//
// const t = TMyType<typeof HomeComponent>;

function HomeComponent(props: { firstProp: string }) {
  return <div>{props.firstProp}</div>
}

type TMyType<T extends React.ComponentType<any>> = T extends (props: infer P) => any ? P : never

type t = TMyType<typeof HomeComponent>

// 6*. Работа с Generic, Mapped Types, Type inference №2
//
// Дан namespace JSX. Получить к нему доступ можно после установки пакета @types/react.
// Мы проделывали это в одном из первых уроков.
//
// Среди JSX IntrinsicElements есть Элемент DIV, получить доступ к нему можно так:
//
// type TDivElement = JSX.IntrinsicElements['div'];
//
// Этот тип описывает все свойства, доступные для HTMLDivElement.
//
// Напишите такой тип TGetJSXPropsProp, который извлекает все HTML свойства,
// доступные для любого jsx элемента.
//
// Пример:
// type TDivProps = TGetJSXPropsProp<'div'>
// const props: TDivProps = {
//     some: '1233', // throw error потому что не содержится в атрибутах div
//     className: 'handler', // не выкидывает ошибку так как валидно для div элемента
// }

type TGetJSXPropsProp<T> = React.HTMLAttributes<T>
type TDivProps = TGetJSXPropsProp<'div'>
const props: TDivProps = {
  // @ts-ignore
  some: '1233',
  className: 'handler',
}
