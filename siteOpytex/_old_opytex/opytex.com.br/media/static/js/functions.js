var emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

/* var contactForm = {
  _validateFields: function () {
    var isValid = true;
    var fields = $(
      "#form-contato-nome, #form-contato-email, #form-contato-telefone, #form-contato-empresa, #form-contato-cargo, #form-contato-mensagem"
    );
    // alert('contactForm')
    fields.each(function () {
      if (this.type === "email") {
        if ($(this).val() == "" || emailRegEx.test($(this).val()) == false) {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      } else {
        if ($(this).val() == "") {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      }
    });

    if(grecaptcha.getResponse().length === 0){
      isValid = false;
    }

    return isValid;
  },
  _send: function () {
    $("#form-contato").on("submit", function (event) {
      event.preventDefault();
      if (contactForm._validateFields()) {
        $.ajax({
          type: "POST",
          url: "/contatar/",
          data: $(this).serialize(),
          beforeSend: function () {
            $("#form-contato-submit").val("Enviando...");
          },
          success: function (data) {
            $("#form-contato-submit").val("Enviar contato");
            $("#form-contato .form-message").text(data.status);

            var fields = $(
              "#form-contato-nome, #form-contato-email, #form-contato-telefone, #form-contato-empresa, #form-contato-cargo, #form-contato-mensagem"
            );

            $.each(fields, function(idx,el){$(el).val('')})
          },
        });
      }
    });
  },
  init: function () {
    //contactForm._inputMask();
    contactForm._send();
  },
}; */

var contactParceria = {
  _validateFields: function () {
    var isValid = true;
    var fields = $(
      "#form-parcerias-nome, #form-parcerias-email, #form-parcerias-telefone, #form-parcerias-atividade, #form-parcerias-atividade-tempo, #form-parcerias-mensagem"
    );
    // alert('contactForm')
    fields.each(function () {
      if (this.type === "email") {
        if ($(this).val() == "" || emailRegEx.test($(this).val()) == false) {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      } else {
        if ($(this).val() == "") {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      }
    });

    if(grecaptcha.getResponse().length === 0){
      isValid = false;
    }

    return isValid;
  },
  _send: function () {
    $("#form-parceria").on("submit", function (event) {
      event.preventDefault();
      if (contactParceria._validateFields()) {
        $.ajax({
          type: "POST",
          url: "/contatar-parceiro/",
          data: $(this).serialize(),
          beforeSend: function () {
            $("#form-parcerias-submit").val("Enviando...");
          },
          success: function (data) {
            $("#form-parcerias-submit").val("Enviar contato");
            $("#form-parceria .form-message").text(data.status);


            var fields = $(
              "#form-parcerias-nome, #form-parcerias-email, #form-parcerias-telefone, #form-parcerias-atividade, #form-parcerias-atividade-tempo, #form-parcerias-mensagem"
            );
            $.each(fields, function(idx,el){$(el).val('')})

          },
        });
      }
    });
  },
  init: function () {
    //contactForm._inputMask();
    contactParceria._send();
  },
};

var contactProposta = {
  _validateFields: function () {
    var isValid = true;
    var fields = $(
      "#form-proposta-nome, #form-proposta-email, #form-proposta-telefone, #form-proposta-empresa, #form-proposta-cargo"
    );
    // alert('contactForm')
    fields.each(function () {
      if (this.type === "email") {
        if ($(this).val() == "" || emailRegEx.test($(this).val()) == false) {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      } else {
        if ($(this).val() == "") {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      }
    });
    if(grecaptcha.getResponse().length === 0){
      isValid = false;
    }

    return isValid;
  },
  _send: function () {
    $("#form-proposta").on("submit", function (event) {
      event.preventDefault();
      if (contactProposta._validateFields()) {
        $.ajax({
          type: "POST",
          url: "/proposta/",
          data: $(this).serialize(),
          beforeSend: function () {
            $("#form-proposta-submit").val("Enviando...");
          },
          success: function (data) {
            $("#form-proposta-submit").val("Enviar proposta");
            $("#form-proposta .form-message").text(data.status);

            var fields = $(
              "#form-proposta-nome, #form-proposta-email, #form-proposta-telefone, #form-proposta-empresa, #form-proposta-cargo"
            );
            $.each(fields, function(idx,el){$(el).val('')})

          },
        });
      }
    });
  },
  init: function () {
    //contactForm._inputMask();
    contactProposta._send();
  },
};

var contactCurriculo = {
  _validateFields: function () {
    var isValid = true;
    var fields = $(
      "#form-contato-nome, #form-contato-email, #form-contato-telefone, #fileToUpload, #form-contato-cargo, #form-contato-mensagem"
    );
    // alert('contactForm')
    fields.each(function () {

      if($('#fileToUpload').val() == ""){
        $('.form__up-file').addClass("error")
        isValid = false;
      }else {
        $('.form__up-file').removeClass("error");
      }

      if (this.type === "email") {
        if ($(this).val() == "" || emailRegEx.test($(this).val()) == false) {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      } else {
        if ($(this).val() == "") {
          $(this).addClass("error");
          isValid = false;
        } else {
          $(this).removeClass("error");
        }
      }
    });
    if(grecaptcha.getResponse().length === 0){
      isValid = false;
    }

    return isValid;
  },
  _send: function () {
    $("#form-curriculo").on("submit", function (event) {
      var token = $('#form-contato-submit').attr('data-csrf')
      let formData = new FormData(this);
      // alert(token);
      event.preventDefault();
      if (contactCurriculo._validateFields()) {
        $.ajax({
          type: "POST",
          enctype: "multipart/form-data",
          processData: false,
          contentType: false,
          cache: false,
          url: "/curriculo/",
          data: formData,
          headers: { "X-CSRFToken": token },
          // data:
          // {
					// 	'csrfmiddlewaretoken': token,
					// 	'nome': $('#').val(),
					// },

          beforeSend: function () {
            $("#form-contato-submit").val("Enviando...");
            $("#form-curriculo .form-message").text('');
          },
          success: function (data) {
            $("#form-contato-submit").val("Enviar contato");
            $("#form-curriculo .form-message").text('Currículo enviado com sucesso');

            var fields = $(
              "#form-contato-nome, #form-contato-email, #form-contato-telefone, #form-contato-empresa,#fileToUpload, #form-contato-cargo, #form-contato-mensagem"
            );
            $.each(fields, function(idx,el){$(el).val('')})
            $('#fileToUploadName').text('Envie seu arquivo pdf')
          },
        });
      }
    });
  },
  init: function () {
    //contactForm._inputMask();
    contactCurriculo._send();
  },
};

const mask = function () {
  var options = {
    onKeyPress: function (tel, e, field, options) {
      let masks = ["(00) 0000-00000", "(00) 00000-0000"];
      let mask = tel.length < 15 ? masks[0] : masks[1];
      $("#form-parcerias-telefone").mask(mask, options);
      $("#form-contato-telefone").mask(mask, options);
      $("#form-proposta-telefone").mask(mask, options);
    },
  };
  // $('#associado-cpf').mask('000.000.000.-00')
  // $('#associado-identidade').mask('00.000.000.-00')
  $("#form-parcerias-telefone").mask("(00) 0000-00000", options);
  $("#form-contato-telefone").mask("(00) 0000-00000", options);
  $("#form-proposta-telefone").mask("(00) 0000-00000", options);
};

const windowScroll = {
  _handleClick: function () {
    $("a[anchorlink]").on("click", function () {
      var num = $(this).attr("anchor");
      $("html, body").animate(
        {
          scrollTop: $(`div[anchorref="${num}"]`).offset().top - 50,
        },
        1000
      );
    });
  },
  _handleScroll: function () {
    $(document).on("scroll", function (e) {
      $("a[anchor]").removeClass("side-bar__nav-item--active");
      if (pageYOffset < $('div[anchorref="1"]').offset().top) {
        $(`a[anchor="1"]`).addClass("side-bar__nav-item--active");
      } else if (pageYOffset < $('div[anchorref="2"]').offset().top) {
        $(`a[anchor="2"]`).addClass("side-bar__nav-item--active");
      } else if (pageYOffset < $('div[anchorref="3"]').offset().top) {
        $(`a[anchor="3"]`).addClass("side-bar__nav-item--active");
      } else if (pageYOffset < $('div[anchorref="4"]').offset().top) {
        $(`a[anchor="4"]`).addClass("side-bar__nav-item--active");
      }
    });
  },
  init: function () {
    // meuarray = window.location.href.split('/');
    // pathHome = window.location.host;
    windowScroll._handleClick();
    windowScroll._handleScroll();
  },
};

const productsScroll = {
  _handleClick: function () {
	const handleScroll = function (from, to, duration) {
		$(from).on("click", function () {
		  $("html, body").animate(
			{
			  scrollTop: $(to).offset().top - 250,
			},
			duration
		  );
		});
	  };
	
	$.each($('.products__list-item'), function(index, item){
		var dest = $(item).attr('data-anchor')
		handleScroll(item, `#${dest}`, 1000)
	})
  },
  init: function () {
    productsScroll._handleClick();
  },
};

escapeBlogText = function()
{
  var postagens = $(".main-paragraph.blog__post-paragraph, .blog-preview__post-text-preview,.blog__latest__card-description");

  const regexx = new RegExp(/&nbsp;/gm);
  postagens.each((i,x)=>{
    var text2 = $(x).text();
    text2 = text2.replace(regexx, " ");
    $(x).text(text2);
  });

}

$(document).ready(function () {
  contactForm.init();
  contactParceria.init();
  contactProposta.init();
  contactCurriculo.init();
  productsScroll.init();
  windowScroll.init();
  mask();

  escapeBlogText();
});
