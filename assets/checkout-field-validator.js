jQuery(function ($) {
  if (typeof wc_checkout_params === "undefined") {
    return;
  }

  var wc_checkout_form = {
    $checkout_form: $("form.checkout"),

    init: function () {
      this.$checkout_form.on("input validate change", ".input-text, select, input:checkbox", this.validate_field);
    },

    validate_field: function (e) {
      var $this = $(this),
        $parent = $this.closest(".form-row"),
        validated = true,
        validate_required = $parent.hasClass("validate-required"),
        validate_email = $parent.hasClass("validate-email"),
        validate_phone = $parent.hasClass("validate-phone"),
        pattern = "",
        event_type = e.type;

      if ("input" === event_type) {
        $parent.removeClass(
          "woocommerce-invalid woocommerce-invalid-required-field woocommerce-invalid-email woocommerce-invalid-phone woocommerce-validated"
        );
      }

      if ("validate" === event_type || "change" === event_type) {
        if (validate_required) {
          if ($this.val() === "") {
            $parent.addClass("woocommerce-invalid woocommerce-invalid-required-field");
            validated = false;
          }
        }

        if (validate_email) {
          pattern = new RegExp(
            /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(\\[\x01-\x09\x0c-\x7f]|\[\x01-\x09\x0c-\x7f])*")@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z0-9-]+\.)+[a-z]{2,}))$/
          );
          if (!pattern.test($this.val())) {
            $parent.addClass("woocommerce-invalid woocommerce-invalid-email");
            validated = false;
          }
        }

        if (validate_phone) {
          pattern = new RegExp(/^[\s\#0-9_\-\+\/\(\)\.]+$/);
          if (!$this.val().match(pattern)) {
            $parent.addClass("woocommerce-invalid woocommerce-invalid-phone");
            validated = false;
          }
        }

        if (validated) {
          $parent.addClass("woocommerce-validated");
        }
      }
    },
  };

  wc_checkout_form.init();
});
