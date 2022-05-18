// Список курсов
let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [10, 20];
let requiredRange3 = [200, null];

function sort(arr) {
    // Использую простую сортировку при желании можно заменить на сортировку за nlogn
    // Сортировка максимальных значений
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i;
        while (j > 0 && (current.prices[1] != null && arr[j - 1].prices[1] > current.prices[1] || arr[j - 1].prices[1] == null)) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current;
    }
    // Сортировка по минимальным ценам при равных максимальных
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i;
        while (j > 0 && (arr[j - 1].prices[0] > current.prices[0])) {
            if(arr[j - 1].prices[1] !== current.prices[1]){
                break;
            }
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current;
    }
    return arr;
}

function findCourses(required) {
    let resultCourses = []
    for(let i = 0; i < courses.length; i++){
        if((courses[i].prices[1] == null || required[0] <= courses[i].prices[1]) &&
            (courses[i].prices[0] == null || required[1] >= courses[i].prices[0] || required[1] == null)) {
            resultCourses.push(courses[i]);
        }
    }
    return sort(resultCourses);
}

function showCourses(bestCourses, request) {
    console.log(`\nДля запроса с минимальным знаечние ${request[0]} и максимальным значением ${request[1]} подобраны следующие курсы:`);
    for(let i = 0; i < bestCourses.length; i++){
        console.log(`${i + 1}. ${bestCourses[i].name} с ценой от ${bestCourses[i].prices[0]} до ${bestCourses[i].prices[1]}.`);
    }
    console.log();
}

showCourses(findCourses(requiredRange1), requiredRange1);
showCourses(findCourses(requiredRange2), requiredRange2);
showCourses(findCourses(requiredRange3), requiredRange3);