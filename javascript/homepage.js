const $ = selector => document.querySelector(selector);

let index = 0;
const introTextList = ['ADD...', 'MANAGE...', 'DELETE...', 'EDIT...'];
const updateIntroText = () => {
    $('#typing-text').innerHTML = introTextList[index];
    if (index == introTextList.length - 1)
        index = 0;
    else index++;
}
const onExpenseClick = () => {
    console.log('start clicked');
    window.location.href = 'expense_page.html';
}
const onDateChange = () => {
    date = $('.date-picker').value;
    console.log(`changed date:${date}`);
    localStorage.setItem("date", date);
}
const setCurrentWeek = () => {
    let currentDate = new Date();
    let currentMonth = parseInt(currentDate.getMonth());
    let currentWeek = ((currentMonth++) * 4).toString().padStart(2, '0');
    currentWeek = `${currentDate.getFullYear()}-W${currentWeek}`;
    $('.date-picker').value = currentWeek;
    localStorage.setItem("date", currentWeek);

}

document.addEventListener("DOMContentLoaded", () => {
    updateIntroText();
    setInterval(updateIntroText, 1500);
    setCurrentWeek();

    $('.add-expense-button').addEventListener('click', onExpenseClick);
    $('.start-button').addEventListener('click', onExpenseClick);
    $('.date-picker').addEventListener('change', onDateChange);

});