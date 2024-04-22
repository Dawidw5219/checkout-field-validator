jQuery(function ($) {
  if (typeof wc_checkout_params === "undefined") {
    return;
  }

  var wc_checkout_form = {
    $checkout_form: $("form.checkout"),

    init: function () {
      this.$checkout_form.on("input validate change blur", ".input-text, select, input:checkbox", this.validate_field);
    },

    validate_field: function (e) {
      var $this = $(this),
        $parent = $this.closest(".form-row"),
        pattern = "";

      $parent.removeClass(
        "woocommerce-validated woocommerce-invalid-required woocommerce-invalid-email woocommerce-invalid-phone woocommerce-invalid-postcode woocommerce-invalid-city woocommerce-invalid-address"
      );

      if ($parent.hasClass("validate-required") && $this.val() === "") {
        $parent.addClass("woocommerce-invalid woocommerce-invalid-required");
        return $parent.removeClass("woocommerce-validated");
      }

      if ($parent.hasClass("validate-email")) {
        pattern = new RegExp(
          /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(\\[\x01-\x09\x0c-\x7f]|\[\x01-\x09\x0c-\x7f])*")@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z0-9-]+\.)+[a-z]{2,}))$/
        );
        if (!pattern.test($this.val().trim())) {
          $parent.addClass("woocommerce-invalid woocommerce-invalid-email");
          return $parent.removeClass("woocommerce-validated");
        }
      }

      if ($parent.hasClass("validate-phone")) {
        pattern = new RegExp(/^(?:\+48\s?)?(\d{3}[-\s]?){2}\d{3}$/);
        console.log($this.val());
        if (!pattern.test($this.val().trim())) {
          $parent.addClass("woocommerce-invalid woocommerce-invalid-phone");
          return $parent.removeClass("woocommerce-validated");
        }
      }

      if ($parent.is("#billing_postcode") || $parent.is("#shipping_postcode")) {
        pattern = new RegExp(/^\d{2}-?\d{3}$/);
        if (!pattern.test($this.val().trim())) {
          $parent.addClass("woocommerce-invalid woocommerce-invalid-postcode");
          return $parent.removeClass("woocommerce-validated");
        }
      }

      if ($parent.is("#billing_city_field") || $parent.is("#billing_city_field")) {
        pattern = RegExp(/^[^\d]*$/);
        if (!pattern.test($this.val().trim())) {
          $parent.addClass("woocommerce-invalid woocommerce-invalid-city");
          return $parent.removeClass("woocommerce-validated");
        }
      }

      if ($parent.is("#billing_address_1_field") || $parent.is("#shipping_address_1")) {
        pattern = RegExp(/[^\d\n] \d/);
        console.log($this.val());
        if (!pattern.test($this.val().trim())) {
          $parent.addClass("woocommerce-invalid woocommerce-invalid-address");
          return $parent.removeClass("woocommerce-validated");
        }
      }

      $parent.addClass("woocommerce-validated");
    },
  };

  wc_checkout_form.init();
});
