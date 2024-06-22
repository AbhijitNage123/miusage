<?php

namespace Miusage;

class Plugin {
    public function register() {
        add_action('init', array($this, 'load_textdomain'));
        $this->register_includes();
    }

    public function load_textdomain() {
        load_plugin_textdomain('miusage-plugin', false, dirname(plugin_basename(__FILE__)) . '/../languages');
    }

    private function register_includes() {
        $this->include_files();
        $this->instantiate_classes();
    }

    private function include_files() {
        require_once MIUSAGE_PLUGIN_DIR . 'includes/Ajax.php';
        require_once MIUSAGE_PLUGIN_DIR . 'includes/GutenbergBlock.php';
        require_once MIUSAGE_PLUGIN_DIR . 'includes/WPCLICommand.php';
        require_once MIUSAGE_PLUGIN_DIR . 'includes/AdminPage.php';
    }

    private function instantiate_classes() {
        new Ajax();
        new GutenbergBlock();
        new AdminPage();

        if (defined('WP_CLI') && WP_CLI) {
            new WPCLICommand();
        }
    }
}
