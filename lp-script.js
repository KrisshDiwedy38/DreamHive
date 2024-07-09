/*

const toggle = document.querySelectorAll('.CAD');
const form = document.getElementById('form-container');
const closing = document.getElementById('close-button')

toggle.forEach((CAD) => {
   CAD.addEventListener('click' , () => {
      form.style.visibility = 'visible';
})
})

closing.addEventListener('click', () => {
    form.style.visibility = "hidden";
})

*/


const calendarPic = document.getElementById('calendar');
const todoPic = document.getElementById('todo');
const journalPic = document.getElementById('journal');
const trackerPic = document.getElementById('track');
const calendarTag = document.getElementById('calendar-tag');
const todoTag = document.getElementById('todo-tag');
const journalTag = document.getElementById('journal-tag');
const trackerTag = document.getElementById('trackers-tag');
const tag = document.querySelectorAll('.tag');

calendarTag.addEventListener('click', () => {
    calendarPic.style.visibility ='visible';
    todoPic.style.visibility = 'hidden';
    journalPic.style.visibility='hidden';
    trackerPic.style.visibility='hidden';
    tagHighlight(0)

})

todoTag.addEventListener('click', () => {
    calendarPic.style.visibility ='hidden';
    todoPic.style.visibility = 'visible';
    journalPic.style.visibility='hidden';
    trackerPic.style.visibility='hidden';
    tagHighlight(1)
})
journalTag.addEventListener('click', () => {
    calendarPic.style.visibility ='hidden';
    todoPic.style.visibility = 'hidden';
    journalPic.style.visibility='visible';
    trackerPic.style.visibility='hidden';
    tagHighlight(2)
})
trackerTag.addEventListener('click', () => {
    calendarPic.style.visibility ='hidden';
    todoPic.style.visibility = 'hidden';
    journalPic.style.visibility='hidden';
    trackerPic.style.visibility='visible';
    tagHighlight(3)
})


function tagHighlight(n){
    let arr = Array.from(tag);
    for ( let i in arr){
        if( i == n ){
            tag[i].style.width = '110%';
        }
        else{
            tag[i].style.width = '90%';
        }
    }
}
