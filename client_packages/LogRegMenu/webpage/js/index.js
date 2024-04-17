$(function() {
	$(".btn").click(function() {
		$(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");   
    $(this).removeClass("idle").addClass("active");
	});
});

function isValidEmail(email) {
  // Регулярное выражение для проверки почтового адреса
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

$(function() {
	$(".btn-signup").click(function() {
    var form = document.querySelector('.form-signup');

    if (form) {
        // Находим элемент внутри формы по его имени
        const login = form.querySelector('[name="fullname"]').value;

        const email = form.querySelector('[name="email"]').value;
        const password = form.querySelector('[name="password"]').value;
        const password2 = form.querySelector('[name="confirmpassword"]').value;

        if(password !== password2){
          WrightErrorMessage("Пароли не совпадают");
          return;
        };
      
        if (!isValidEmail(email)) {
          WrightErrorMessage("Почтовый адрес указан не верно");
          return;
        };
        mp.trigger("client:LogReg:sendDataRegister", login, password, email);
      }
	});
});

$(function() {
	$(".btn-signin").click(function() {
    var form = document.querySelector('.form-signin');

    if (form) {
        // Находим элемент внутри формы по его имени
        const login = form.querySelector('[name="username"]').value;
        const password = form.querySelector('[name="password"]').value;
        const userIfSaveUs = form.querySelector('[name="checkbox"]').value;

        if(login === "" || password === ""){
          WrightErrorMessage("Заполните данные");
          return;
        };
        
        mp.trigger("client:LogReg:sendDataLogin", login, password, userIfSaveUs);
      }
	});
});


function WrightErrorMessage(message){
  var element = document.querySelector('.errorMessage');

  if (element) {
      element.textContent = message;
  }
}