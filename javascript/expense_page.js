// const $ = selector => document.querySelector(selector);
class Expense {
    constructor(title, date, value) {
        this.title = title;
        this.date = date;
        this.value = value;
    }
}
let expenseList = [
    new Expense('groccery', '2023-03-23', 133),
    new Expense('new shoes', '2023-03-22', 700),
    new Expense('rent', '2023-03-19', 430),
    new Expense('new sofa', '2023-03-24', 1000),
    new Expense('new camera', '2023-03-20', 280),

];
let weeklyExpenseMap = new Map([
    ['0', 0],
    ['1', 0],
    ['2', 0],
    ['3', 0],
    ['4', 0],
    ['5', 0],
    ['6', 0],
]);
const onAddCancelClick = function (event) {
    event.preventDefault();
    $('.select-action-section').toggle();
    $('.add-form').toggle();

}
const onSubmitClick = function (event) {
    event.preventDefault();
    const title = $('#title').val();
    const date = $('#date').val();
    const value = $('#value').val();
    let day = getWeekDay(date);
    day++;
    console.log(`title:${title}:date:${date}:value:${value}`);
    console.log('day' + day + 'Daily expense:' + (parseInt(weeklyExpenseMap.get(day.toString())) + parseInt(value)));
    if (title.toString().trim() == '') {
        alert('Please enter a title.');
    } else if (date == '') {
        alert('Please select a date.')
    } else if ((parseInt(weeklyExpenseMap.get(day.toString())) + parseInt(value)) > 1000) {
        alert('Daily expense cannot exceed 1000$');
    } else {
        const newItem = new Expense(title, date, value);
        expenseList.push(newItem);
        updateWeeklyExpenseList();
        createExpenseListItem(newItem);
        $('#title').val('');
        $('#date').val('');
        $('#value').val('');
        $('.select-action-section').toggle();
        $('.add-form').toggle();
    }
}

const updateslider = function () {
    let changeVal = $(this).val();
    $('#slider-current-value').text(changeVal.toString());
    // console.log(changeVal);
}

const onDeleteClick = function () {

    $('.select-action-section').toggle();
    $('.delete-list').toggle();


}
const onDeleteCancelClick = function () {
    $('.select-action-section').toggle();
    $('.delete-list').toggle();
}
const onViewCancelClick = function () {
    $('.select-action-section').toggle();
    $('.view-list').toggle();
}

const onEditClick = function () {
    $('.select-action-section').toggle();
    $('.view-list').toggle();

}

const onDeleteIconClick = function () {
    $(this).parent().parent().remove();
    const deleteItemName = $(this).parent().prev().prev().prev().text();
    console.log(`Delete id:${deleteItemName}`);
    for (let i in expenseList) {
        console.log(`Before Expense ${i}:${expenseList[i].title}`)
    }
    expenseList = expenseList.filter(function (item) {
        if (item.title != deleteItemName)
            return item;
    });
    for (let i in expenseList) {
        console.log(`After Expense ${i}:${expenseList[i].title}`)
    }
    updateWeeklyExpenseList();
}

function createDeleteList() {
    for (let i in expenseList) {
        createExpenseListItem(expenseList[i]);
    }
}
function createList() {
    for (let i in expenseList) {
        createExpenseListItem(expenseList[i]);
    }
}

function updateWeeklyExpenseList() {

    weeklyExpenseMap.set('0', 0);
    weeklyExpenseMap.set('1', 0);
    weeklyExpenseMap.set('2', 0);
    weeklyExpenseMap.set('3', 0);
    weeklyExpenseMap.set('4', 0);
    weeklyExpenseMap.set('5', 0);
    weeklyExpenseMap.set('6', 0);

    for (let i in expenseList) {
        let day = parseInt(getWeekDay(expenseList[i].date));
        console.log(`Date:${expenseList[i].date}:day:${++day}`);
        if (day == 7) day = 0;
        let newValue = parseInt(weeklyExpenseMap.get((day).toString())) + parseInt(expenseList[i].value);
        // console.log(expenseList[i].value + '::' + weeklyExpenseMap.get((day).toString()) + '::' + newValue);
        weeklyExpenseMap.set(day.toString(), newValue);
    }
    // console.log(weeklyExpenseMap);

    $('#sunday-value').text(weeklyExpenseMap.get('0'));
    $('#monday-value').text(weeklyExpenseMap.get('1'));
    $('#tuesday-value').text(weeklyExpenseMap.get('2'));
    $('#wednesday-value').text(weeklyExpenseMap.get('3'));
    $('#thursday-value').text(weeklyExpenseMap.get('4'));
    $('#friday-value').text(weeklyExpenseMap.get('5'));
    $('#saturday-value').text(weeklyExpenseMap.get('6'));

    updateBarChart();
    updateStats();
}
function updateBarChart() {

    // console.log(`orginal:${mondayValue}:calc:${Math.floor(mondayValue / 30)}:pixels:${mondayPixels}`);
    console.log('sunday ' + calcPixels('0') + weeklyExpenseMap.get('0'));
    console.log('monday ' + calcPixels('1'));
    $('.sunday-bar').animate({ top: `${calcPixels('0')}px` }, 1000);
    $('.monday-bar').animate({ top: `${calcPixels('1')}px` }, 1000);
    $('.tuesday-bar').animate({ top: `${calcPixels('2')}px` }, 1000);
    $('.wednesday-bar').animate({ top: `${calcPixels('3')}px` }, 1000);
    $('.thursday-bar').animate({ top: `${calcPixels('4')}px` }, 1000);
    $('.friday-bar').animate({ top: `${calcPixels('5')}px` }, 1000);
    $('.saturday-bar').animate({ top: `${calcPixels('6')}px` }, 1000);
}

function updateStats() {
    let total = 0;
    let highest = 0;
    let lowest = 0;
    for (let i in expenseList) {
        total += parseInt(expenseList[i].value);
        if (expenseList[i].value > highest)
            highest = parseInt(expenseList[i].value);
        if (expenseList[i].value < lowest)
            lowest = parseInt(expenseList[i].value);
    }
    let date = new Date().toUTCString();
    $('#total').text(` ${total.toString()}`);
    $('#average').text(` ${(total / 7).toFixed(2)}`);
    $('#highest').text(` ${highest.toString()}`);
    $('#lowest').text(` ${lowest.toString()}`);
    $('#lastUpdate').text(`${date}`);
}

function calcPixels(day) {
    let value = parseInt(weeklyExpenseMap.get(day));
    let pixels = (340 - (Math.floor(value / 40)) * 10);
    return pixels;
}

const getWeekDay = (date) => {
    let myDate = new Date(date.toString());
    return myDate.getDay();
}

function createExpenseListItem(currentItem) {
    const rowElement = document.createElement('tr');

    const titleCell = document.createElement('td');
    const titleCellTextNode = document.createTextNode(currentItem.title);
    titleCell.append(titleCellTextNode);

    const dateCell = document.createElement('td');
    const dateCellTextNode = document.createTextNode(currentItem.date.toString());
    dateCell.append(dateCellTextNode);

    const valueCell = document.createElement('td');
    const valueCellTextNode = document.createTextNode(`$${parseFloat(currentItem.value)}`);
    valueCell.append(valueCellTextNode);

    const imageCell = document.createElement('td');
    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', 'imgs/delete.png');
    deleteIcon.setAttribute('class', 'delete-icon');
    imageCell.appendChild(deleteIcon);

    rowElement.append(titleCell, dateCell, valueCell, imageCell);
    $('#list-view').append(rowElement);
    $('.delete-icon').click(onDeleteIconClick);

}

document.addEventListener("DOMContentLoaded", () => {

    $('.add-form').toggle();
    $('.delete-list').toggle();
    $('.view-list').toggle();
    createDeleteList();
    updateWeeklyExpenseList();
    $('.date-picker').val(localStorage.getItem('date'));
    $('.add-button').click(onAddCancelClick);
    $('.cancel-button').click(onAddCancelClick);
    $('.submit-button').click(onSubmitClick);
    $('#value').on('input', updateslider);
    $('.delete-button').click(onDeleteClick);
    $('#delete-cancel-button').click(onDeleteCancelClick);
    $('#view-cancel-button').click(onViewCancelClick);
    $('.view-button').click(onEditClick);
});