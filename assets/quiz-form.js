//   // Initialize current step index
// let currentStep = 0;

// // Get all steps of the form
// const steps = document.querySelectorAll('.step');

// // Function to show/hide steps
// function showStep(stepIndex) {
//     steps.forEach((step, index) => {
//         if (index === stepIndex) {
//             step.style.display = 'block';
//         } else {
//             step.style.display = 'none';
//         }
//     });
// }

// // Function to move to the next step
// function nextStep() {
//     if (currentStep < steps.length - 1) {
//         currentStep++;
//         showStep(currentStep);
//     }
// }

// // Function to move to the previous step
// function prevStep() {
//     if (currentStep > 0) {
//         currentStep--;
//         showStep(currentStep);
//     }
// }

// // Add event listeners to next/previous buttons
// document.querySelectorAll('.next').forEach(button => {
//     button.addEventListener('click', nextStep);
// });

// document.querySelectorAll('.previous').forEach(button => {
//     button.addEventListener('click', prevStep);
// });

// // Handle form submission
// document.getElementById('multiStepForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     // Handle form submission here
//     alert('Form submitted successfully!');
// });

// // Show the initial step
// showStep(currentStep);

  $(document).ready(function(){
  $(".cstmbeforearow").click(function(){
    window.scrollTo(0, 0);
  });
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function(){

      current_fs = $(this).parents('fieldset');
      next_fs = $(this).parents('fieldset').next();

      //Add Class Active
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
        step: function(now) {
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({'opacity': opacity,'display': 'flex'});
        },
        duration: 500
      });
      setProgressBar(++current);
    });

    $(".previous").click(function(){

      current_fs = $(this).parents('fieldset');
      previous_fs = $(this).parents('fieldset').prev();

      //Remove class active
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();

      //hide the current fieldset with style
      current_fs.animate({opacity: 0}, {
        step: function(now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          previous_fs.css({'opacity': opacity, 'display': 'flex'});
        },
        duration: 500
      });
      setProgressBar(--current);
    });

    function setProgressBar(curStep){
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".progress-bar")
      .css("width",percent+"%")
    }

    $(".submit").click(function(){
      return false;
    })
    $(".FAQS_container").click(function(){
      var _index = $(this).find('.content_with-radio').attr('data-index');
      var _tipsHeading = $(this).find('.content_with-radio').attr('data-heading');
      var _tipsContent = $(this).find('.content_with-radio').attr('data-content');
      var _tipsImage = $(this).find('.img-sec').attr('data-src');
      localStorage.setItem('tipHeading_'+_index,  _tipsHeading);
      localStorage.setItem('tipContent_'+_index,  _tipsContent);
      localStorage.setItem('tipImage_'+_index,  _tipsImage);
      $(this).addClass('active').siblings().removeClass('active');
      $(this).parents('.Question-answer').find('.mainQuesQuizBtn .next').removeClass('disabled');
    });

    $('body').on('click','.mainQuesQuizBtnSubMitBtn', function(e){
      e.preventDefault();
      $('.mainQuizeSec4-flex').addClass('show');
      var _dataUrl = $(this).parents('.last_step').find('.FAQS_container.active .image-with-content').attr('data-url');
      var _dataIndex = $(this).parents('.last_step').find('.FAQS_container.active .image-with-content').attr('data-index');
      sessionStorage.setItem('pageDataUrl', _dataUrl);
      sessionStorage.setItem('pageDataIndex', _dataIndex);
      window.location.href = _dataUrl;
    });
  });