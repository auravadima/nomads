const groupByKey = (array, keyFunction) => array.reduce((prev, item) => {
        const key = keyFunction(item)
        prev[key] = prev[key] ? [...prev[key], item] : [item]
        return prev
    }, {}) 

// func([123, '123', '321', () => {}, 9000, {}, []], assertImpl) возвращает
//       {
//         number: [123, 9000],
//         string: ['123', '321'],
//         function: [() => {}],
//         object: [{}, []]
//       }
groupByKey([123, '123', '321', () => {}, 9000, {}, []], (item) => typeof item)


// func(['123', '1', 'Hello!', ''], assertImpl) возвращает
//       {
// 			more: ['123', 'Hello!'],
// 			less: ['1', '']
// 		 }
groupByKey(['123', '1', 'Hello!', ''], (item) => item.length < 3 ? 'less' : 'more')

// func(['123', '1', 'Hello!', '', [1,2,3], [], {}, () => {}], assertImpl) возвращает
// {
//     "iterable": [ "123", "Hello!", "", [1, 2, 3], [] ],
//     "other": [ 1, {}, null ]
// }
groupByKey(['123', '1', 'Hello!', '', [1,2,3], [], {}, () => {}], (item) => typeof item[Symbol.iterator] === 'function' ? 'iterable' : 'other')