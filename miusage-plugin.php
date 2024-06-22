<?php
/*
Plugin Name: Miusage
Description: A WordPress plugin to fetch and display data from miusage.com.
Version: 1.0
Author: Abhijit Nage
Text Domain: miusage-plugin
Domain Path: /languages
*/

if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

use Miusage\Plugin;

define('MIUSAGE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('MIUSAGE_PLUGIN_URL', plugin_dir_url(__FILE__));

function miusage_plugin_init() {
    $plugin = new Plugin();
    $plugin->register();
}

add_action('plugins_loaded', 'miusage_plugin_init');
