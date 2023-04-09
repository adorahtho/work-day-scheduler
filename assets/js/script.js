//All code is wrapped in a call to jQuery to ensure code isn't run until the browser is done rendering all elements in the html.
$(function (){

  //Each element with the time-block class will run this function to get the value from localStorage for the divId and display it to the textarea element.
  $('.time-block').each(function(){

    var divId = $(this).attr('id')
    var savedTextAreaValue = localStorage.getItem(divId)
    $(this).find('textarea').val(savedTextAreaValue)

    //This variable uses Day.js to get the current hour in military time.
    var currentHour = dayjs().hour()
    console.log('current hour is', currentHour)

    //This variable grabs the divID (hour-#) and splits between the "-". "hour" and "#" will become substrings in an array of strings where the "#" will be obtained and parsed into an integer. 
    var timeBlockHour = parseInt(divId.split('-')[1])
    console.log('current time block', timeBlockHour)

    //The if, else if, and else statements will either add the class 'past', 'present', or 'future' to the div element based on what the currentHour vs. timeBlockHour is. The background color of the time-block will change based on what the currentHour is.
    if (timeBlockHour < currentHour) {
      $(this).addClass('past')
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present')
    } else {
      $(this).addClass('future')
    }
  })
  
  //This function displays the current day and time using Day.js in the element with id of currentDay.
  function displayCurrentDay(){
    var currentDay = $('#currentDay')

    var rightNow = dayjs().format('dddd, MMMM D, YYYY h:mm A')
    currentDay.text(rightNow)
  }

  //The function will run for the saveBtn that is clicked. It will find the value entered into the textarea and setItem to localStorage. The textId will be the key and the textAreaValue will be the value.
  var saveBtn = $(this).find('.saveBtn')

  saveBtn.on('click', function() {
    $('.time-block').each(function(){
      var textId = $(this).attr('id')
      var textAreaValue = $(this).find('textarea').val()
      localStorage.setItem(textId, textAreaValue)
    })
    console.log('save button clicked')
  })

  displayCurrentDay()
  setInterval(displayCurrentDay, 1000)
})
