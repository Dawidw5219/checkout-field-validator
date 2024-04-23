<?php
/**
 * Plugin Name: Checkout Field Validator
 * Description: Checkout Field Validator
 * Version: 1.0.2
 * Author: Dawid Wiewiórskifg2
 * Author URI:  https://app4you.dev
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: checkout-field-validator
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
	exit;
}

add_action('init', 'checkout_field_validator_textdomain');
function checkout_field_validator_textdomain()
{
	load_plugin_textdomain('checkout-field-validator', false, dirname(plugin_basename(__FILE__)) . '/languages');
}

add_action('wp_enqueue_scripts', 'checkout_field_validator_scripts');
function checkout_field_validator_scripts()
{
	wp_enqueue_script('custom-wc-email-validation-script', plugin_dir_url(__FILE__) . 'assets/checkout-field-validator.js', array('jquery'), '1.0', true);
	wp_enqueue_style('custom-wc-email-validation-style', plugin_dir_url(__FILE__) . 'assets/checkout-field-validator.css');
}

add_filter('woocommerce_form_field', 'checkout_field_validator_error_message', 10, 4);
function checkout_field_validator_error_message($field, $key, $args, $value)
{
	if ($args['required']) {
		$str_pos = strpos($field, '</p>');
		if ($str_pos !== false) {
			$error = '<span class="checkout-field-validator form-error form-error__invalid-required" style="display: none;">' . __('This field is required', 'checkout-field-validator') . '</span>';
			$field = substr_replace($field, $error, $str_pos, 0);
		}
	}

	if ($key === 'billing_email' || $key === 'shipping_email' || 'email' === $args['type']) {
		$str_pos = strpos($field, '</p>');
		if ($str_pos !== false) {
			$error = '<span class="checkout-field-validator form-error form-error__invalid-email" style="display: none;">' . __('Please enter valid email address', 'checkout-field-validator') . '</span>';
			$field = substr_replace($field, $error, $str_pos, 0);
		}
	}

	if ($key === 'billing_phone' || $key === 'shipping_phone' || 'tel' === $args['type']) {
		$str_pos = strpos($field, '</p>');
		if ($str_pos !== false) {
			$error = '<span class="checkout-field-validator form-error form-error__invalid-phone" style="display: none;">' . __('Please enter valid phone number', 'checkout-field-validator') . '</span>';
			$field = substr_replace($field, $error, $str_pos, 0);
		}
	}



	if ($key === 'billing_postcode' || $key === 'shipping_postcode') {
		$str_pos = strpos($field, '</p>');
		if ($str_pos !== false) {
			$error = '<span class="checkout-field-validator form-error form-error__invalid-postcode" style="display: none;">' . __('Please enter a valid postcode', 'checkout-field-validator') . '</span>';
			$field = substr_replace($field, $error, $str_pos, 0);
		}
	}

	if ($key === 'billing_city' || $key === 'shipping_city') {
		$str_pos = strpos($field, '</p>');
		if ($str_pos !== false) {
			$error = '<span class="checkout-field-validator form-error form-error__invalid-city" style="display: none;">' . __('Please enter a valid city', 'checkout-field-validator') . '</span>';
			$field = substr_replace($field, $error, $str_pos, 0);
		}
	}

	if ($key === 'billing_address_1' || $key === 'shipping_address_1') {
		$str_pos = strpos($field, '</p>');
		if ($str_pos !== false) {
			$error = '<span class="checkout-field-validator form-error form-error__invalid-address" style="display: none;">' . __('Please enter a valid address', 'checkout-field-validator') . '</span>';
			$field = substr_replace($field, $error, $str_pos, 0);
		}
	}
	return $field;
}


add_action('woocommerce_checkout_process', 'checkout_field_validator_default_email');
function checkout_field_validator_default_email()
{
	if (isset($_POST['billing_email']) && empty($_POST['billing_email'])) {
		$_POST['billing_email'] = 'kontakt.fishhunter@gmail.com';
	}
}