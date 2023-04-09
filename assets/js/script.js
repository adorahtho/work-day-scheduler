
$(function (){
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

  $(document).ready(function() {
    $('.time-block').each(function(){

      var textId = $(this).attr('id')
      var savedTextAreaValue = localStorage.getItem(textId)
      $(this).find('textarea').val(savedTextAreaValue)

      var currentHour = dayjs().hour()
      console.log('current hour is', currentHour)

      var timeBlockHour = parseInt(textId.split('-')[1])
      console.log('current time block', timeBlockHour)

      if (timeBlockHour < currentHour) {
        $(this).addClass('past')
      } else if (timeBlockHour === currentHour) {
        $(this).addClass('present')
      } else {
        $(this).addClass('future')
      }
    })
  })

  function displayCurrentDay(){
    var currentDay = $('#currentDay')

    var rightNow = dayjs().format('dddd, MMMM D, YYYY h:mm A')
    currentDay.text(rightNow)
  }
})
